import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import dormers960 from '@/assets/images/realizacje/kamienica-lukarny-960.webp';
import dormers1920 from '@/assets/images/realizacje/kamienica-lukarny-1920.webp';
import tenement960 from '@/assets/images/realizacje/kamienica-morska-960.webp';
import tenement1920 from '@/assets/images/realizacje/kamienica-morska-1920.webp';
import {
  DORMERS_NOTES,
  DORMERS_RATIO,
  DormersDrawing,
} from '@/components/illustrations/DormersDrawing';
import {
  TENEMENT_NOTES,
  TENEMENT_RATIO,
  TenementDrawing,
} from '@/components/illustrations/TenementDrawing';

export type Project = {
  /** Caption on the pinned frame and below the figure */
  caption: string;
  alt: string;
  /** The photo in both widths generated ahead of time */
  photo: { small: StaticImageData; large: StaticImageData };
  /** Width / height of the photo and its drawing */
  ratio: number;
  drawing: ReactNode;
  /** The notes of the drawing as text */
  notes: string[];
};

/*
 * Projects shown up close with their technical drawing (ProjectSection, docs/decyzje.md D-50, D-81),
 * photos from the old poldach.eu gallery. TODO(P-21): town and name of the buildings, confirmed
 * years – the years are the photos' (EXIF)
 */
export const PROJECTS = {
  tenement: {
    caption: 'Kamienica narożna · 2009',
    alt: 'Narożna kamienica z wieżą, dachem mansardowym z czerwonej dachówki i lukarnami obitymi blachą',
    photo: { small: tenement960, large: tenement1920 },
    ratio: TENEMENT_RATIO,
    drawing: <TenementDrawing preserveAspectRatio="xMidYMin slice" />,
    notes: TENEMENT_NOTES,
  },
  dormers: {
    caption: 'Lukarny i mansarda z dachówki · 2008',
    alt: 'Elewacja kamienicy od podwórza: mansarda z czerwonej dachówki, trzy lukarny obite deskami, dwa okna dachowe',
    photo: { small: dormers960, large: dormers1920 },
    ratio: DORMERS_RATIO,
    drawing: <DormersDrawing preserveAspectRatio="xMidYMin slice" />,
    notes: DORMERS_NOTES,
  },
} satisfies Record<string, Project>;
