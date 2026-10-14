import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Crônicas de Sangue e Gelo',
  description: 'RPG Narrativo de Westeros',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-valyrian-dark text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
