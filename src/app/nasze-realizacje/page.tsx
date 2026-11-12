import { CONTACT_SECTION_HREF, ROUTES, SECTION_IDS } from '@/config/routes';
import { SITE } from '@/config/site';
import { PROJECT_LIST } from '@/data/projects';
import { sheetNumber } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, HeroSection, PhotoStage } from '@/sections/common';

export const metadata = pageMetadata({
  title: 'Nasze realizacje',
  description: `Realizacje ${SITE.name}: kamienice z mansardami i lukarnami, dachy z dachówki na budynkach wielorodzinnych, dachy płaskie i obróbki z blachy.`,
  path: ROUTES.projects,
});

/**
 * The projects (docs/mapa-strony.md, D-103, D-107), at the old site's address: the photo stage of
 * the offer, with the projects' photos (src/data/projects.ts) – away from the centre each is its
 * tracing, at the centre the photo (D-108) – then the contact. TODO(P-21): more projects, with
 * place, year and scope
 */
export default function ProjectsPage() {
  return (
    <>
      {/* The home page's hero in the page's words, the gallery in place of the phone (D-116, D-117) */}
      <HeroSection
        eyebrow="Realizacje"
        title="Nasze dachy z bliska"
        lead="Kilka dachów, które przeszły przez nasze ręce – od kamienic z lukarnami po dachy płaskie."
        actions={[
          { label: 'Zobacz realizacje', href: `#${SECTION_IDS.projects}` },
          { label: 'Zapytaj o podobny dach', href: CONTACT_SECTION_HREF },
        ]}
      />
      <PhotoStage
        id={SECTION_IDS.projects}
        title="Co zrobiliśmy"
        lead="Wybrane realizacje z galerii firmy – pokrycia z dachówki, mansardy, lukarny, dachy płaskie i obróbki."
        // A third more scrolling than the offer: each item turns from tracing into photo (D-110)
        vhPerItem={90}
        items={PROJECT_LIST.map((project, index) => ({
          id: project.id,
          label: `Realizacje · ${sheetNumber(index + 1, PROJECT_LIST.length)}`,
          title: project.title,
          details: project.photoYear
            ? `${project.description} Zdjęcie z ${project.photoYear} roku.`
            : project.description,
          photo: project.photo,
          focusX: project.focusX,
          edges: project.edges,
        }))}
      />
      <ContactSection source="Realizacje" />
    </>
  );
}
