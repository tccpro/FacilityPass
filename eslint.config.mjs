import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

// `next lint` was removed in Next 16 - ESLint is invoked directly (`eslint .`).
// eslint-config-next ships native flat configs, so FlatCompat is not needed.

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // Must come after the Next configs: turns off stylistic rules that fight
  // Prettier. eslint-config-prettier/flat is a single object - do NOT spread it.
  prettier,

  {
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  {
    // Layering: presentation and pure domain code must not reach into server
    // infrastructure. Business logic belongs in src/modules/<module>/service.ts.
    files: ['src/components/**/*.{ts,tsx}', 'src/app/**/*.tsx', 'src/modules/**/domain.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/server', '@/server/**'],
              message:
                'Layering violation. UI and domain code must not import server infrastructure. ' +
                'Route logic belongs in a Route Handler; business logic in service.ts.',
            },
          ],
        },
      ],
    },
  },

  {
    // API-first: NO module file may depend on the web interface - including
    // repository.ts - or a future public API / MCP adapter cannot reuse it.
    files: ['src/modules/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['next/server', 'next/headers', 'next/navigation', 'next/cache'],
              message:
                'API-first: Route Handlers translate Request -> plain arguments and DTO -> Response. ' +
                'Services and domain code accept and return plain data.',
            },
          ],
        },
      ],
    },
  },

  {
    // Persistence is repository.ts's job, so the database ban is scoped AROUND it
    // rather than over it. repository.ts is the ONLY module file permitted to
    // import drizzle-orm or @/server/db.
    files: ['src/modules/**/{domain,service,schema,types}.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['drizzle-orm', 'drizzle-orm/**', '@/server/db', '@/server/db/**'],
              message:
                'Domain, service, schema and type code must not import the database. ' +
                'Persistence belongs in repository.ts.',
            },
          ],
        },
      ],
    },
  },

  {
    // Makes the @/server ban airtight: without this, `../../server/db` bypasses it.
    // Convention: same directory -> ./, anywhere else -> @/.
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**'],
              message: 'Use the @/* path alias instead of parent-relative imports.',
            },
            {
              // A deliberateness gate, not a ban. FacilityPass is engineering-led and
              // AI-assisted: adding a provider is allowed, but requires an ADR stating
              // why deterministic software is insufficient, the bounded input, the
              // validated output, the abstention path, and how the vendor is isolated.
              group: [
                'openai',
                '@anthropic-ai/*',
                '@google/generative-ai',
                'stripe',
                'next-auth',
                '@auth/*',
              ],
              message:
                'Deferred scope: introducing this requires a new ADR and, for AI, a ' +
                'provider-independent boundary. Do not add a vendor SDK here.',
            },
          ],
        },
      ],
    },
  },

  // Explicit project artifact ignores. Listed here so our intended lint surface is
  // obvious and independent of incidental framework artifacts. (These are ADDED to
  // ESLint's built-in ignores, not a replacement for them.)
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'coverage/**',
    'playwright-report/**',
    'test-results/**',
    'blob-report/**',
  ]),
]);
