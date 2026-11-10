import type { SVGProps } from 'react';

/*
 * Technical drawings of project photos (TenementDrawing, DormersDrawing): the lines are the photo's
 * own edges – scripts/photo-edges.mjs traces them into a path in the photo's pixels (edges/), so
 * laid over the photo the drawing matches it 1:1 (docs/decyzje.md D-83). Over the lines: the hidden
 * structure (dashed, in the second colour) and notes with leaders, placed by hand. Pure drawing:
 * the motion is added by TracingReveal (src/components/motion).
 */

export type P = [number, number];

/** The traced edges: the photo's size (the drawing's coordinates) and the path */
export type Edges = { width: number; height: number; d: string };

/** A note: target point, leader line, label anchor and text anchor */
export type Note = { target: P; leader: string; label: P; anchor: 'start' | 'end'; text: string };

type TechnicalDrawingProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'> & {
  edges: Edges;
  /** Hidden structure behind the surface, as polylines "x,y x,y …" */
  structure?: string[];
  notes: Note[];
};

/** Colours: `--drawing-line` (edges and notes), `--drawing-hidden` (hidden structure). */
export function TechnicalDrawing({
  edges,
  structure = [],
  notes,
  ...props
}: TechnicalDrawingProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${edges.width} ${edges.height}`}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* vector-effect is not inherited – every shape sets it, so lines keep their width at any size */}
      <path
        data-layer="edges"
        d={edges.d}
        stroke="var(--drawing-line)"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
      />

      {structure.length ? (
        <g
          data-layer="structure"
          stroke="var(--drawing-hidden)"
          strokeWidth={1.25}
          strokeDasharray="6 5"
        >
          {structure.map((points) => (
            <polyline key={points} points={points} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      ) : null}

      <g data-layer="notes" stroke="var(--drawing-line)" strokeWidth={1.25}>
        {notes.map((note) => (
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
