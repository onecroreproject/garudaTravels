import * as Minio from "minio";
import { NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "minio.thereciprocalsolutions.com",
  port: Number(process.env.MINIO_PORT || "9880"),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "admin",
  secretKey: process.env.MINIO_SECRET_KEY || "admin@trs",
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file !== "object" || !file.arrayBuffer) {
      return NextResponse.json(
        { error: "No valid file provided" },
        { status: 400 }
      );
    }

    const bucket = "garudatours-nextjs";
    const sanitizedPath =
      formData
        .get("path")
        ?.toString()
        .replace(/^\/+/, "")
        .replace(/\.\./g, "") || "";
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const objectName = sanitizedPath
      ? `${sanitizedPath.replace(/\/+$/, "")}/${uniqueFileName}`
      : uniqueFileName;

    // Create temporary file path (avoid nested directories in temp)
    const tempFilePath = join(tmpdir(), uniqueFileName);

    // Convert File to Buffer and write to temp file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(tempFilePath, buffer);

    try {
      // Check if bucket exists, create if not
      const exists = await minioClient.bucketExists(bucket).catch(() => false);
      if (!exists) {
        await minioClient.makeBucket(bucket, "us-east-1");
      }

      // Upload to MinIO
      await minioClient.fPutObject(bucket, objectName, tempFilePath);

      const url = `http://${
        process.env.MINIO_ENDPOINT || "minio.thereciprocalsolutions.com"
      }/${bucket}/${objectName}`;

      // Clean up temp file
      await unlink(tempFilePath).catch(() => {});

      return NextResponse.json({ url });
    } catch (uploadError) {
      // Clean up temp file on error
      await unlink(tempFilePath).catch(() => {});
      throw uploadError;
    }
  } catch (err) {
    console.error("MinIO upload error:", err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
