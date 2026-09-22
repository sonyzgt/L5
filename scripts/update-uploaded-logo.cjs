const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImg = 'C:/Users/ADMIN/.gemini/antigravity/brain/6b999076-82fd-4b2c-9fe3-ba04315414a8/.user_uploaded/media_1790099214095.png';

async function generateAssets() {
  console.log('Processing new logo & favicons from uploaded image...');
  
  if (!fs.existsSync(srcImg)) {
    throw new Error('Source image not found: ' + srcImg);
  }

  // Backup / save original
  fs.copyFileSync(srcImg, 'public/layer5-logo-original.png');

  // Read raw image buffer
  const { data, info } = await sharp(srcImg)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  const whiteData = Buffer.alloc(width * height * 4);
  const blackData = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const maxVal = Math.max(r, g, b);

    if (maxVal <= 4) {
      // Pure transparent
      whiteData[dstIdx] = 0;
      whiteData[dstIdx + 1] = 0;
      whiteData[dstIdx + 2] = 0;
      whiteData[dstIdx + 3] = 0;

      blackData[dstIdx] = 0;
      blackData[dstIdx + 1] = 0;
      blackData[dstIdx + 2] = 0;
      blackData[dstIdx + 3] = 0;
    } else {
      const alpha = maxVal;
      // White variant: pure crisp white with proper alpha
      whiteData[dstIdx] = 255;
      whiteData[dstIdx + 1] = 255;
      whiteData[dstIdx + 2] = 255;
      whiteData[dstIdx + 3] = alpha;

      // Black variant: dark graphite #0f1117
      blackData[dstIdx] = 15;
      blackData[dstIdx + 1] = 17;
      blackData[dstIdx + 2] = 23;
      blackData[dstIdx + 3] = alpha;
    }
  }

  // Save white and black transparent full PNGs
  await sharp(whiteData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/layer5-logo-white.png');

  await sharp(blackData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/layer5-logo-black.png');

  // Trim to bounding box with balanced padding (e.g. 24px)
  await sharp('public/layer5-logo-white.png')
    .trim()
    .extend({ top: 32, bottom: 32, left: 32, right: 32, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/layer5-logo-white-trimmed.png');

  await sharp('public/layer5-logo-black.png')
    .trim()
    .extend({ top: 32, bottom: 32, left: 32, right: 32, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/layer5-logo-black-trimmed.png');

  console.log('Generated layer5-logo-white-trimmed.png and layer5-logo-black-trimmed.png');

  // Generate Favicons & App Icons:
  // 1. 32x32 Favicon PNG
  const fav32 = await sharp('public/layer5-logo-white-trimmed.png')
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync('public/favicon-32x32.png', fav32);

  // 2. 64x64 App Icon PNG
  await sharp('public/layer5-logo-white-trimmed.png')
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/icon.png');

  // 3. Favicon ICO (standard ICO header + PNG payload)
  const icoBuf = Buffer.alloc(22 + fav32.length);
  icoBuf.writeUInt16LE(0, 0); // reserved
  icoBuf.writeUInt16LE(1, 2); // icon type = 1
  icoBuf.writeUInt16LE(1, 4); // 1 image
  icoBuf.writeUInt8(32, 6);   // width
  icoBuf.writeUInt8(32, 7);   // height
  icoBuf.writeUInt8(0, 8);    // color count
  icoBuf.writeUInt8(0, 9);    // reserved
  icoBuf.writeUInt16LE(1, 10); // color planes
  icoBuf.writeUInt16LE(32, 12); // bpp
  icoBuf.writeUInt32LE(fav32.length, 14); // image size
  icoBuf.writeUInt32LE(22, 18); // offset
  fav32.copy(icoBuf, 22);
  fs.writeFileSync('public/favicon.ico', icoBuf);

  // 4. Apple Touch Icon (180x180 with sleek dark background #090a0c)
  await sharp('public/layer5-logo-white-trimmed.png')
    .resize(136, 136, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 22, bottom: 22, left: 22, right: 22, background: { r: 9, g: 10, b: 12, alpha: 1 } })
    .png()
    .toFile('public/apple-touch-icon.png');

  // 5. SVG Favicons (Crisp SVG embedding high-res data URI)
  const iconBase64 = fs.readFileSync('public/icon.png').toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${iconBase64}" width="64" height="64"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent);

  console.log('All logos and favicons successfully updated and synchronized!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
