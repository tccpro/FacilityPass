import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { APP_NAME, APP_PROMISE, SITE_URL } from '@/lib/app-meta';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${APP_NAME} - ${APP_PROMISE}`,
    template: `%s · ${APP_NAME}`,
  },
  description:
    'FacilityPass helps researchers and R&D teams identify scientific facilities that appear ' +
    'compatible with a measurement they already know they need, inspect the evidence behind ' +
    'each match, and ask the facility to confirm technical feasibility.',
  applicationName: APP_NAME,

  // Phase 0 publishes no facility data. Nothing here should be indexed until
  // curated authoritative records exist. Deployable and indexable are separate
  // states, and this is the one that stays off until the data earns it.
  robots: { index: false, follow: false },

  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f8fa' },
    { media: '(prefers-color-scheme: dark)', color: '#14171b' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col antialiased">
        <a
          href="#main"
          className="sr-only rounded-panel border-line bg-surface text-ink focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:border focus:px-4 focus:py-2 focus:shadow-lg"
        >
          Skip to main content
        </a>

        <SiteHeader />

        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:py-24">
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
