import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Roboto_Condensed } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { MobileCallBar } from '@/components/layout/MobileCallBar';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { SITE } from '@/config/site';
import '@/styles/globals.css';

// Variable font – one file covers weights 400–800. Downloaded at build time and self-hosted,
// so visitors' browsers make no requests to Google
const robotoCondensed = Roboto_Condensed({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-roboto-condensed',
});

const defaultTitle = `${SITE.name} – rodzinna firma dekarska od 1992`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: 'pl_PL',
    title: defaultTitle,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#eedf3e', // --color-pd-yellow-500
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl" className={robotoCondensed.variable}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-60 focus:rounded-full focus:bg-pd-navy-900 focus:px-5 focus:py-3 focus:font-bold focus:text-pd-white"
        >
          Przejdź do treści
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <MobileCallBar />
        <SmoothScroll />
      </body>
    </html>
  );
}
