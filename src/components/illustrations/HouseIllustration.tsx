import type { SVGProps } from 'react';

// Isometric house with a pitched roof (docs/design-system.md#ilustracje). Coordinates are the
// projection of an 8 × 5 plan, walls 4 high, ridge at 7 – 1 unit = 34 px of the viewBox.
// No animation here: `data-draw="outline"` marks the sketch layer and `data-step` the order in
// which fills appear – motion components read them.
const FRONT_WALL = 'M-147.2 85 L88.3 221 L88.3 85 L-147.2 -51Z';
const GABLE_WALL = 'M88.3 221 L235.6 136 L235.6 0 L161.9 -59.5 L88.3 85Z';
const ROOF_FRONT = 'M-173.7 -28.9 L85.4 120.7 L173.7 -52.7 L-85.4 -202.3Z';
const ROOF_BACK = 'M-85.4 -202.3 L173.7 -52.7 L262.1 18.7 L2.9 -130.9Z';
const VERGE = 'M173.7 -52.7 L262.1 18.7 L235.6 3.4';
const DOOR = 'M-117.8 102 L-88.3 119 L-88.3 37.4 L-117.8 20.4Z';
const WINDOWS = [
  'M-53 95.2 L-11.8 119 L-11.8 74.8 L-53 51Z',
  'M17.7 136 L58.9 159.8 L58.9 115.6 L17.7 91.8Z',
  'M141.3 146.2 L182.6 122.4 L182.6 78.2 L141.3 102Z',
  'M156.1 25.5 L179.6 11.9 L179.6 -18.7 L156.1 -5.1Z',
];
const ROOF_WINDOW = 'M-53 -116.3 L-23.6 -99.3 L-53 -41.5 L-82.4 -58.5Z';
const ROOF_WINDOW_GLASS = 'M-53 -107 L-31 -94.2 L-53 -50.9 L-75.1 -63.6Z';
const CHIMNEY_FRONT = 'M55.9 -124.1 L79.5 -110.5 L79.5 -24.8 L55.9 -38.4Z';
const CHIMNEY_SIDE = 'M79.5 -110.5 L100.1 -122.4 L100.1 -65.3 L79.5 -24.8Z';
const CHIMNEY_TOP = 'M55.9 -124.1 L79.5 -110.5 L100.1 -122.4 L76.6 -136Z';
const GUTTER = 'M-176.7 -23.8 L82.4 125.8 M64.8 115.6 V217.6';
const CORNER_MARKS =
  'M-196 -203 V-221 H-178 M263 -221 H281 V-203 M281 223 V241 H263 M-178 241 H-196 V223';

const OUTLINE = [
  FRONT_WALL,
  GABLE_WALL,
  ROOF_FRONT,
  VERGE,
  DOOR,
  ...WINDOWS,
  ROOF_WINDOW,
  CHIMNEY_FRONT,
  CHIMNEY_SIDE,
  CHIMNEY_TOP,
];

/** Hero drawing for the blue theme. Decorative – the text next to it carries the message. */
export function HouseIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-200 -225 485 470" aria-hidden="true" {...props}>
      <path d={CORNER_MARKS} className="fill-none stroke-pd-white/50" strokeWidth={2} />

      {/* Painted back to front; the roof appears last */}
      <path data-step="3" d={ROOF_BACK} className="fill-pd-yellow-600" />
      <g data-step="1">
        <path d={FRONT_WALL} className="fill-pd-blue-400" />
        <path d={GABLE_WALL} className="fill-pd-blue-700" />
      </g>
      <g data-step="2" className="fill-pd-navy-900">
        <path d={DOOR} />
        {WINDOWS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g data-step="3">
        <path d={ROOF_FRONT} className="fill-pd-yellow-500" />
        <path d={ROOF_WINDOW} className="fill-pd-navy-900" />
        <path d={ROOF_WINDOW_GLASS} className="fill-pd-blue-400" />
        <path d={CHIMNEY_FRONT} className="fill-pd-blue-400" />
        <path d={CHIMNEY_SIDE} className="fill-pd-blue-700" />
        <path d={CHIMNEY_TOP} className="fill-pd-navy-900" />
        <path
          d={GUTTER}
          className="fill-none stroke-pd-white"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
      </g>

      {/* Sketch layer – hidden in the final state (no outlines on illustrations) */}
      <g
        data-draw="outline"
        opacity={0}
        className="fill-none stroke-pd-white"
        strokeWidth={2.4}
        strokeLinejoin="round"
      >
        {OUTLINE.map((d) => (
          <path key={d} d={d} pathLength={1} />
        ))}
      </g>
    </svg>
  );
}
