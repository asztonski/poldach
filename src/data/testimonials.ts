export type Testimonial = {
  id: string;
  /** Word for word from the source; "[…]" marks a cut, only the punctuation is mended */
  quote: string;
  /** First name and the initial of the surname */
  name: string;
  /** Who they are or what was done for them */
  role: string;
  place: string;
  /** Only where the source dates it exactly – a letter; Google shows only "x lat temu" */
  year?: number;
  /** Where the opinion comes from */
  source: 'letter' | 'google';
  /** Stars out of 5 – Google: the review's own; letters: 5 by the owner's decision (D-77) */
  rating: number;
};

/*
 * Opinions of clients (docs/decyzje.md D-74), the newest first. Google: five-star reviews of the
 * POLDACH listing in Kokoszkowy, from the owner's screenshots (10.11.2026: "4 lata temu", "6 lat
 * temu"); the name of the staff member and the brand are cut out. Letters: the two from the old
 * "Certyfikaty i referencje" page, quoted from the scans (src/data/certificates.ts).
 * TODO(P-05): may the letters be published? TODO(P-23): one or two more Google reviews, ideally about a roof
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'google-marcin-z',
    quote:
      'Miałem okazję zakupić tutaj podłogi do całego mieszkania oraz drzwi i to wszystko z montażem. Jestem bardzo zadowolony z tego jak przebiegała nasza współpraca i efektu końcowego. […] z pewnością wrócę na kolejne zakupy.',
    name: 'Marcin Z.',
    role: 'Podłogi i drzwi z montażem',
    place: 'Salon w Kokoszkowych',
    source: 'google',
    rating: 5,
  },
  {
    id: 'google-patrycja-m',
    quote:
      'Świetna ekspozycja w sklepie, bardzo duży wybór podłóg wysokiej jakości i profesjonalna obsługa. […] Poziom obsługi jak w najlepszych salonach podłóg w Trójmieście, a ceny korzystne jak w sklepach internetowych. Polecam.',
    name: 'Patrycja M.',
    role: 'Podłoga i listwy przypodłogowe',
    place: 'Salon w Kokoszkowych',
    source: 'google',
    rating: 5,
  },
  {
    id: 'koncesjoner-opalinski-2005',
    quote:
      '[…] zlecone prace dekarsko-blacharskie zostały wykonane wzorowo i są godne polecenia innym inwestorom. […] Efekt współpracy okazał się przewyższyć moje oczekiwania.',
    name: 'Andrzej O.',
    role: 'Prezes zarządu, salon Renault',
    place: 'Bolesławice',
    year: 2005,
    source: 'letter',
    rating: 5,
  },
  {
    id: 'gdynia-prefa-2005',
    quote:
      'Pragnę potwierdzić, że firma P.H.U. „POLDACH” s.c. […] wykonała prace dekarsko-blacharskie w wzorowy sposób. […] Myślę, że mój budynek będzie się wyróżniał, a szczególny wpływ na jego wygląd ma właśnie dach.',
    name: 'Zakład Usług Remontowo-Budowlanych',
    role: 'Pokrycie PREFALZ i orynnowanie PREFA',
    place: 'Gdynia',
    year: 2005,
    source: 'letter',
    rating: 5,
  },
];
