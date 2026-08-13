import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Providers } from './providers';
import { Shell } from '@/components/common/shell';
import './global.css';

export const metadata: Metadata = {
  title: 'NEXUS',
  description: 'NEXUS. Update this description to reflect the app.',
  robots: 'index, follow',
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: 'NEXUS',
    description: 'NEXUS. Update this description to reflect the app.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS',
    description: 'NEXUS. Update this description to reflect the app.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
