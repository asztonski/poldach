import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  TechnicalDrawing,
  type Crop,
  type Edges,
} from '@/components/illustrations/technical-drawing';
import { CenterStage } from '@/components/motion/CenterStage';
import { Section, SectionHeading, quietLinkClasses } from '@/components/ui';
import type { RoutePath } from '@/config/routes';
import { cn } from '@/lib/cn';
import styles from './PhotoStage.module.css';

// The stage's box is portrait, 5 : 7 (CenterStage)
const BOX = 5 / 7;

/** The part of a photo the box shows – object-fit: cover at the given horizontal centre */
function coverCrop({ width, height }: Edges, focusX: number): Crop {
  if (width / height > BOX) {
    const cropWidth = height * BOX;
    return { x: (width - cropWidth) * focusX, y: 0, width: cropWidth, height };
  }
  const cropHeight = width / BOX;
  return { x: 0, y: (height - cropHeight) / 2, width, height: cropHeight };
}

export type PhotoStageItem = {
  id: string;
  /** Above the title, e.g. "Usługi · 02 / 04" */
  label: string;
  title: string;
  details: string;
  photo: StaticImageData;
  /** Where the portrait crop of a landscape photo sits: 0 – its left edge, 1 – the right; 0.5 by default */
  focusX?: number;
  /** The photo's own edges: away from the centre the item is its drawing (D-108) */
  edges?: Edges;
  /** A page that tells more – "[ zobacz ]" */
  href?: RoutePath;
};

type PhotoStageProps = {
  /** The section's id – an anchor and the place GA names a click by */
  id: string;
  title: string;
  lead: string;
  items: PhotoStageItem[];
  /**
   * Scrolling per item, in % of the screen's height. 67 – the offer: 50 % faster than a screen, on
   * request (an item a screen was too long); more where an item has more to show (D-110)
   */
  vhPerItem?: number;
};

/**
 * The photo in the stage's box – with edges, over its drawing cropped the same way. Not a link: on
 * the stage a click on a small photo brings it to the centre (D-71); the page is behind the link in
 * the text
 */
function Visual({ item }: { item: PhotoStageItem }) {
  const focusX = item.focusX ?? 0.5;
  const photo = (
    <Image
      src={item.photo}
      alt=""
      className="aspect-5/7 h-auto w-full object-cover"
      style={{ objectPosition: `${focusX * 100}% 50%` }}
    />
  );
  if (!item.edges) return <div className="overflow-hidden rounded-box">{photo}</div>;

  return (
    <div className={cn('overflow-hidden rounded-box', styles.frame)}>
      <TechnicalDrawing
        edges={item.edges}
        crop={coverCrop(item.edges, focusX)}
        preserveAspectRatio="xMidYMid slice"
        className={styles.drawing}
      />
      <div className={styles.window}>
        <div className={styles.photo}>{photo}</div>
      </div>
    </div>
  );
}

/**
 * Photos passing one by one through the centre of the screen on desktop (CenterStage), each large
 * over its own blurred backdrop (docs/decyzje.md D-37, D-65), its text on a white sheet next to it;
 * a grid of cards on phones. No band: the heading is the scene's intro, a white sheet on its first
 * screen (D-66). The offer (OfferSection), the projects page (D-107) and the certificates page
 * (D-113) are lists of its items.
 * Every photo is cropped to the stage's portrait box (5:7), so a landscape one fits too; a photo
 * with its edges is its drawing away from the centre (D-108).
 */
export function PhotoStage({ id, title, lead, items, vhPerItem = 67 }: PhotoStageProps) {
  const headingId = `${id}-title`;

  return (
    <Section
      id={id}
      theme="white"
      aria-labelledby={headingId}
      // The backdrop spans 100vw, which counts the scrollbar too – no sideways page scroll
      className={cn('overflow-x-clip', styles.section)}
    >
      <CenterStage
        // No fade: the intro's white sheet is there from the first screen, and so is its heading
        intro={<SectionHeading id={headingId} title={title} lead={lead} stacked fade={false} />}
        vhPerItem={vhPerItem}
        className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        items={items.map((item) => ({
          id: item.id,
          visual: <Visual item={item} />,
          // The same file again, blurred behind the stage (prototype, D-65) – already loaded
          backdrop: <Image src={item.photo} alt="" />,
          text: (
            <>
              <p className="text-eyebrow uppercase">[ {item.label} ]</p>
              {/* Title colour from lg (large text, docs/design-system.md#kontrast); h2 size only
                  from 110rem – the sheet is as high as the photo and holds the longer description
                  too (a text longer still grows it, CenterStage) */}
              <h3 className="mt-3 text-h3 lg:text-(--title) min-[110rem]:text-h2">{item.title}</h3>
              <p className={cn('mt-3 text-small xl:text-body', styles.details)}>{item.details}</p>
              {/* At the bottom of the sheet (a column on the pinned stage), right after the text
                  elsewhere */}
              {item.href ? (
                <Link
                  href={item.href}
                  className={quietLinkClasses('mt-auto self-start pt-4 text-eyebrow uppercase')}
                >
                  <span aria-hidden="true">[ </span>
                  zobacz
                  <span className="sr-only">: {item.title}</span>
                  <span aria-hidden="true"> ]</span>
                </Link>
              ) : null}
            </>
          ),
        }))}
      />
    </Section>
  );
}
