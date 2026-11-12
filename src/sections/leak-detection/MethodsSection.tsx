import { CheckList, Panel, Section } from '@/components/ui';
import { SECTION_IDS } from '@/config/routes';
import { sheetNumber } from '@/lib/format';

// docs/firma.md#wykrywanie-nieszczelności-dachów-płaskich – the client's own document
const METHODS = [
  {
    title: 'Lokalizacja elektroakustyczna',
    how: 'Pomiar na powierzchni dachu – wentylowanego i niewentylowanego.',
    points: ['Dokładność do 1 cm', 'Bez zdejmowania żwiru i zieleni'],
  },
  {
    title: 'Zadymianie',
    how: 'Gęsta mgła ze specjalnego płynu, wtłaczana sprężarką z nadciśnieniem pod izolację i we wnęki.',
    points: ['Powłoki izolacyjne i długie rury', 'Działa także w deszczu'],
  },
  {
    title: 'Próbnik iskrowy',
    how: 'Iskra na materiałach nieprzewodzących – bitumie, PCV, TPO, PE-HD i innych – z sygnałem dźwiękowym.',
    points: ['Uszkodzenia niewidoczne gołym okiem', 'Do 2000 m² dziennie'],
  },
];

/**
 * The three methods and what comes after them (docs/mapa-strony.md#scenariusz-podstrony-diagnostyki:
 * "Rozwiązanie", "Metoda 01–03", "Co dostajesz"), as sheets side by side. The pinned scene of the
 * scenario comes later (docs/roadmapa.md).
 */
export function MethodsSection() {
  return (
    <Section
      id={SECTION_IDS.methods}
      theme="white"
      heading={{
        id: 'methods-title',
        title: 'Trzy metody – bez naruszania pokrycia',
        lead: 'Szukanie przecieku na ślepo to zrywanie warstw, przestój i koszty. My najpierw lokalizujemy nieszczelność, a dopiero potem naprawiamy.',
      }}
    >
      <ol className="grid gap-6 lg:grid-cols-3">
        {METHODS.map((method, index) => (
          <li key={method.title}>
            <Panel theme="grey" className="flex h-full flex-col p-6 lg:p-8">
              <p className="text-eyebrow uppercase">
                [ Metoda · {sheetNumber(index + 1, METHODS.length)} ]
              </p>
              <h3 className="mt-3 text-h3">{method.title}</h3>
              <p className="mt-3">{method.how}</p>
              <CheckList items={method.points} className="mt-6" />
            </Panel>
          </li>
        ))}
      </ol>

      <Panel theme="blue" className="mt-6 p-6 lg:p-8">
        <p className="text-h3 text-(--title)">Po diagnozie wskazujemy miejsce i sposób naprawy</p>
        <p className="mt-3 max-w-2xl text-lead">
          Naprawę wykonujemy sami – nie trzeba szukać kolejnej firmy.
        </p>
      </Panel>
    </Section>
  );
}
