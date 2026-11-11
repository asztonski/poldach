import type { StaticImageData } from 'next/image';
import flatRoof from '@/assets/images/realizacje/dach-plaski-1280.webp';
import tiledBlocks from '@/assets/images/realizacje/dachy-dachowka-1280.webp';
import house from '@/assets/images/realizacje/dom-dachowka-1920.webp';
import dormers from '@/assets/images/realizacje/kamienica-lukarny-1920.webp';
import estate from '@/assets/images/realizacje/osiedle-dachy-1920.webp';
import tenement from '@/assets/images/realizacje/kamienica-morska-1920.webp';
import { EDGES as flatRoofEdges } from '@/components/illustrations/edges/dach-plaski';
import { EDGES as tiledBlocksEdges } from '@/components/illustrations/edges/dachy-dachowka';
import { EDGES as houseEdges } from '@/components/illustrations/edges/dom-dachowka';
import { EDGES as dormersEdges } from '@/components/illustrations/edges/kamienica-lukarny';
import { EDGES as tenementEdges } from '@/components/illustrations/edges/kamienica-morska';
import { EDGES as estateEdges } from '@/components/illustrations/edges/osiedle-dachy';
import type { Edges } from '@/components/illustrations/technical-drawing';

export type ProjectInfo = {
  id: string;
  title: string;
  /** The year of the photo (EXIF) – the year of the work only once confirmed (P-21) */
  photoYear?: number;
  /** What the photo shows – no more than can be seen on it */
  description: string;
  /** For screen readers, also the alt of the photo up close (ProjectSection) */
  alt: string;
  /** The largest photo in the repository */
  photo: StaticImageData;
  /** The photo's own edges, in its pixels – its tracing (scripts/photo-edges.mjs) */
  edges: Edges;
  /** Where a portrait crop of the landscape photo keeps the roof: 0 – the left edge, 1 – the right */
  focusX?: number;
};

/*
 * The projects – photos from the old poldach.eu gallery "Nasze realizacje" (docs/decyzje.md D-107),
 * the one list of them: the stage of the projects page and the projects up close on the home page
 * (src/sections/common/projects.tsx) take their names from here. TODO(P-21): town, year and scope
 * of every project; TODO(P-22): the rights to the photos
 */
export const PROJECT_INFO = {
  tenement: {
    id: 'kamienica-narozna',
    title: 'Kamienica narożna',
    photoYear: 2009,
    description:
      'Narożna kamienica z wieżą: dach mansardowy z czerwonej dachówki, lukarny obite blachą, obróbki i rynny.',
    alt: 'Narożna kamienica z wieżą, dachem mansardowym z czerwonej dachówki i lukarnami obitymi blachą',
    photo: tenement,
    edges: tenementEdges,
    focusX: 0.45,
  },
  dormers: {
    id: 'lukarny-i-mansarda',
    title: 'Lukarny i mansarda z dachówki',
    photoYear: 2008,
    description:
      'Elewacja kamienicy od podwórza: mansarda z czerwonej dachówki, trzy lukarny obite deskami i dwa okna dachowe.',
    alt: 'Elewacja kamienicy od podwórza: mansarda z czerwonej dachówki, trzy lukarny obite deskami, dwa okna dachowe',
    photo: dormers,
    edges: dormersEdges,
  },
  tiledBlocks: {
    id: 'dachy-z-dachowki',
    title: 'Dachy z dachówki na budynkach wielorodzinnych',
    description:
      'Czerwona dachówka na kilku budynkach mieszkalnych – z lukarnami, kominami i oknami dachowymi.',
    alt: 'Budynki mieszkalne z czerwonym dachem z dachówki, lukarnami i oknami dachowymi',
    photo: tiledBlocks,
    edges: tiledBlocksEdges,
    focusX: 0.4,
  },
  flatRoof: {
    id: 'dach-plaski',
    title: 'Dach płaski i mansarda z blachy',
    description:
      'Dach płaski budynku mieszkalnego z kominami, a dookoła mansarda obita blachą na rąbek stojący.',
    alt: 'Dach płaski budynku mieszkalnego z kominami, otoczony mansardą z blachy na rąbek stojący',
    photo: flatRoof,
    edges: flatRoofEdges,
  },
  // 34_100_2005 of the old gallery – the camera's date burnt into the photo is wrong (docs/roadmapa.md); it stays outside the crop
  house: {
    id: 'dom-z-dachowki',
    title: 'Dom jednorodzinny z dachówki',
    description:
      'Wielospadowy dach domu jednorodzinnego z czerwonej dachówki, z dwiema lukarnami typu „wole oko” i rynnami.',
    alt: 'Dom jednorodzinny z wielospadowym dachem z czerwonej dachówki i dwiema lukarnami typu wole oko',
    photo: house,
    edges: houseEdges,
  },
  // 20_20160218_092954 of the old gallery – the year from the phone's file name
  estate: {
    id: 'dachy-osiedla',
    title: 'Dachy osiedla mieszkaniowego',
    photoYear: 2016,
    description: 'Budynki wielorodzinne z szarymi dachami dwuspadowymi, kominami i balkonami.',
    alt: 'Budynek wielorodzinny z szarym dachem dwuspadowym, kominami i balkonami na osiedlu',
    photo: estate,
    edges: estateEdges,
    focusX: 0.15,
  },
} satisfies Record<string, ProjectInfo>;

/** In the order of the stage: the two up close first, as on the home page */
export const PROJECT_LIST: ProjectInfo[] = Object.values(PROJECT_INFO);
