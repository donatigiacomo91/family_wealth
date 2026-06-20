import type { Metadata } from 'next';
import { Inter, Fraunces, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { AppHeader } from '@/components/layout/AppHeader';
import { WealthProvider } from '@/lib/wealth-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Patrimonio di famiglia',
  description: 'Gestione delle spese, entrate e patrimonio familiare',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className={`${inter.variable} ${fraunces.variable} ${plexMono.variable} font-sans antialiased`}>
        <WealthProvider>
          <div className="min-h-screen bg-ink-50 p-4 md:p-8">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:gap-6">
              <Sidebar />
              <main className="flex flex-1 flex-col gap-6">
                <AppHeader />
                {children}
              </main>
            </div>
          </div>
        </WealthProvider>
      </body>
    </html>
  );
}
