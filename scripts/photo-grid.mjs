/*
 * A crop of a photo (or of a drawing laid over it) with a labelled coordinate grid, to read the
 * pixel coordinates for a technical drawing (docs/architektura.md, "Rysunki techniczne realizacji").
 *
 *   node scripts/photo-grid.mjs <in> <out.jpg> [x y width height] [step=100] [zoom=1]
 *
 * The labels are the photo's own coordinates, so a crop can be zoomed and still read directly.
 * Every fifth line is red.
 */
import sharp from 'sharp';

const [input, output, x = 0, y = 0, w, h, step = 100, zoom = 1] = process.argv.slice(2);
if (!input || !output) {
  console.error(
    'usage: node scripts/photo-grid.mjs <in> <out.jpg> [x y width height] [step] [zoom]',
  );
  process.exit(1);
}

const meta = await sharp(input).metadata();
const left = +x;
const top = +y;
const width = +(w ?? meta.width - left);
const height = +(h ?? meta.height - top);
const s = +step;
const z = +zoom;

let lines = '';
for (let gx = Math.ceil(left / s) * s; gx < left + width; gx += s) {
  const major = gx % (5 * s) === 0;
  lines += `<line x1="${gx - left}" y1="0" x2="${gx - left}" y2="${height}" stroke="${major ? '#f00' : '#ff0'}" stroke-width="1"/>`;
  lines += `<text x="${gx - left + 3}" y="14" font-size="13" fill="#f00" font-family="Arial">${gx}</text>`;
}
for (let gy = Math.ceil(top / s) * s; gy < top + height; gy += s) {
  const major = gy % (5 * s) === 0;
  lines += `<line x1="0" y1="${gy - top}" x2="${width}" y2="${gy - top}" stroke="${major ? '#f00' : '#ff0'}" stroke-width="1"/>`;
  lines += `<text x="3" y="${gy - top - 3}" font-size="13" fill="#f00" font-family="Arial">${gy}</text>`;
}
// sharp resizes before it composites: the grid is drawn at the zoomed size
const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(width * z)}" height="${Math.round(height * z)}"><g transform="scale(${z})">${lines}</g></svg>`,
);

await sharp(input)
  .extract({ left, top, width, height })
  .resize(Math.round(width * z))
  .composite([{ input: svg }])
  .jpeg({ quality: 85 })
  .toFile(output);
console.log(`${output}: ${width} × ${height} px at ${left},${top}, zoom ${z}`);
