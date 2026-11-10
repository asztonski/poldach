/*
 * Traces the edges of a photo into a line drawing (docs/architektura.md, "Rysunki techniczne
 * realizacji"; docs/decyzje.md D-83): Canny edges, chained into polylines and simplified, in the
 * photo's pixels – laid over the photo the drawing matches it 1:1.
 *
 *   node scripts/photo-edges.mjs <photo> <out.ts | out.svg> [options]
 *     --blur=0.9    Gaussian blur before the gradient (px); more hides texture, less keeps detail
 *     --low=9       hysteresis thresholds of the gradient (0–255 scale)
 *     --high=22
 *     --min=26      drop chains shorter than this (px)
 *     --loop=22     drop small closed blobs (stickers, specks): loops smaller than this (px)
 *     --eps=0.8     simplification tolerance (px)
 *     --cut=x,y,w,h leave a region blank (several allowed), e.g. a banner or a licence plate
 *
 * A .ts output is a module for TechnicalDrawing (src/components/illustrations/edges/); a .svg is
 * for a look at the result.
 */
import { basename } from 'node:path';
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const args = process.argv.slice(2);
const files = args.filter((a) => !a.startsWith('--'));
const option = (name, fallback) => {
  const found = args.find((a) => a.startsWith(`--${name}=`));
  return found ? found.slice(name.length + 3) : fallback;
};
const [photo, output] = files;
if (!photo || !output) {
  console.error(
    'usage: node scripts/photo-edges.mjs <photo> <out.ts|out.svg> [--blur= --low= --high= --min= --loop= --eps= --cut=x,y,w,h]',
  );
  process.exit(1);
}
const BLUR = Number(option('blur', 0.9));
const LOW = Number(option('low', 9));
const HIGH = Number(option('high', 22));
const MIN_LEN = Number(option('min', 26));
const MIN_LOOP = Number(option('loop', 22));
const EPS = Number(option('eps', 0.8));
const CUTS = args
  .filter((a) => a.startsWith('--cut='))
  .map((a) => a.slice(6).split(',').map(Number));

const { data, info } = await sharp(photo)
  .greyscale()
  .blur(BLUR)
  .raw()
  .toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const at = (x, y) => data[y * W + x];

// Sobel gradient: magnitude and direction quantised to four (0 horizontal, 1 at 45°, 2 vertical, 3 at 135°)
const mag = new Float32Array(W * H);
const dir = new Uint8Array(W * H);
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const gx =
      at(x + 1, y - 1) +
      2 * at(x + 1, y) +
      at(x + 1, y + 1) -
      (at(x - 1, y - 1) + 2 * at(x - 1, y) + at(x - 1, y + 1));
    const gy =
      at(x - 1, y + 1) +
      2 * at(x, y + 1) +
      at(x + 1, y + 1) -
      (at(x - 1, y - 1) + 2 * at(x, y - 1) + at(x + 1, y - 1));
    const i = y * W + x;
    mag[i] = Math.hypot(gx, gy) / 4;
    dir[i] = Math.round(((Math.atan2(gy, gx) + Math.PI) / Math.PI) * 4) % 4;
  }
}

// Non-maximum suppression along the gradient, then hysteresis from the strong pixels
const STEPS = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
];
const thin = new Uint8Array(W * H); // 0 none, 1 weak, 2 strong
for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    const i = y * W + x;
    const m = mag[i];
    if (m < LOW) continue;
    const [dx, dy] = STEPS[dir[i]];
    if (m < mag[(y + dy) * W + x + dx] || m < mag[(y - dy) * W + x - dx]) continue;
    thin[i] = m >= HIGH ? 2 : 1;
  }
}
for (const [cx, cy, cw, ch] of CUTS) {
  for (let y = cy; y < cy + ch; y++) for (let x = cx; x < cx + cw; x++) thin[y * W + x] = 0;
}
const edge = new Uint8Array(W * H);
const stack = [];
for (let i = 0; i < W * H; i++) if (thin[i] === 2) stack.push(i);
while (stack.length) {
  const i = stack.pop();
  if (edge[i]) continue;
  edge[i] = 1;
  const x = i % W;
  const y = (i - x) / W;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = ny * W + nx;
      if (thin[j] && !edge[j]) stack.push(j);
    }
  }
}

// Chains: from each unvisited edge pixel along unvisited neighbours, straight on preferred
const NEIGHBOURS = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
  [1, -1],
];
const visited = new Uint8Array(W * H);
const degree = (x, y) => {
  let n = 0;
  for (const [dx, dy] of NEIGHBOURS) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx >= 0 && ny >= 0 && nx < W && ny < H && edge[ny * W + nx]) n++;
  }
  return n;
};
function walk(x, y) {
  const chain = [[x, y]];
  visited[y * W + x] = 1;
  let px = x;
  let py = y;
  for (;;) {
    let next = null;
    let best = -2;
    const last = chain.length > 1 ? chain[chain.length - 2] : null;
    for (const [dx, dy] of NEIGHBOURS) {
      const nx = px + dx;
      const ny = py + dy;
      if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
      const j = ny * W + nx;
      if (!edge[j] || visited[j]) continue;
      const score = last ? (px - last[0]) * dx + (py - last[1]) * dy : 0;
      if (score > best) {
        best = score;
        next = [nx, ny];
      }
    }
    if (!next) break;
    chain.push(next);
    visited[next[1] * W + next[0]] = 1;
    [px, py] = next;
  }
  return chain;
}
const chains = [];
// Line ends first, so chains start at an end and run their full length; then what is left (loops)
for (let pass = 0; pass < 2; pass++) {
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      if (!edge[i] || visited[i]) continue;
      if (pass === 0 && degree(x, y) > 1) continue;
      const forward = walk(x, y);
      visited[i] = 0;
      const backward = walk(x, y);
      const chain = [...backward.reverse(), ...forward.slice(1)];
      if (chain.length < MIN_LEN) continue;
      // A small closed blob – a sticker on a pane, a speck on the wall
      const [sx, sy] = chain[0];
      const [ex, ey] = chain[chain.length - 1];
      if (Math.hypot(ex - sx, ey - sy) <= 3) {
        let minX = W;
        let maxX = 0;
        let minY = H;
        let maxY = 0;
        for (const [cx, cy] of chain) {
          minX = Math.min(minX, cx);
          maxX = Math.max(maxX, cx);
          minY = Math.min(minY, cy);
          maxY = Math.max(maxY, cy);
        }
        if (Math.max(maxX - minX, maxY - minY) < MIN_LOOP) continue;
      }
      chains.push(chain);
    }
  }
}

// Douglas–Peucker
function simplify(points, eps) {
  if (points.length < 3) return points;
  const [ax, ay] = points[0];
  const [bx, by] = points[points.length - 1];
  const len = Math.hypot(bx - ax, by - ay) || 1;
  let far = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const d = Math.abs((bx - ax) * (ay - y) - (ax - x) * (by - ay)) / len;
    if (d > far) {
      far = d;
      index = i;
    }
  }
  if (far <= eps) return [points[0], points[points.length - 1]];
  return [
    ...simplify(points.slice(0, index + 1), eps).slice(0, -1),
    ...simplify(points.slice(index), eps),
  ];
}

let d = '';
let segments = 0;
for (const chain of chains) {
  const pts = simplify(chain, EPS);
  segments += pts.length - 1;
  d += `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    d += dx === 0 ? `v${dy}` : dy === 0 ? `h${dx}` : `l${dx} ${dy}`;
  }
}

if (output.endsWith('.ts')) {
  const settings = `blur ${BLUR}, low ${LOW}, high ${HIGH}, min ${MIN_LEN}, loop ${MIN_LOOP}, eps ${EPS}`;
  writeFileSync(
    output,
    `// Generated by scripts/photo-edges.mjs from ${basename(photo)} (${settings}) – do not edit\n` +
      `import type { Edges } from '../technical-drawing';\n\n` +
      `export const EDGES: Edges = {\n  width: ${W},\n  height: ${H},\n  d: '${d}',\n};\n`,
  );
} else {
  writeFileSync(
    output,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"><path d="${d}" fill="none" stroke="#173a6b" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>`,
  );
}
console.log(
  `${output}: ${chains.length} chains, ${segments} segments, ${Math.round(d.length / 1024)} kB of path`,
);
