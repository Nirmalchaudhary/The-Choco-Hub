import sharp from "sharp";
import { unlink } from "fs/promises";

async function roundIcon(input, output, size) {
  const circle = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
  );

  const image = await sharp(input)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: circle, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(image).toFile(output);
  return image;
}

const logo = "public/logo.png";

await roundIcon(logo, "src/app/icon.png", 32);
await roundIcon(logo, "src/app/apple-icon.png", 180);

const faviconPng = await roundIcon(logo, "src/app/favicon-temp.png", 48);
await sharp(faviconPng).toFile("src/app/favicon.ico");
await unlink("src/app/favicon-temp.png");

console.log("Round favicons generated");
