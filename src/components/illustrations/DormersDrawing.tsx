import type { SVGProps } from 'react';
import { EDGES } from './edges/kamienica-lukarny';
import { type Note, TechnicalDrawing } from './technical-drawing';

/*
 * Technical drawing of the courtyard facade with three dormers from the second project photo
 * (kamienica-lukarny-*.webp): the photo's traced edges (edges/kamienica-lukarny.ts) and the notes,
 * in the photo's pixels (1920 × 1440).
 */

/** Notes of the drawing */
const NOTES: Note[] = [
  {
    // Up the post between two windows, so the leader crosses no glass
    target: [1200, 350],
    leader: '1200,350 1200,95 1290,95',
    label: [1300, 104],
    anchor: 'start',
    text: 'Lukarny',
  },
  {
    target: [925, 525],
    leader: '925,525 760,235 735,235',
    label: [725, 244],
    anchor: 'end',
    text: 'Okno dachowe',
  },
  {
    target: [1735, 470],
    leader: '1735,470 1700,190 1530,190',
    label: [1540, 180],
    anchor: 'start',
    text: 'Pokrycie z dachówki',
  },
  {
    target: [1022, 720],
    leader: '1022,720 1080,720',
    label: [1090, 729],
    anchor: 'start',
    text: 'Rynny i rury spustowe',
  },
  {
    target: [1795, 450],
    leader: '1795,450 1840,600 1855,690',
    label: [1855, 712],
    anchor: 'end',
    text: 'Obróbki blacharskie',
  },
];

/** The labels of the notes, in drawing order – for a text list next to the drawing. */
export const DORMERS_NOTES = NOTES.map((note) => note.text);

export const DORMERS_RATIO = EDGES.width / EDGES.height;

type DormersDrawingProps = Omit<SVGProps<SVGSVGElement>, 'viewBox' | 'children'>;

/** Colours: `--drawing-line` (edges and notes). */
export function DormersDrawing(props: DormersDrawingProps) {
  return <TechnicalDrawing edges={EDGES} notes={NOTES} {...props} />;
}
