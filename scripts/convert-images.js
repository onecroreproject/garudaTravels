import fs from "fs";
import path from "path";
import sharp from "sharp";

const inputDir = "./public";       // Your Next.js public folder
const outputDir = "./public-webp"; // Output folder

// Convert a single image to WebP
async function convertToWebP(filePath, outputPath) {
  await sharp(filePath)
    .webp({ quality: 80 })
    .toFile(outputPath);
}

// Recursively process directories
async function processDir(dir, outDir) {
  fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const inputPath = path.join(dir, file);

    // If it's a directory → recurse
    if (fs.lstatSync(inputPath).isDirectory()) {
      await processDir(inputPath, path.join(outDir, file));
      continue;
    }

    // Check file type
    if (/\.(png|jpg|jpeg|svg)$/i.test(file)) {
      const outputPath = path.join(
        outDir,
        file.replace(/\.(png|jpg|jpeg|svg)$/i, ".webp")
      );
      console.log(`Converting to WebP: ${inputPath}`);
      await convertToWebP(inputPath, outputPath);
    } else {
      const outputPath = path.join(outDir, file);
      console.log(`Copying file (no conversion): ${inputPath}`);
      fs.copyFileSync(inputPath, outputPath);
    }
  }
}

// Run the script
processDir(inputDir, outputDir)
  .then(() => console.log("✅ All images converted to WebP & other files copied to:", outputDir))
  .catch((err) => console.error("❌ Error:", err));
