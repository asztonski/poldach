import type { StaticImageData } from 'next/image';
import type { ReactNode } from 'react';
import dormers960 from '@/assets/images/realizacje/kamienica-lukarny-960.webp';
import tenement960 from '@/assets/images/realizacje/kamienica-morska-960.webp';
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
import { PROJECT_INFO, type ProjectInfo } from '@/data/projects';

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

/** "Kamienica narożna · 2009" */
const caption = ({ title, photoYear }: ProjectInfo) =>
  photoYear ? `${title} · ${photoYear}` : title;

/*
 * Projects shown up close with their technical drawing (ProjectSection, docs/decyzje.md D-50, D-81),
 * photos from the old poldach.eu gallery. Names, years and alts – src/data/projects.ts (D-107).
 */
export const PROJECTS = {
  tenement: {
    caption: caption(PROJECT_INFO.tenement),
    alt: PROJECT_INFO.tenement.alt,
    photo: { small: tenement960, large: PROJECT_INFO.tenement.photo },
    ratio: TENEMENT_RATIO,
    drawing: <TenementDrawing preserveAspectRatio="xMidYMin slice" />,
    notes: TENEMENT_NOTES,
  },
  dormers: {
    caption: caption(PROJECT_INFO.dormers),
    alt: PROJECT_INFO.dormers.alt,
    photo: { small: dormers960, large: PROJECT_INFO.dormers.photo },
    ratio: DORMERS_RATIO,
    drawing: <DormersDrawing preserveAspectRatio="xMidYMin slice" />,
    notes: DORMERS_NOTES,
  },
} satisfies Record<string, Project>;
