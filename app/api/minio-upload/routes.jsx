import Minio from "minio"
import formidable from "formidable"

export const config = {
  api: { bodyParser: false },
}

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || "159.89.168.0",
  port: Number(process.env.MINIO_PORT || "9880"),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY || "admin",
  secretKey: process.env.MINIO_SECRET_KEY || "admin@trs",
})

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = formidable()
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" })

    console.log("MinIO upload req >>",req)
  try {
    const { files } = await parseForm(req)
    const file = files.file
    const bucket = "garudatours-nextjs"
    const objectName = `${Date.now()}-${file.originalFilename}`

    const exists = await minioClient.bucketExists(bucket).catch(() => false)
    if (!exists) await minioClient.makeBucket(bucket, "us-east-1")

    await minioClient.fPutObject(bucket, objectName, file.filepath)

    const url = `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucket}/${objectName}`

    return res.json({ url })
  } catch (err) {
    return res.status(500).json({ error: "Upload failed" })
  }
}
