import type { SVGProps } from 'react';
import { ROUTES, type RoutePath } from '@/config/routes';

/*
 * Small technical drawings of the services, one per page of the "Usługi" menu
 * (src/config/navigation.ts), drawn in code instead of stock photos (docs/decyzje.md D-06, D-29).
 * Made for blue paper: white lines, flat fills in shades of blue and navy, one yellow accent.
 */

const WIDTH = 320;
const HEIGHT = 200;

type P = [number, number];

const r = (n: number) => Math.round(n * 10) / 10;
const open = (...p: P[]) => 'M' + p.map(([x, y]) => `${r(x)} ${r(y)}`).join(' L');
const shape = (...p: P[]) => `${open(...p)}Z`;
const rect = (x: number, y: number, w: number, h: number) =>
  shape([x, y], [x + w, y], [x + w, y + h], [x, y + h]);
const ellipse = (cx: number, cy: number, rx: number, ry: number) =>
  `M${r(cx - rx)} ${r(cy)} a${rx} ${ry} 0 1 0 ${2 * rx} 0 a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;
const steps = (from: number, to: number, step: number) =>
  Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);

/** Fill tones – flat colours of the illustrations (docs/design-system.md#ilustracje). */
type Tone = 'navy' | 'dark' | 'light' | 'white' | 'accent';

const TONE: Record<Tone, string> = {
  navy: 'var(--color-pd-navy-900)',
  dark: 'var(--color-pd-blue-700)',
  light: 'var(--color-pd-blue-400)',
  white: 'var(--color-pd-white)',
  accent: 'var(--title)',
};

type Drawing = {
  /** Flat fills under the lines */
  fills?: [Tone, string][];
  /** Edges, 1.75 px */
  lines: string[];
  /** Courses, joints, seams, 1 px */
  details?: string[];
  /** Hidden structure – dashed, in the title colour */
  hidden?: string[];
  /** Precision marks (crosshair, arrow) – solid, in the title colour */
  marks?: string[];
  /** Label in a navy pill: centre and text */
  pill?: { x: number; y: number; text: string };
  /** Drawn rotated about the centre (a roof slope) */
  rotate?: number;
};

// --- Roofing: a house seen from the eaves side, hip roof with tile courses ----------------------

function roofing(): Drawing {
  const eaves = 118;
  const ridge = 46;
  const [eavesL, eavesR, ridgeL, ridgeR] = [50, 270, 112, 208];
  const edgeAt = (y: number) => {
    const t = (eaves - y) / (eaves - ridge);
    return [eavesL + (ridgeL - eavesL) * t, eavesR + (ridgeR - eavesR) * t];
  };
  const courses = steps(ridge, eaves, 9);
  const joints = courses.slice(0, -1).flatMap((top, row) => {
    const bottom = top + 9;
    const [left, right] = edgeAt(top);
    return steps(left + 6 + (row % 2) * 8, right - 4, 16).map((x) => open([x, top], [x, bottom]));
  });
  const windows = [rect(92, 134, 30, 28), rect(198, 134, 30, 28)];

  return {
    fills: [
      ['dark', shape([eavesL, eaves], [ridgeL, ridge], [ridgeR, ridge], [eavesR, eaves])],
      ['navy', rect(176, 22, 16, 24)],
      ['dark', rect(147, 140, 26, 42)],
      ...windows.map((d): [Tone, string] => ['accent', d]),
    ],
    lines: [
      shape([eavesL, eaves], [ridgeL, ridge], [ridgeR, ridge], [eavesR, eaves]),
      open([72, 182], [72, eaves], [248, eaves], [248, 182]),
      open([176, ridge], [176, 22], [192, 22], [192, ridge]),
      rect(172, 18, 24, 4),
      open([147, 182], [147, 140], [173, 140], [173, 182]),
      ...windows,
    ],
    details: [
      open([16, 182], [304, 182]),
      ...courses.slice(1, -1).map((y) => {
        const [left, right] = edgeAt(y);
        return open([left, y], [right, y]);
      }),
      ...joints,
      // Gutter along the eaves and the downpipe
      open([46, eaves + 3], [274, eaves + 3]),
      open([256, eaves + 3], [256, 182]),
      open([261, eaves + 3], [261, 182]),
      // Window sills, door handle
      open([88, 166], [126, 166]),
      open([194, 166], [232, 166]),
      open([164, 162], [169, 162]),
    ],
  };
}

// --- Flashing and gutters: section through the eaves ---------------------------------------------

function flashingGutters(): Drawing {
  // Roof falls to the right at 24°; S(s, d) is s back up the slope from the eaves, d below the top
  const a = (24 * Math.PI) / 180;
  const [ux, uy] = [Math.cos(a), Math.sin(a)];
  const [nx, ny] = [-uy, ux];
  const E: P = [238, 92];
  const S = (s: number, d: number): P => [E[0] - s * ux + d * nx, E[1] - s * uy + d * ny];
  const L = 250;

  // Plumb cut of the rafter end: the bottom edge meets the vertical through S(14, 14)
  const cutBottom = 14 + ((34 - 14) * nx) / ux;
  const fasciaX = S(14, 14)[0];
  const battens = steps(30, L - 10, 44).map((s) =>
    shape(S(s, 4), S(s + 8, 4), S(s + 8, 11), S(s, 11)),
  );

  // Wall and the wall plate under the rafter
  const wall = { x: 132, w: 30, top: 116 };
  const rafterBottomAt = (x: number) => {
    const s = (E[0] + 34 * nx - x) / ux;
    return S(s, 34)[1];
  };
  const plate = shape(
    [wall.x + 6, wall.top],
    [wall.x + wall.w - 6, wall.top],
    [wall.x + wall.w - 6, rafterBottomAt(wall.x + wall.w - 6)],
    [wall.x + 6, rafterBottomAt(wall.x + 6)],
  );

  // Half-round gutter hung on the fascia, downpipe with an offset back to the wall
  const g = { cx: fasciaX + 21, rim: S(0, 0)[1] + 14, r: 12 };
  const gutter = `M${r(g.cx - g.r)} ${r(g.rim)} A${g.r} ${g.r} 0 0 0 ${r(g.cx + g.r)} ${r(g.rim)}`;
  const pipeTop = g.rim + g.r;
  const pipeX = wall.x + wall.w + 10;
  const pipeLeft: P[] = [
    [g.cx - 4, pipeTop],
    [g.cx - 4, pipeTop + 10],
    [pipeX - 4, pipeTop + 40],
    [pipeX - 4, 196],
  ];
  const pipeRight: P[] = [
    [g.cx + 4, pipeTop],
    [g.cx + 4, pipeTop + 14],
    [pipeX + 4, pipeTop + 44],
    [pipeX + 4, 196],
  ];

  return {
    fills: [
      ['light', shape(S(L, 0), S(0, 0), S(0, 4), S(L, 4))],
      ['dark', shape(S(L, 14), S(14, 14), S(cutBottom, 34), S(L, 34))],
      ['navy', rect(wall.x, wall.top, wall.w, 196 - wall.top)],
      ['light', plate],
      ['accent', `${gutter}Z`],
      ['accent', shape(...pipeLeft, ...[...pipeRight].reverse())],
    ],
    lines: [
      open(S(L, 0), S(0, 0), S(0, 4), S(L, 4)),
      open(S(L, 14), S(14, 14), S(cutBottom, 34), S(L, 34)),
      rect(fasciaX, S(14, 14)[1] - 2, 6, S(cutBottom, 34)[1] - S(14, 14)[1] + 6),
      open([wall.x, 196], [wall.x, wall.top], [wall.x + wall.w, wall.top], [wall.x + wall.w, 196]),
      plate,
      gutter,
      open(...pipeLeft),
      open(...pipeRight),
    ],
    details: [
      open([16, 196], [304, 196]),
      open(S(L, 12), S(6, 12)),
      ...battens,
      // Drip edge from under the covering into the gutter, gutter hook and bead
      open(S(18, 4.5), S(2, 4.5), [S(2, 4.5)[0] + 2, g.rim - 4]),
      open([fasciaX + 6, g.rim - 6], [g.cx - g.r, g.rim]),
      open([g.cx + g.r, g.rim], [g.cx + g.r + 2, g.rim - 2]),
      // Pipe bracket on the wall
      open([wall.x + wall.w, 176], [pipeX - 4, 176]),
    ],
  };
}

// --- Insulation: section through a roof slope -----------------------------------------------------

function insulation(): Drawing {
  const [x0, x1] = [24, 296];
  const rafters = [40, 149, 258];
  const rafterW = 22;
  const [top, bottom] = [75, 131];
  const bays: [number, number][] = [
    [x0, rafters[0]],
    ...rafters.slice(0, -1).map((x, i): [number, number] => [x + rafterW, rafters[i + 1]]),
    [rafters[rafters.length - 1] + rafterW, x1],
  ];
  const zigzag = ([from, to]: [number, number]) =>
    open(...steps(from, to, 9).map((x, i): P => [x, i % 2 ? bottom - 4 : top + 4]));
  const tiles = steps(x0, x1 - 28, 28).flatMap((x): P[] => [
    [x, 56],
    [x + 26, 48],
    [x + 26, 56],
  ]);

  return {
    rotate: -20,
    fills: [
      ...bays.map(([from, to]): [Tone, string] => [
        'light',
        rect(from, top, to - from, bottom - top),
      ]),
      ...rafters.map((x): [Tone, string] => ['dark', rect(x, top, rafterW, bottom - top)]),
      ['navy', rect(x0, 138, x1 - x0, 7)],
    ],
    lines: [
      open(...tiles, [x1, 51]),
      ...rafters.map((x) => rect(x, top, rafterW, bottom - top)),
      open([x0, 138], [x1, 138]),
      open([x0, 145], [x1, 145]),
      open([x0, 48], [x0, 145]),
      open([x1, 48], [x1, 145]),
    ],
    details: [
      ...steps(x0 + 14, x1 - 14, 56).map((x) => rect(x, 57, 10, 7)),
      open([x0, 64], [x1, 64]),
      open([x0, 70], [x1, 70]),
      open([x0, 73], [x1, 73]),
      ...bays.map(zigzag),
    ],
    hidden: [open([x0, 134.5], [x1, 134.5])],
  };
}

// --- Leak detection: flat roof section with the crosshair on the leak -----------------------------

function leakDetection(): Drawing {
  const [x0, x1] = [16, 304];
  const leak: P = [196, 66];
  const gravel = steps(x0 + 6, x1 - 6, 11).map((x, i): [Tone, string] => [
    i % 3 ? 'light' : 'white',
    ellipse(x, i % 2 ? 72 : 68, 4.5, 2.6),
  ]);
  const dots = steps(x0 + 10, x1 - 10, 16).flatMap((x, i): [Tone, string][] => [
    ['light', ellipse(x, 130 + (i % 2) * 8, 1.2, 1.2)],
  ]);
  const ring = 13;
  const ticks: string[] = [
    open([leak[0], leak[1] - ring - 3], [leak[0], leak[1] - ring - 10]),
    open([leak[0], leak[1] + ring + 3], [leak[0], leak[1] + ring + 10]),
    open([leak[0] - ring - 3, leak[1]], [leak[0] - ring - 10, leak[1]]),
    open([leak[0] + ring + 3, leak[1]], [leak[0] + ring + 10, leak[1]]),
  ];
  const drop = `M196 156 C196 156 189 166 189 170 A7 7 0 0 0 203 170 C203 166 196 156 196 156Z`;

  return {
    fills: [
      ['navy', rect(x0, 76, x1 - x0, 4)],
      ['dark', rect(x0, 80, x1 - x0, 42)],
      ['navy', rect(x0, 122, x1 - x0, 24)],
      ...gravel,
      ...dots,
      ['light', drop],
    ],
    lines: [
      open([x0, 76], [x1, 76]),
      open([x0, 80], [x1, 80]),
      open([x0, 122], [x1, 122]),
      open([x0, 146], [x1, 146]),
      open([x0, 62], [x0, 146]),
      open([x1, 62], [x1, 146]),
      drop,
    ],
    details: steps(x0 + 48, x1 - 24, 48).map((x) => open([x, 80], [x, 122])),
    hidden: [open([leak[0], 80], [leak[0], 150])],
    marks: [
      ellipse(leak[0], leak[1], ring, ring),
      ...ticks,
      open([leak[0] + 10, leak[1] - 10], [224, 42]),
    ],
    pill: { x: 248, y: 34, text: '± 1 cm' },
  };
}

// --- Asbestos removal: corrugated sheets, one lifted off -------------------------------------------

function asbestosRemoval(): Drawing {
  const [x0, w, y0, h] = [40, 60, 86, 46];
  const sheets = [0, 1, 2, 3].flatMap((col) =>
    [0, 1].map((row): P => [x0 + col * w, y0 + row * h]),
  );
  const removed: P = [x0 + 2 * w, y0];
  const kept = sheets.filter(([x, y]) => x !== removed[0] || y !== removed[1]);
  const corrugation = ([x, y]: P) =>
    steps(x + 6, x + w - 6, 6).map((cx) => open([cx, y], [cx, y + h]));

  // The removed sheet, lifted up and turned a little
  const turn = (-8 * Math.PI) / 180;
  const centre: P = [removed[0] + w / 2 + 6, 40];
  const lifted = (dx: number, dy: number): P => [
    centre[0] + dx * Math.cos(turn) - dy * Math.sin(turn),
    centre[1] + dx * Math.sin(turn) + dy * Math.cos(turn),
  ];
  const liftedOutline = shape(
    lifted(-w / 2, -h / 2),
    lifted(w / 2, -h / 2),
    lifted(w / 2, h / 2),
    lifted(-w / 2, h / 2),
  );
  const liftedLines = steps(-w / 2 + 6, w / 2 - 6, 6).map((dx) =>
    open(lifted(dx, -h / 2), lifted(dx, h / 2)),
  );

  return {
    fills: [
      ...kept.map(([x, y]): [Tone, string] => ['light', rect(x, y, w, h)]),
      ['light', liftedOutline],
    ],
    lines: [...kept.map(([x, y]) => rect(x, y, w, h)), liftedOutline],
    details: [...kept.flatMap(corrugation), ...liftedLines],
    // What the removed sheet uncovered: battens and rafters
    hidden: [
      open([removed[0], removed[1] + 12], [removed[0] + w, removed[1] + 12]),
      open([removed[0], removed[1] + 34], [removed[0] + w, removed[1] + 34]),
      open([removed[0] + 14, removed[1]], [removed[0] + 14, removed[1] + h]),
      open([removed[0] + w - 14, removed[1]], [removed[0] + w - 14, removed[1] + h]),
    ],
    marks: [open([262, 78], [262, 22]), open([255, 30], [262, 22], [269, 30])],
  };
}

// --- Doors and floors: a door and a window sill over a floor section ------------------------------

function doorsFloors(): Drawing {
  const floor = 160;
  const frame = 'M72 160 V30 H148 V160 H142 V36 H78 V160Z';
  const hatch = steps(16, 304 - 19, 14).map((x) => open([x, 190], [x + 19, 171]));

  return {
    fills: [
      ['navy', frame],
      ['dark', rect(78, 36, 64, floor - 36)],
      ['light', rect(204, 58, 68, 54)],
      ['light', rect(16, floor, 288, 8)],
      ['navy', rect(16, 171, 288, 19)],
      ['accent', rect(190, 118, 96, 7)],
    ],
    lines: [
      open([72, floor], [72, 30], [148, 30], [148, floor]),
      rect(198, 52, 80, 66),
      rect(190, 118, 96, 7),
      open([16, floor], [304, floor]),
      open([16, 190], [304, 190]),
      open([16, floor], [16, 190]),
      open([304, floor], [304, 190]),
    ],
    details: [
      open([78, floor], [78, 36], [142, 36], [142, floor]),
      rect(88, 48, 44, 46),
      rect(88, 104, 44, 46),
      open([131, 100], [139, 100]),
      rect(204, 58, 68, 54),
      open([238, 58], [238, 112]),
      open([16, 168], [304, 168]),
      open([16, 171], [304, 171]),
      ...steps(40, 290, 48).map((x) => open([x, floor], [x, 168])),
      ...hatch,
    ],
  };
}

const DRAWINGS: Partial<Record<RoutePath, Drawing>> = {
  [ROUTES.roofing]: roofing(),
  [ROUTES.flashingGutters]: flashingGutters(),
  [ROUTES.insulation]: insulation(),
  [ROUTES.leakDetection]: leakDetection(),
  [ROUTES.asbestosRemoval]: asbestosRemoval(),
  [ROUTES.doorsFloors]: doorsFloors(),
};

type OfferDrawingProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> & {
  /** The service page the drawing illustrates */
  route: RoutePath;
};

/** Lines: `--drawing-line` (default: the text colour), hidden structure and marks: the title colour. */
export function OfferDrawing({ route, ...props }: OfferDrawingProps) {
  const drawing = DRAWINGS[route];
  if (!drawing) return null;
  const { fills = [], lines, details = [], hidden = [], marks = [], pill, rotate } = drawing;
  const line = 'var(--drawing-line, var(--text))';
  const mark = 'var(--drawing-mark, var(--title))';

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
      <g transform={rotate ? `rotate(${rotate} ${WIDTH / 2} ${HEIGHT / 2})` : undefined}>
        {fills.map(([tone, d], i) => (
          <path key={i} d={d} fill={TONE[tone]} />
        ))}
        <g stroke={mark} strokeWidth={1.25} strokeDasharray="5 4">
          {hidden.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke={line} strokeWidth={1.75}>
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke={line} strokeWidth={1}>
          {details.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <g stroke={mark} strokeWidth={2}>
          {marks.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {pill ? (
          <g>
            <rect x={pill.x - 26} y={pill.y - 10} width={52} height={20} rx={10} fill={TONE.navy} />
            <text
              x={pill.x}
              y={pill.y + 4}
              textAnchor="middle"
              fill={TONE.white}
              fontSize={11}
              fontWeight={700}
              letterSpacing={0.5}
            >
              {pill.text}
            </text>
          </g>
        ) : null}
      </g>
    </svg>
  );
}
