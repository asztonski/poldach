import type { SVGProps } from 'react';

/*
 * Technical drawing of the corner tenement from the project photo (kamienica-morska-*.webp), in
 * the photo's pixels (1920 × 1150) – laid over the photo it matches it 1:1. Silhouette from the
 * sky mask, windows from dark-blob detection, the rest traced by hand on a coordinate grid; the
 * details (frames, railings, tile courses, boards) are generated from those shapes.
 * Pure drawing: the motion is added by TracingReveal (src/components/motion).
 */

const WIDTH = 1920;
const HEIGHT = 1150;

type P = [number, number];
type Quad = [P, P, P, P]; // top left, top right, bottom right, bottom left

const quad = (value: string) => value.split(' ').map((pair) => pair.split(',').map(Number)) as Quad;
const lerp = (a: P, b: P, t: number): P => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** Point at (u, v) inside a quad, 0..1 from the top left */
const at = ([tl, tr, br, bl]: Quad, u: number, v: number) =>
  lerp(lerp(tl, tr, u), lerp(bl, br, u), v);
const pts = (...points: P[]) =>
  points.map(([x, y]) => `${Math.round(x)},${Math.round(y)}`).join(' ');
const sub = (q: Quad, u0: number, u1: number, v0: number, v1: number): Quad => [
  at(q, u0, v0),
  at(q, u1, v0),
  at(q, u1, v1),
  at(q, u0, v1),
];
const range = (n: number) => Array.from({ length: n }, (_, i) => (i + 1) / (n + 1));
/** n lines across the quad (left to right), evenly spaced from top to bottom */
const rows = (q: Quad, n: number) => range(n).map((v) => pts(at(q, 0, v), at(q, 1, v)));
/** n lines down the quad, evenly spaced from left to right */
const columns = (q: Quad, n: number) => range(n).map((u) => pts(at(q, u, 0), at(q, u, 1)));
/** Closed outline as polyline points (back to the first corner) */
const outline = (q: Quad) => pts(...q, q[0]);
const width = ([tl, tr]: Quad) => Math.hypot(tr[0] - tl[0], tr[1] - tl[1]);

// --- Traced shapes ------------------------------------------------------------------------------

/** Visible edges: [points, closed] */
const EDGES: [string, boolean][] = [
  // Silhouette against the sky
  [
    '208,828 283,765 335,773 351,761 360,742 361,589 379,567 482,464 510,462 647,488 686,495 724,462',
    false,
  ],
  ['654,215 893,16 905,16 1135,180 1170,401 1181,416 1210,427', false],
  [
    '1214,428 1213,338 1263,309 1270,309 1311,326 1312,396 1384,425 1512,369 1532,367 1741,465 1752,471 1753,545',
    false,
  ],
  // Tower: eave underside and walls, flashing, chimneys
  ['652,222 726,372 712,1150', false],
  ['727,247 895,72 1068,192', false],
  ['1100,190 1138,405', false],
  ['1072,195 1097,1150', false],
  ['1266,316 1267,404', false],
  ['1214,350 1265,326 1311,340', false],
  ['1312,396 1313,478', false],
  ['1312,412 1384,441', false],
  // Rounded metal caps – second line of the roll
  ['381,577 484,474 510,472 645,497', false],
  ['1386,435 1513,379 1533,377 1739,475', false],
  // Tower balconies: slab and top rail
  ['752,398 1030,384 1030,416 755,430', true],
  ['748,288 1022,265', false],
  ['742,712 1037,700 1037,738 745,748', true],
  ['740,592 1033,572', false],
  ['735,1050 1045,1040 1045,1085 738,1095', true],
  ['735,935 1040,912', false],
  // Cornices – three lines of the profile
  ['715,725 288,960', false],
  ['715,737 288,972', false],
  ['715,750 288,985', false],
  ['1092,688 1885,878', false],
  ['1092,701 1885,891', false],
  ['1092,715 1885,905', false],
  // Dormers and the right tall dormer's railings
  ['1272,450 1478,515 1483,745 1290,705', true],
  ['1578,405 1745,468 1757,800 1595,770', true],
  ['1590,525 1745,575', false],
  ['1590,537 1745,587', false],
  ['1590,549 1745,599', false],
  ['1615,765 1765,815', false],
  ['1615,777 1765,827', false],
  ['1615,789 1765,839', false],
  // Left wing: dormer column, dormer, left block
  ['452,505 445,880', false],
  ['361,742 352,905', false],
  ['365,690 440,640', false],
  ['365,702 440,652', false],
  ['350,905 430,860', false],
  ['350,917 430,872', false],
  ['510,528 625,500 615,760 500,800', true],
  ['335,773 335,934', false],
  ['208,828 196,1150', false],
];

/** Mansard planes covered with tiles: [plane, tile courses, roof window cut out of it] */
const TILED: [string, number, string?][] = [
  ['1090,415 1238,455 1278,700 1090,660', 11],
  ['1478,515 1590,545 1610,800 1483,745', 12, '1492,648 1552,660 1595,790 1532,780'],
  ['1757,640 1870,680 1872,860 1765,830', 8],
  ['627,498 722,477 701,709 594,769', 11],
  ['448,600 505,590 500,800 445,860', 11, '490,716 518,703 499,836 467,850'],
];

/** Tower roof: outer and inner edge of each slope – tile courses run between them */
const TOWER_SLOPES: [P, P, P, P, number][] = [
  [[654, 215], [893, 16], [727, 247], [895, 72], 3],
  [[905, 16], [1135, 180], [895, 72], [1068, 192], 3],
  [[1135, 180], [1170, 401], [1100, 190], [1138, 405], 1],
];

type WindowKind = 'french' | 'tall' | 'door' | 'pane' | 'roof';

/** Openings (quads from window detection or tracing) and how to detail them */
const WINDOWS: [string, WindowKind][] = [
  // Right tall dormer
  ['1595,440 1627,449 1636,525 1611,518', 'pane'],
  ['1641,458 1672,467 1680,542 1654,535', 'pane'],
  ['1685,476 1715,484 1724,558 1696,551', 'pane'],
  ['1618,652 1653,660 1666,770 1629,762', 'tall'],
  ['1664,667 1698,674 1711,783 1676,775', 'tall'],
  ['1709,681 1743,689 1757,795 1721,787', 'tall'],
  // Right facade – windows with French balconies
  ['1164,839 1246,846 1258,1068 1170,1058', 'french'],
  ['1351,869 1424,882 1440,1092 1364,1084', 'french'],
  ['1517,904 1581,916 1600,1114 1533,1107', 'french'],
  ['1630,928 1759,953 1792,1139 1648,1126', 'french'],
  ['1803,966 1853,975 1866,1140 1814,1132', 'french'],
  // Left facade
  ['648,880 709,854 703,1083 629,1089', 'french'],
  ['550,928 601,907 595,1114 530,1121', 'french'],
  ['467,971 510,953 501,1145 447,1149', 'french'],
  ['367,1020 431,992 423,1149 357,1149', 'french'],
  ['308,1049 336,1040 329,1149 294,1149', 'french'],
  // Left block, dormer column, dormers
  ['233,865 252,860 244,940 226,946', 'pane'],
  ['218,877 229,877 220,956 211,956', 'pane'],
  ['402,571 419,565 411,632 397,637', 'pane'],
  ['380,592 396,588 388,653 376,656', 'pane'],
  ['365,778 429,736 426,838 360,872', 'tall'],
  ['531,620 614,597 585,780 502,795', 'tall'],
  ['1302,560 1446,592 1452,725 1308,702', 'tall'],
  // Roof windows
  ['1492,648 1552,660 1595,790 1532,780', 'roof'],
  ['490,716 518,703 499,836 467,850', 'roof'],
  // Tower doors behind the balconies
  ['790,228 1005,220 1008,395 793,400', 'door'],
  ['795,490 1015,485 1018,705 798,712', 'door'],
  ['792,828 1025,822 1028,1045 795,1050', 'door'],
];

/** Tower balconies: top rail and slab top – the bars run between them */
const BALCONY_BARS = [
  '748,288 1022,265 1030,384 752,398',
  '740,592 1033,572 1037,700 742,712',
  '735,935 1040,912 1045,1040 735,1050',
];

/** Wooden boards above the big dormer's window */
const BOARDS = ['1272,450 1478,515 1480,600 1282,550'];

/** Downpipes: centre line, drawn as a pipe 8 px wide */
const PIPES: [P, P][] = [
  [
    [1268, 750],
    [1282, 1150],
  ],
  [
    [1597, 832],
    [1612, 1150],
  ],
  [
    [1585, 410],
    [1595, 690],
  ],
  [
    [440, 905],
    [447, 1150],
  ],
  [
    [292, 990],
    [296, 1150],
  ],
  [
    [612, 600],
    [616, 760],
  ],
];

/** Collar tie and king post inside the tower gable – the roof truss behind the facade */
const TRUSS = ['820,150 1008,150', '896,72 896,150'];

/** Notes: target point, leader line, label anchor and text anchor */
const NOTES: { target: P; leader: string; label: P; anchor: 'start' | 'end'; text: string }[] = [
  {
    target: [870, 150],
    leader: '870,150 600,150',
    label: [588, 159],
    anchor: 'end',
    text: 'Więźba',
  },
  {
    target: [1165, 560],
    leader: '1165,560 1195,200 1220,200',
    label: [1230, 209],
    anchor: 'start',
    text: 'Pokrycie z dachówki',
  },
  {
    target: [1640, 415],
    leader: '1640,415 1620,280 1595,280',
    label: [1585, 289],
    anchor: 'end',
    text: 'Obróbki blacharskie',
  },
  {
    target: [614, 690],
    leader: '614,690 560,420',
    label: [548, 429],
    anchor: 'end',
    text: 'Rynny i rury spustowe',
  },
  {
    target: [492, 775],
    leader: '492,775 300,600 270,600',
    label: [258, 609],
    anchor: 'end',
    text: 'Okno dachowe',
  },
];

/** The labels of the notes, in drawing order – for a text list next to the drawing. */
export const TENEMENT_NOTES = NOTES.map((note) => note.text);

export const TENEMENT_RATIO = WIDTH / HEIGHT;

// --- Generated details --------------------------------------------------------------------------

/** Frame, glazing bars and – for French windows – the railing in front of the lower part */
function windowLines(value: string, kind: WindowKind) {
  const q = quad(value);
  const lines = [outline(q)];
  if (kind === 'roof') {
    lines.push(outline(sub(q, 0.12, 0.88, 0.07, 0.93)));
    return lines;
  }
  if (kind === 'pane') {
    lines.push(outline(sub(q, 0.16, 0.84, 0.06, 0.94)));
    return lines;
  }
  const inner = sub(q, 0.09, 0.91, 0.035, 0.965);
  lines.push(outline(inner));
  // Transom light at the top, casements below split by mullions
  const transom = kind === 'door' ? 0.22 : 0.27;
  lines.push(pts(at(inner, 0, transom), at(inner, 1, transom)));
  const mullions = kind === 'door' ? [1 / 3, 2 / 3] : [0.5];
  for (const u of mullions) lines.push(pts(at(inner, u, transom), at(inner, u, 1)));
  if (kind === 'french') {
    // Railing a little wider than the window, over its lower 40 %
    const railing = sub(q, -0.1, 1.1, 0.6, 1);
    lines.push(pts(railing[0], railing[1]), pts(railing[3], railing[2]));
    lines.push(...columns(railing, Math.max(4, Math.round(width(railing) / 11))));
  }
  return lines;
}

const DETAILS: string[] = [
  ...WINDOWS.flatMap(([value, kind]) => windowLines(value, kind)),
  ...BALCONY_BARS.flatMap((value) => {
    const q = quad(value);
    return [...columns(q, Math.round(width(q) / 22)), ...rows(sub(q, 0, 1, 0, 0.5), 1)];
  }),
  ...BOARDS.flatMap((value) => columns(quad(value), 7)),
  ...TOWER_SLOPES.flatMap(([a, b, c, d, n]) =>
    range(n).map((t) => pts(lerp(a, c, t), lerp(b, d, t))),
  ),
  ...PIPES.flatMap(([a, b]) => [
    pts([a[0] - 4, a[1]], [b[0] - 4, b[1]]),
    pts([a[0] + 4, a[1]], [b[0] + 4, b[1]]),
  ]),
];

type TenementDrawingProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'>;

/** Colours: `--drawing-line` (edges and notes), `--drawing-hidden` (hidden structure). */
export function TenementDrawing(props: TenementDrawingProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <defs>
        {/* Tile courses stop at the roof windows */}
        {TILED.map(([plane, , cut], i) =>
          cut ? (
            <clipPath key={plane} id={`tenement-tiles-${i}`}>
              <path d={`M${outline(quad(plane))}Z M${outline(quad(cut))}Z`} clipRule="evenodd" />
            </clipPath>
          ) : null,
        )}
      </defs>

      {/* vector-effect is not inherited – every shape sets it, so lines keep their width at any size */}
      <g data-layer="outline" stroke="var(--drawing-line)" strokeWidth={1.75}>
        {EDGES.map(([points, closed]) =>
          closed ? (
            <polygon key={points} points={points} vectorEffect="non-scaling-stroke" />
          ) : (
            <polyline key={points} points={points} vectorEffect="non-scaling-stroke" />
          ),
        )}
        {TILED.map(([plane]) => (
          <polygon key={plane} points={plane} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g data-layer="details" stroke="var(--drawing-line)" strokeWidth={1}>
        {DETAILS.map((points, i) => (
          <polyline key={i} points={points} vectorEffect="non-scaling-stroke" />
        ))}
        {TILED.map(([plane, courses, cut], i) => (
          <g key={plane} clipPath={cut ? `url(#tenement-tiles-${i})` : undefined}>
            {rows(quad(plane), courses).map((points) => (
              <polyline key={points} points={points} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        ))}
      </g>

      <g
        data-layer="structure"
        stroke="var(--drawing-hidden)"
        strokeWidth={1.25}
        strokeDasharray="6 5"
      >
        {TRUSS.map((points) => (
          <polyline key={points} points={points} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g data-layer="notes" stroke="var(--drawing-line)" strokeWidth={1.25}>
        {NOTES.map((note) => (
          <g key={note.text}>
            <polyline points={note.leader} vectorEffect="non-scaling-stroke" />
            <circle
              cx={note.target[0]}
              cy={note.target[1]}
              r={7}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={note.label[0]}
              y={note.label[1]}
              textAnchor={note.anchor}
              fill="var(--drawing-line)"
              stroke="none"
              fontSize={26}
              fontWeight={700}
              letterSpacing={3}
            >
              {note.text.toUpperCase()}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
