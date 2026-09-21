const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImg = 'C:/Users/ADMIN/.gemini/antigravity/brain/cee0058e-0a8b-4618-90f2-4d3e95a78e1e/.user_uploaded/media_1789985113365.jpg';

async function processLogo() {
  console.log('Processing new KAWA logo from user upload...');

  // 1. Save original image to public/kawa-logo-original.jpg
  fs.copyFileSync(srcImg, 'public/kawa-logo-original.jpg');

  // Read raw pixels
  const { data, info } = await sharp(srcImg)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 3 (RGB)

  // Background estimation around border
  let bgR = 0, bgG = 0, bgB = 0, sampleCount = 0;
  for (let x = 0; x < width; x += 10) {
    for (const y of [0, 1, 2, height - 3, height - 2, height - 1]) {
      const idx = (y * width + x) * channels;
      bgR += data[idx];
      bgG += data[idx + 1];
      bgB += data[idx + 2];
      sampleCount++;
    }
  }
  bgR /= sampleCount;
  bgG /= sampleCount;
  bgB /= sampleCount;
  const bgL = (bgR + bgG + bgB) / 3;
  console.log(`Estimated background: RGB(${bgR.toFixed(1)}, ${bgG.toFixed(1)}, ${bgB.toFixed(1)}) lightness=${bgL.toFixed(1)}`);

  // Create White variant buffer (RGBA)
  const whiteData = Buffer.alloc(width * height * 4);
  // Create Black variant buffer (RGBA)
  const blackData = Buffer.alloc(width * height * 4);

  const thresholdLow = bgL + 4; // ~15-16
  const thresholdHigh = bgL + 35; // ~46

  for (let i = 0; i < width * height; i++) {
    const srcIdx = i * channels;
    const dstIdx = i * 4;

    const r = data[srcIdx];
    const g = data[srcIdx + 1];
    const b = data[srcIdx + 2];
    const l = 0.299 * r + 0.587 * g + 0.114 * b; // perceived luminance

    let alpha = 0;
    if (l > thresholdLow) {
      if (l >= thresholdHigh) {
        alpha = 255;
      } else {
        const t = (l - thresholdLow) / (thresholdHigh - thresholdLow);
        // Smoothstep curve for anti-aliased edge
        alpha = Math.round(255 * (t * t * (3 - 2 * t)));
      }
    }

    if (alpha === 0) {
      // transparent
      whiteData[dstIdx] = 0;
      whiteData[dstIdx + 1] = 0;
      whiteData[dstIdx + 2] = 0;
      whiteData[dstIdx + 3] = 0;

      blackData[dstIdx] = 0;
      blackData[dstIdx + 1] = 0;
      blackData[dstIdx + 2] = 0;
      blackData[dstIdx + 3] = 0;
    } else {
      // Un-premultiply against black background to get clean bright color without dark edge fringes
      const aNorm = alpha / 255;
      const unclamp = (val, bg) => Math.min(255, Math.max(0, Math.round((val - bg * (1 - aNorm)) / aNorm)));
      
      const cleanR = unclamp(r, bgR);
      const cleanG = unclamp(g, bgG);
      const cleanB = unclamp(b, bgB);

      // White variant
      whiteData[dstIdx] = cleanR;
      whiteData[dstIdx + 1] = cleanG;
      whiteData[dstIdx + 2] = cleanB;
      whiteData[dstIdx + 3] = alpha;

      // Black variant (for light theme): dark charcoal / deep slate
      // Lightness of clean pixel (0 to 255)
      const cleanL = (cleanR + cleanG + cleanB) / 3;
      // Invert: 255 (white) becomes 10 (black), 150 (mid) becomes 50
      const invL = Math.round(15 + (255 - cleanL) * 0.2); 
      blackData[dstIdx] = invL;
      blackData[dstIdx + 1] = invL;
      blackData[dstIdx + 2] = invL;
      blackData[dstIdx + 3] = alpha;
    }
  }

  // Save white and black transparent PNGs
  await sharp(whiteData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/kawa-logo-white.png');

  await sharp(blackData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/kawa-logo-black.png');

  // Trim to bounding box with padding
  await sharp('public/kawa-logo-white.png')
    .trim()
    .extend({ top: 40, bottom: 40, left: 40, right: 40, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/kawa-logo-white-trimmed.png');

  await sharp('public/kawa-logo-black.png')
    .trim()
    .extend({ top: 40, bottom: 40, left: 40, right: 40, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/kawa-logo-black-trimmed.png');

  console.log('Saved public/kawa-logo-white-trimmed.png and public/kawa-logo-black-trimmed.png');

  // Generate Favicons:
  // For favicon, white trimmed on dark background or transparent white logo looks magnificent in browser tabs!
  // Tab bars can be dark or light, so we can generate:
  // 1. Transparent trimmed logo scaled nicely
  // 2. Square app icon with elegant dark background (#090a0c) and the glowing logo centered
  
  // Square icon with subtle dark circle or transparent background
  // Let's create a 32x32 transparent favicon
  await sharp('public/kawa-logo-white-trimmed.png')
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon-32x32.png');

  // 64x64 icon
  await sharp('public/kawa-logo-white-trimmed.png')
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');

  fs.copyFileSync('src/app/icon.png', 'public/icon.png');
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');
  fs.copyFileSync('public/favicon-32x32.png', 'src/app/favicon.ico');

  // SVG favicon
  const iconBase64 = fs.readFileSync('src/app/icon.png').toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${iconBase64}" width="64" height="64"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent);
  fs.writeFileSync('src/app/favicon.svg', svgContent);

  // Apple touch icon 180x180 with sleek dark background
  await sharp('public/kawa-logo-white-trimmed.png')
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({ top: 20, bottom: 20, left: 20, right: 20, background: { r: 9, g: 10, b: 12, alpha: 1 } })
    .png()
    .toFile('public/apple-touch-icon.png');

  console.log('Successfully generated all logo assets and favicons!');
}

processLogo().catch(console.error);
