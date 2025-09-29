const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');

// Configuration for image optimization
const IMAGE_CONFIG = {
  // Public directory path (directly specified for Windows)
  publicDir: 'd:\\Project\\New-Garuda-web\\public',
  
  // Image optimization settings
  quality: 80, // Quality for WebP (0-100)
  
  // Target directories to process
  targetDirs: [
    ''  // Process the public directory directly
  ],
  
  // Skip these directories
  skipDirs: [
    'public/_next',
    'public/api',
    'public/fonts'
  ],
  
  // Image size limits (width in pixels)
  sizeLimits: {
    small: 400,    // For thumbnails and small images
    medium: 800,   // For medium-sized content images
    large: 1200,   // For large content images
    xlarge: 1920   // For full-width hero images
  },
  
  // Specific image configurations
  imageConfigs: {
    // Hero images
    'hero1.webp': { width: 1920 },
    'hero2.webp': { width: 1920 },
    
    // Profile images
    'A._P._J._Abdul_Kalam.webp': { width: 200 },
    'vijakannth.webp': { width: 200 },
    
    // Logo
    'logo.webp': { width: 150 },
    'footer-logo.webp': { width: 150 },
    
    // Car images
    'crysta.webp': { width: 800 },
    'ertiga.webp': { width: 800 },
    'innova.webp': { width: 800 },
    'swift.webp': { width: 800 },
    'tempo.webp': { width: 800 },
    
    // Default fallback
    'default': { width: 1200 }
  }
};

// Process a single image
async function processImage(filePath) {
  try {
    const fileName = path.basename(filePath);
    const fileExt = path.extname(filePath).toLowerCase();
    const outputPath = filePath;
    
    // Skip if not an image
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(fileExt)) {
      console.log(`Skipping non-image file: ${filePath}`);
      return;
    }
    
    // Get image configuration or use defaults
    const config = IMAGE_CONFIG.imageConfigs[fileName] || IMAGE_CONFIG.imageConfigs.default;
    
    // Process the image
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Only process if the image is larger than the target size
    if (metadata.width > config.width) {
      console.log(`Resizing ${fileName} from ${metadata.width}px to ${config.width}px`);
      
      await image
        .resize({
          width: config.width,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({
          quality: IMAGE_CONFIG.quality,
          effort: 6,  // Higher effort = better compression but slower
          alphaQuality: 80
        })
        .toFile(outputPath);
        
      console.log(`Optimized: ${filePath}`);
    } else {
      console.log(`Skipping ${fileName} - already at or below target size (${metadata.width}px)`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Process all images in a directory
async function processDirectory(dirPath) {
  try {
    // Normalize path for Windows
    const normalizedPath = dirPath.replace(/\\/g, '/');
    
    // Skip excluded directories
    if (IMAGE_CONFIG.skipDirs.some(skipDir => normalizedPath.includes(skipDir.replace(/\\/g, '/')))) {
      console.log(`Skipping directory: ${dirPath}`);
      return;
    }
    
    console.log(`\nProcessing directory: ${dirPath}`);
    
    // Find all image files (handle Windows paths)
    const pattern = path.join(dirPath, '**', '*.{jpg,jpeg,png,webp}').replace(/\\/g, '/');
    const imageFiles = await glob(pattern, { nodir: true });
    
    // Process each image
    for (const file of imageFiles) {
      await processImage(file);
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
}

// Main function
async function main() {
  try {
    console.log('Starting image optimization...');
    
    // Process each target directory
    for (const dir of IMAGE_CONFIG.targetDirs) {
      const fullPath = path.join(IMAGE_CONFIG.publicDir, dir);
      try {
        await fs.access(fullPath);
        await processDirectory(fullPath);
      } catch (error) {
        console.log(`Directory not found, skipping: ${fullPath}`);
      }
    }
    
    console.log('\nImage optimization complete!');
  } catch (error) {
    console.error('Error in main function:', error);
    process.exit(1);
  }
}

// Run the script
main();
