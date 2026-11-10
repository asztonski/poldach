import type { SVGProps } from 'react';
import { EDGES } from './edges/kamienica-morska';
import { type Note, TechnicalDrawing } from './technical-drawing';

/*
 * Technical drawing of the corner tenement from the project photo (kamienica-morska-*.webp): the
 * photo's traced edges (edges/kamienica-morska.ts), the roof truss hidden in the tower gable and
 * the notes, in the photo's pixels (1920 × 1150).
 */

/** Collar tie and king post inside the tower gable – the roof truss behind the facade */
const TRUSS = ['820,150 1008,150', '896,72 896,150'];

/** Notes of the drawing */
const NOTES: Note[] = [
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

export const TENEMENT_RATIO = EDGES.width / EDGES.height;

type TenementDrawingProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'>;

/** Colours: `--drawing-line` (edges and notes), `--drawing-hidden` (hidden structure). */
export function TenementDrawing(props: TenementDrawingProps) {
  return <TechnicalDrawing edges={EDGES} structure={TRUSS} notes={NOTES} {...props} />;
}
