const sharp = require('sharp');
const fs = require('fs');

async function makeFavicons() {
  // 1. Generate 32x32 and 64x64 PNG icons
  await sharp('public/layer5-logo-black-trimmed.png')
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('public/favicon-32x32.png');

  await sharp('public/layer5-logo-black-trimmed.png')
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('src/app/icon.png');

  fs.copyFileSync('src/app/icon.png', 'public/icon.png');
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');
  fs.copyFileSync('public/favicon-32x32.png', 'src/app/favicon.ico');

  // Create SVG version with base64 embedded so SVG favicon is crisp
  const pngBase64 = fs.readFileSync('src/app/icon.png').toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${pngBase64}" width="64" height="64"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgContent);

  console.log('Successfully generated favicon in src/app/icon.png, public/favicon.ico, and public/favicon.svg!');
}

makeFavicons().catch(console.error);
