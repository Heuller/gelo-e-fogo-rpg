import type { Metadata } from 'next';
import { Cinzel, EB_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Crônicas de Sangue e Gelo — Códice Vivo',
  description: 'RPG Textual Grimdark e Motor 2d6 Autoritativo de Westeros',
  manifest: '/manifest.webmanifest',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      'noimageindex': true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${ebGaramond.variable} ${inter.variable}`}>
      <body className="antialiased bg-grimdark-bg text-grimdark-parchment font-garamond selection:bg-grimdark-crimson selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
