import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Mirrors the tsconfig `paths` mapping. Three lines instead of a
    // vite-tsconfig-paths dependency. The Rollup alias matches '@' exactly or
    // '@/...', so scoped package names are untouched.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // Phase 0 has no component logic worth asserting; the rendered page is
    // covered by Playwright. jsdom and Testing Library arrive in Phase 3, when
    // there is component behaviour to test - adding them now would mean six
    // dependencies serving tests that assert nothing.
    environment: 'node',

    include: ['src/**/*.test.ts'],

    // Playwright owns e2e/ and looks only there. The two runners never overlap,
    // and `pnpm test` must never pick up a .spec.ts.
    exclude: ['node_modules/**', '.next/**', 'e2e/**'],

    // An empty run must never satisfy the quality gate.
    passWithNoTests: false,

    clearMocks: true,

    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/modules/**/*.ts', 'src/server/**/*.ts', 'src/lib/**/*.ts'],
      exclude: ['**/*.test.ts'],
    },
  },
});
