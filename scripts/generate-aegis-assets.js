const sharp = require('sharp');
const fs = require('fs');

const inputPath = 'C:/Users/ADMIN/.gemini/antigravity/brain/6b999076-82fd-4b2c-9fe3-ba04315414a8/.user_uploaded/media_1790245972501.jpg';

async function run() {
  console.log('Generating Aegis emblem & favicon assets...');

  // 1. Copy original as public/aegis-logo.png
  await sharp(inputPath).png().toFile('d:/kinto/public/aegis-logo.png');

  // 2. Generate transparent version by chroma-keying the dark moss background (RGB around [40, 54, 21])
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const bgR = 40, bgG = 54, bgB = 21;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2];
    const dist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
    if (dist < 26) {
      data[i+3] = 0; // completely transparent
    } else if (dist < 40) {
      data[i+3] = Math.round(((dist - 26) / (40 - 26)) * 255); // smooth antialiased edge
    }
  }

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toFile('d:/kinto/public/aegis-logo-transparent.png');

  // 3. icon.png
  await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('d:/kinto/public/icon.png');

  // 4. favicon-32x32.png
  await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile('d:/kinto/public/favicon-32x32.png');

  // 5. apple-touch-icon.png
  await sharp(inputPath)
    .resize(180, 180)
    .png()
    .toFile('d:/kinto/public/apple-touch-icon.png');

  // 6. favicon.ico
  await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toFile('d:/kinto/public/favicon.ico');

  // 7. Overwrite layer5-logo-white-trimmed.png and black-trimmed
  await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .toFile('d:/kinto/public/layer5-logo-white-trimmed.png');
  await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .toFile('d:/kinto/public/layer5-logo-black-trimmed.png');

  // 8. favicon.svg
  const pngBuf = fs.readFileSync('d:/kinto/public/favicon-32x32.png');
  const b64 = pngBuf.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <image href="data:image/png;base64,${b64}" width="64" height="64"/>
</svg>`;
  fs.writeFileSync('d:/kinto/public/favicon.svg', svg);

  // 9. og-image.png (1200x630 branded card)
  // Background in the Aegis forest/moss tone with the emblem centered
  const bg = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 18, g: 26, b: 15, alpha: 1 } // #121a0f deep moss
    }
  }).png().toBuffer();

  const emblemResized = await sharp('d:/kinto/public/aegis-logo-transparent.png')
    .resize(360, 360, { fit: 'contain' })
    .toBuffer();

  await sharp(bg)
    .composite([{ input: emblemResized, top: 135, left: 420 }])
    .png()
    .toFile('d:/kinto/public/og-image.png');

  console.log('All Aegis logo and favicon assets created successfully!');
}

run().catch(console.error);
