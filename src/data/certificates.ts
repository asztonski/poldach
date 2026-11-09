import type { Certificate } from '@/types';
import bauderPiotr from '@/assets/images/certyfikaty/bauder-seminarium-piotr-supinski-2004.jpg';
import bauderJacek from '@/assets/images/certyfikaty/bauder-seminarium-jacek-supinski-2004.jpg';
import eternitHeidelberg from '@/assets/images/certyfikaty/eternit-szkolenie-heidelberg-2004.jpg';
import eternitRoofTraining from '@/assets/images/certyfikaty/eternit-roof-trainingcenter-2003.jpg';
import euronitAuthorization from '@/assets/images/certyfikaty/euronit-autoryzowany-wykonawca-2005.jpg';
import euronitTraining from '@/assets/images/certyfikaty/euronit-szkolenie-jacek-supinski-2005.jpg';
import fakro from '@/assets/images/certyfikaty/fakro-szkolenie-okna-2004.jpg';
import galecoJacek from '@/assets/images/certyfikaty/galeco-szkolenie-jacek-supinski.jpg';
import galecoPiotr from '@/assets/images/certyfikaty/galeco-szkolenie-piotr-supinski.jpg';
import icopal from '@/assets/images/certyfikaty/icopal-szkolenie-papy-2003.jpg';
import ivtJacek from '@/assets/images/certyfikaty/ivt-szkolenie-jacek-supinski-2004.jpg';
import ivtPiotr from '@/assets/images/certyfikaty/ivt-szkolenie-piotr-supinski-2004.jpg';
import izolmat from '@/assets/images/certyfikaty/izolmat-quandt-szkolenie-papy-1999.jpg';
import prefaAuthorization from '@/assets/images/certyfikaty/prefa-autoryzowany-wykonawca-2006.jpg';
import prefaAward from '@/assets/images/certyfikaty/prefa-psd-nagroda-konkurs-2005.jpg';
import prefaJacek from '@/assets/images/certyfikaty/prefa-szkolenie-jacek-supinski-2005.jpg';
import prefaPiotr from '@/assets/images/certyfikaty/prefa-szkolenie-piotr-supinski-2005.jpg';
import psdQualification from '@/assets/images/certyfikaty/psd-certyfikat-kwalifikacji-2005.jpg';
import referenceGdynia from '@/assets/images/certyfikaty/referencje-gdynia-prefa-2005.jpg';
import referenceOpalinski from '@/assets/images/certyfikaty/referencje-koncesjoner-opalinski-2005.jpg';
import rigipsJacek from '@/assets/images/certyfikaty/rigips-szkolenie-jacek-supinski-1999.jpg';
import rigipsPiotr from '@/assets/images/certyfikaty/rigips-szkolenie-piotr-supinski-1999.jpg';
import roto from '@/assets/images/certyfikaty/roto-szkolenie-okna-2004.jpg';

// Scans from the old "Certyfikaty i referencje" page, described from the documents themselves.
// A private home address on the Euronit training and Izolmat scans is covered; originals stay
// outside the repository.
// TODO(P-05): all are from 1999–2006 – the client decides which to publish and supplies current ones.
export const CERTIFICATES: Certificate[] = [
  {
    id: 'prefa-autoryzowany-wykonawca',
    kind: 'authorization',
    issuer: 'Prefa Polska',
    title: 'Autoryzowany Wykonawca systemów dachowych i rynnowych PREFA',
    holder: 'POLDACH s.c.',
    year: 2006,
    image: prefaAuthorization,
  },
  {
    id: 'euronit-autoryzowany-wykonawca',
    kind: 'authorization',
    issuer: 'Euronit',
    title: 'Autoryzowany Wykonawca pokryć dachowych w systemie Euronit',
    holder: 'POLDACH s.c.',
    year: 2005,
    image: euronitAuthorization,
  },
  {
    id: 'psd-certyfikat-kwalifikacji',
    kind: 'qualification',
    issuer: 'Polskie Stowarzyszenie Dekarzy',
    title: 'Certyfikat Kwalifikacji Blacharsko-Dekarskich nr 019/2005 (ważny do 22.07.2007)',
    holder: 'Jacek i Piotr Supińscy',
    year: 2005,
    image: psdQualification,
  },
  {
    id: 'prefa-psd-nagroda',
    kind: 'award',
    issuer: 'Prefa Polska i Polskie Stowarzyszenie Dekarzy',
    title: 'Nagroda w Konkursie 2005, kategoria „Nowe pokrycie w systemie PREFA”',
    holder: 'POLDACH s.c.',
    year: 2006,
    image: prefaAward,
  },
  {
    id: 'referencje-koncesjoner-opalinski',
    kind: 'reference',
    issuer: 'Koncesjoner Opaliński',
    title: 'Referencje za prace dekarsko-blacharskie',
    holder: 'POLDACH s.c.',
    year: 2005,
    image: referenceOpalinski,
  },
  {
    id: 'referencje-gdynia-prefa',
    kind: 'reference',
    issuer: 'Zakład Usług Remontowo-Budowlanych (nazwa na pieczątce nieczytelna)',
    title: 'Referencje za pokrycie PREFALZ i orynnowanie PREFA w Gdyni',
    holder: 'POLDACH s.c.',
    year: 2005,
    image: referenceGdynia,
  },
  {
    id: 'prefa-szkolenie-jacek',
    kind: 'training',
    issuer: 'Prefa Polska',
    title: 'Montaż aluminiowych pokryć dachowych PREFA',
    holder: 'Jacek Supiński',
    year: 2005,
    image: prefaJacek,
  },
  {
    id: 'prefa-szkolenie-piotr',
    kind: 'training',
    issuer: 'Prefa Polska',
    title: 'Montaż aluminiowych pokryć dachowych PREFA',
    holder: 'Piotr Supiński',
    year: 2005,
    image: prefaPiotr,
  },
  {
    id: 'euronit-szkolenie',
    kind: 'training',
    issuer: 'Euronit',
    title: 'Pokrycia z dachówek cementowych i ceramicznych Euronit',
    holder: 'Jacek Supiński',
    year: 2005,
    image: euronitTraining,
  },
  {
    id: 'fakro-szkolenie',
    kind: 'training',
    issuer: 'FAKRO',
    title: 'Montaż okien dachowych FAKRO',
    holder: 'Jacek Supiński',
    year: 2004,
    image: fakro,
  },
  {
    id: 'roto-szkolenie',
    kind: 'training',
    issuer: 'Roto Frank Okna Dachowe',
    title: 'Montaż okien dachowych Roto',
    holder: 'Jacek Supiński',
    year: 2004,
    image: roto,
  },
  {
    id: 'bauder-seminarium-jacek',
    kind: 'training',
    issuer: 'Bauder Polska',
    title: 'Seminarium „Krycie dachów płaskich”',
    holder: 'Jacek Supiński',
    year: 2004,
    image: bauderJacek,
  },
  {
    id: 'bauder-seminarium-piotr',
    kind: 'training',
    issuer: 'Bauder Polska',
    title: 'Seminarium „Krycie dachów płaskich”',
    holder: 'Piotr Supiński',
    year: 2004,
    image: bauderPiotr,
  },
  {
    id: 'ivt-szkolenie-jacek',
    kind: 'training',
    issuer: 'IVT',
    title: 'Montaż folii i akcesoriów dachowych',
    holder: 'Jacek Supiński',
    year: 2004,
    image: ivtJacek,
  },
  {
    id: 'ivt-szkolenie-piotr',
    kind: 'training',
    issuer: 'IVT',
    title: 'Montaż folii i akcesoriów dachowych',
    holder: 'Piotr Supiński',
    year: 2004,
    image: ivtPiotr,
  },
  {
    id: 'eternit-szkolenie-heidelberg',
    kind: 'training',
    issuer: 'Eternit AG (Heidelberg)',
    title: 'Krycie płytami Eternit („Deutsche Deckung”)',
    holder: 'Jacek Supiński',
    year: 2004,
    image: eternitHeidelberg,
  },
  {
    id: 'eternit-roof-trainingcenter',
    kind: 'training',
    issuer: 'Roof Trainingcenter Eternit (Belgia)',
    title: 'Basic Training – Covering of Slates',
    holder: 'Jacek Supiński',
    year: 2003,
    image: eternitRoofTraining,
  },
  {
    id: 'icopal-szkolenie',
    kind: 'training',
    issuer: 'Icopal',
    title: 'Montaż pap zgrzewalnych i mocowanych mechanicznie oraz gontów papowych',
    holder: 'Jacek Supiński',
    year: 2003,
    image: icopal,
  },
  {
    id: 'izolmat-szkolenie',
    kind: 'training',
    issuer: 'Izolmat Gdańsk i W. Quandt Dachbahnen-Fabrik',
    title: 'Dobór i układanie pap zgrzewalnych i płyt IZOLDACH',
    holder: 'Jacek Supiński',
    year: 1999,
    image: izolmat,
  },
  {
    id: 'rigips-szkolenie-jacek',
    kind: 'training',
    issuer: 'Rigips Polska',
    title: 'Montaż systemów płyt gipsowo-kartonowych Rigips',
    holder: 'Jacek Supiński',
    year: 1999,
    image: rigipsJacek,
  },
  {
    id: 'rigips-szkolenie-piotr',
    kind: 'training',
    issuer: 'Rigips Polska',
    title: 'Montaż systemów płyt gipsowo-kartonowych Rigips',
    holder: 'Piotr Supiński',
    year: 1999,
    image: rigipsPiotr,
  },
  {
    id: 'galeco-szkolenie-jacek',
    kind: 'training',
    issuer: 'Galeco',
    title: 'Systemy rynnowe Galeco – parametry i montaż',
    holder: 'Jacek Supiński',
    year: null,
    image: galecoJacek,
  },
  {
    id: 'galeco-szkolenie-piotr',
    kind: 'training',
    issuer: 'Galeco',
    title: 'Systemy rynnowe Galeco – parametry i montaż',
    holder: 'Piotr Supiński',
    year: null,
    image: galecoPiotr,
  },
];

// On the home page, in this order; `name` is the short name next to the scan (docs/decyzje.md D-26)
// TODO(P-05): documents from 2005–2006 – the client confirms them and supplies current ones
const FEATURED = [
  { id: 'euronit-autoryzowany-wykonawca', name: 'Euronit' },
  { id: 'prefa-autoryzowany-wykonawca', name: 'Prefa' },
  { id: 'prefa-psd-nagroda', name: 'Nagroda Prefa i PSD' },
];

export const FEATURED_CERTIFICATES = FEATURED.flatMap(({ id, name }) => {
  const certificate = CERTIFICATES.find((candidate) => candidate.id === id);
  return certificate ? [{ ...certificate, name }] : [];
});
