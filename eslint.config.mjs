import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';

// `next lint` was removed in Next 16 - ESLint is invoked directly (`eslint .`).
// eslint-config-next ships native flat configs, so FlatCompat is not needed.

// ---------------------------------------------------------------------------
// Import-boundary patterns.
//
// IMPORTANT: in flat config, when several config objects match a file, a rule's
// options are REPLACED by the last match - they are NOT merged. A later block
// carrying `no-restricted-imports` therefore silently discards the patterns of
// every earlier one.
//
// So each scope below spells out its COMPLETE set, and scopes are ordered
// broad -> specific so the last match for any file is the most complete. The
// acceptance procedure in docs/founder/debugging.md exists because an earlier version
// of this file got exactly that wrong and the boundary was decorative.
// ---------------------------------------------------------------------------

const noParentRelative = {
  group: ['../**'],
  message:
    'Use the @/* path alias instead of parent-relative imports. ' +
    'Convention: same directory -> ./, anywhere else -> @/.',
};

const noVendorSdk = {
  // A deliberateness gate, not a ban. FacilityPass is engineering-led and
  // AI-assisted: adding a provider is allowed, but requires an ADR stating why
  // deterministic software is insufficient, the bounded input, the validated
  // output, the abstention path, and how the vendor stays isolated.
  group: ['openai', '@anthropic-ai/*', '@google/generative-ai', 'stripe', 'next-auth', '@auth/*'],
  message:
    'Deferred scope: introducing this requires a new ADR and, for AI, a ' +
    'provider-independent boundary. Do not add a vendor SDK here.',
};

const noServerInfrastructure = {
  group: ['@/server', '@/server/**'],
  message:
    'Layering violation. UI and pure domain code must not import server infrastructure. ' +
    'Route logic belongs in a Route Handler; business logic in service.ts.',
};

const noWebFramework = {
  group: ['next/server', 'next/headers', 'next/navigation', 'next/cache'],
  message:
    'API-first: Route Handlers translate Request -> plain arguments and DTO -> Response. ' +
    'Services and domain code accept and return plain data, so a future public API or ' +
    'MCP adapter can reuse them unchanged.',
};

const noDatabase = {
  group: ['drizzle-orm', 'drizzle-orm/**', '@/server/db', '@/server/db/**'],
  message:
    'Domain, service, schema and type code must not import the database. ' +
    'Persistence belongs in repository.ts, which is deliberately exempt from this rule.',
};

const restrict = (...patterns) => ({
  'no-restricted-imports': ['error', { patterns }],
});

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

  // Baseline for everything under src/.
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: restrict(noParentRelative, noVendorSdk),
  },

  // Presentation must not reach into server infrastructure.
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/app/**/*.tsx'],
    rules: restrict(noParentRelative, noVendorSdk, noServerInfrastructure),
  },

  // API-first: no module file may depend on the web interface - repository.ts
  // included. Persistence is still permitted here; that is repository.ts's job.
  {
    files: ['src/modules/**/*.ts'],
    rules: restrict(noParentRelative, noVendorSdk, noWebFramework),
  },

  // The database ban is scoped AROUND repository.ts, not over it. Banning it
  // there would forbid the exact job the file exists to do.
  {
    files: ['src/modules/**/{domain,service,schema,types}.ts'],
    rules: restrict(noParentRelative, noVendorSdk, noWebFramework, noDatabase),
  },

  // domain.ts is the strictest: pure rules, type-only imports, no I/O at all.
  {
    files: ['src/modules/**/domain.ts'],
    rules: restrict(
      noParentRelative,
      noVendorSdk,
      noWebFramework,
      noDatabase,
      noServerInfrastructure,
    ),
  },

  // Explicit project artifact ignores. Listed here so our intended lint surface
  // is obvious and independent of incidental framework artifacts. (These are
  // ADDED to ESLint's built-in ignores, not a replacement for them.)
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
