import { ContactForm } from '@/components/common/ContactForm';
import { MapCard } from '@/components/common/MapCard';
import { Panel, PhoneButton, Section, quietLinkClasses } from '@/components/ui';
import { SECTION_IDS } from '@/config/routes';
import { SITE, addressLine, emailHref } from '@/config/site';
import { sheetNumber } from '@/lib/format';

// The way of working (docs/firma.md#oferta) – the four steps next to the form (docs/mapa-strony.md)
const STEPS = [
  'Bezpłatne doradztwo',
  'Wycena – kosztorys',
  'Materiał – nasz albo powierzony',
  'Wykonanie',
];

type ContactSectionProps = {
  /** The page it closes – the last line of the form's e-mail and a parameter of its GA event */
  source: string;
  title?: string;
  lead?: string;
};

/**
 * Contact, closing the home page and the subpages (docs/mapa-strony.md, docs/decyzje.md D-84–D-86):
 * how to start, the phone, the e-mail and the shop's address with the map; next to them the form.
 * Its id is the anchor of the menu's "Kontakt" and of the "Bezpłatna wycena" buttons.
 * Opening hours – TODO(P-02).
 */
export function ContactSection({
  source,
  title = 'Zacznijmy od rozmowy',
  lead = 'Zadzwoń albo napisz, co jest do zrobienia – dach, drzwi, podłogi. Doradztwo i wycena są bezpłatne.',
}: ContactSectionProps) {
  return (
    <Section
      id={SECTION_IDS.contact}
      theme="white"
      heading={{ id: 'contact-title', title, lead }}
      // On phones the form comes right after the steps, the details and the map below it
      containerClassName="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-8"
    >
      <div className="lg:col-span-5">
        <h3 className="text-eyebrow text-(--label) uppercase">Jak zacząć</h3>
        <ol className="mt-4 divide-y divide-pd-navy-900/20 border-y border-pd-navy-900/20">
          {STEPS.map((step, index) => (
            <li key={step} className="flex items-baseline gap-4 py-3 text-list">
              <span className="text-eyebrow">{sheetNumber(index + 1, STEPS.length)}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <Panel
        theme="grey"
        className="p-6 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:p-10"
      >
        <h3 className="text-h3 text-(--title)">Napisz do nas</h3>
        <p className="mt-2 mb-6">Kilka zdań wystarczy – resztę ustalimy w rozmowie.</p>
        <ContactForm source={source} />
      </Panel>

      <div className="lg:col-span-5">
        <h3 className="text-eyebrow text-(--label) uppercase">Siedziba i salon</h3>
        <address className="mt-4 not-italic">
          <p className="font-bold">{SITE.legalName}</p>
          <p>{addressLine}</p>
        </address>
        <PhoneButton className="mt-6" />
        <p className="mt-4 font-bold">
          <a href={emailHref} className={quietLinkClasses()}>
            {SITE.contact.email}
          </a>
        </p>
        <MapCard className="mt-8" />
      </div>
    </Section>
  );
}
