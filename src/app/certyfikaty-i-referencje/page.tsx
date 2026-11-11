import { ROUTES, SECTION_IDS } from '@/config/routes';
import { SITE } from '@/config/site';
import { CERTIFICATE_KIND_LABEL, CERTIFICATE_SHEETS } from '@/data/certificates';
import { sheetNumber } from '@/lib/format';
import { pageMetadata } from '@/lib/metadata';
import { ContactSection, HeroSection, PhotoStage } from '@/sections/common';

export const metadata = pageMetadata({
  title: 'Certyfikaty',
  description: `Certyfikaty ${SITE.name}: autoryzacje Prefa i Euronit, certyfikat kwalifikacji Polskiego Stowarzyszenia Dekarzy, nagroda w konkursie i szkolenia producentów.`,
  path: ROUTES.certificates,
});

/**
 * The certificates (docs/mapa-strony.md, D-113, D-115), at the old site's address: the
 * photo stage of the projects page with the scans (src/data/certificates.ts) – photos only, no
 * tracings – then the contact. TODO(P-05): which documents to show, and current ones
 */
export default function CertificatesPage() {
  return (
    <>
      {/* The home page's hero in the page's words, the gallery in place of the phone (D-116, D-117) */}
      <HeroSection
        eyebrow="Certyfikaty"
        title="Fach potwierdzony na piśmie"
        lead="Autoryzacje Prefa i Euronit, certyfikat kwalifikacji Polskiego Stowarzyszenia Dekarzy, nagroda w konkursie i szkolenia u&nbsp;producentów pokryć, okien i rynien."
        action={{ href: `#${SECTION_IDS.certificates}`, label: 'Zobacz certyfikaty' }}
      />
      <PhotoStage
        id={SECTION_IDS.certificates}
        title="Kto za nas ręczy"
        lead="Skany dokumentów od producentów i Polskiego Stowarzyszenia Dekarzy – po kolei, z tym, kto je wystawił i komu."
        items={CERTIFICATE_SHEETS.map((sheet, index) => ({
          id: sheet.id,
          label: `${CERTIFICATE_KIND_LABEL[sheet.kind]} · ${sheetNumber(index + 1, CERTIFICATE_SHEETS.length)}`,
          title: sheet.title,
          // "Wystawca: Prefa Polska · Dla: POLDACH s.c. · 2006" – no year where the scan has none
          details: [`Wystawca: ${sheet.issuer}`, `Dla: ${sheet.holders.join(' i ')}`, sheet.year]
            .filter(Boolean)
            .join(' · '),
          photo: sheet.image,
        }))}
      />
      <ContactSection source="Certyfikaty" />
    </>
  );
}
