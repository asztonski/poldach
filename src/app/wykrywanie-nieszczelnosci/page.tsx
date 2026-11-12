import videoPoster from '@/assets/images/wideo/wykrywanie-nieszczelnosci-plakat.webp';
import { VideoPlayer } from '@/components/common/VideoPlayer';
import { CONTACT_SECTION_HREF, ROUTES, SECTION_IDS } from '@/config/routes';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, PageHero } from '@/sections/common';
import { MethodsSection } from '@/sections/leak-detection/MethodsSection';

export const metadata = pageMetadata({
  title: 'Wykrywanie nieszczelności dachów płaskich',
  description:
    'Lokalizujemy przecieki dachów płaskich bez naruszania pokrycia – metodą elektroakustyczną z dokładnością do 1 cm, zadymianiem i próbnikiem iskrowym. Wskazujemy sposób naprawy i naprawiamy.',
  path: ROUTES.leakDetection,
});

// In public/: a video is served as it is, without a loader
const LEAK_DETECTION_VIDEO = '/video/wykrywanie-nieszczelnosci.mp4';

/**
 * The landing page of the video campaign (docs/mapa-strony.md#scenariusz-podstrony-diagnostyki,
 * D-02, D-84): the ad next to the problem (D-88), the three methods, what comes after them, the
 * contact. The pinned scene with the methods – docs/roadmapa.md.
 */
export default function LeakDetectionPage() {
  return (
    <>
      <PageHero
        eyebrow="Wykrywanie nieszczelności dachów płaskich"
        title="Przeciek na dachu płaskim? Tylko skąd kapie?"
        lead="Lokalizujemy nieszczelność bez naruszania pokrycia – trzema metodami. Potem wskazujemy miejsce i sposób naprawy, a naprawę wykonujemy sami."
        // D-121: the campaign ends with booking the diagnosis; the three methods right below
        actions={[
          { label: 'Umów lokalizację przecieku', href: CONTACT_SECTION_HREF },
          { label: 'Zobacz trzy metody', href: `#${SECTION_IDS.methods}` },
        ]}
        visual={
          // The campaign's own ad (4:5, 30 s) in place of a photo (D-88)
          <VideoPlayer
            src={LEAK_DETECTION_VIDEO}
            poster={videoPoster}
            label="Reklama POLDACH: przeciek w hali, trzy metody lokalizacji nieszczelności i kontakt"
            className="mx-auto w-full max-w-sm lg:max-w-md"
          />
        }
      />
      <MethodsSection />
      <ContactSection
        source="Wykrywanie nieszczelności"
        title="Umówmy lokalizację przecieku"
        lead="Napisz, jaki to dach – pokrycie, powierzchnia, gdzie widać zacieki. Odpowiemy i ustalimy termin."
      />
    </>
  );
}
