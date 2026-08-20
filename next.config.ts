import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Statically typed links. Top-level in Next 16 (it was experimental in 15).
  // Requires `.next/types/**/*.ts` in the tsconfig `include` array, which is why
  // `exclude` must never list `.next` - exclude filters the result of include, so
  // it would silently cancel typedRoutes and the PageProps/LayoutProps helpers.
  typedRoutes: true,

  // No `output` key: Vercel's default Next.js build target is what we deploy.
  // 'standalone' fights Vercel's packaging and 'export' removes Route Handlers.

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },

  // A Content-Security-Policy belongs to Phase 6 hardening, where it can be written
  // against the real script surface instead of guessed at. Phase 5 adds
  // Referrer-Policy: no-referrer and X-Robots-Tag: noindex to the token routes.
};

export default nextConfig;
