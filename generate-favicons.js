const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'public/favicon.svg');
const publicPath = path.join(__dirname, 'public');

(async () => {
  try {
    console.log('🎨 Generating favicons from SVG...');
    
    // Read SVG
    const svg = fs.readFileSync(svgPath);
    
    // Generate favicon.ico (32x32)
    await sharp(svg)
      .resize(32, 32)
      .ico()
      .toFile(path.join(publicPath, 'favicon.ico'));
    console.log('✅ favicon.ico (32x32) generated');
    
    // Generate apple-touch-icon.png (180x180)
    await sharp(svg)
      .resize(180, 180)
      .png()
      .toFile(path.join(publicPath, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png (180x180) generated');
    
    // Generate favicon-16x16.png
    await sharp(svg)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicPath, 'favicon-16x16.png'));
    console.log('✅ favicon-16x16.png generated');
    
    // Generate favicon-32x32.png
    await sharp(svg)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicPath, 'favicon-32x32.png'));
    console.log('✅ favicon-32x32.png generated');
    
    console.log('\n🚀 All favicons generated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
})();
