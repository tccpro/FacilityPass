// Server-side environment contract for FacilityPass.
//
// Two rules govern this file:
//
//   1. Nothing here runs at module-evaluation time. Validation happens inside
//      serverEnv() on first call, so importing this module can never fail a
//      build. Next evaluates module top-level code for prerendered routes
//      during `next build`; an eager parse here would couple the build to the
//      developer's environment.
//
//   2. Error messages name KEYS, never VALUES. A DATABASE_URL contains a
//      password, and an invalid-config error is exactly the kind of message
//      that ends up pasted into an issue tracker.
//
// DATABASE_URL stays OPTIONAL in this schema even though the application needs a
// database from Phase 1 onward. ADR 003 originally said Phase 1 would make it
// required; ADR 003 revision 2 records why that was wrong.
//
// Making it required here would mean env parsing throws when it is absent - and
// then /api/health cannot report `configured: false`, because the process fails
// before it can tell you anything. The endpoint whose whole job is to diagnose
// misconfiguration would be the first casualty of misconfiguration.
//
// Instead, absence is caught at the point of use:
//   - src/server/db resolveDatabaseUrl() throws a typed DatabaseNotConfiguredError
//   - /api/health reports configured: false and DEGRADES to 503, so a platform
//     health check fails loudly on a deploy with no database
//
// That keeps `next build` free of any database requirement, keeps the diagnostic
// endpoint able to diagnose, and still fails unmistakably when misconfigured.

import { z } from 'zod';

const postgresConnectionString = z
  .string()
  .min(1, { error: 'must not be empty' })
  .refine((value) => value.startsWith('postgres://') || value.startsWith('postgresql://'), {
    error: 'must be a postgres:// or postgresql:// connection string',
  });

export const serverEnvSchema = z.object({
  /** Set to "production" by `next build` and "test" by Vitest. */
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  /**
   * Optional in the schema, mandatory in practice from Phase 1. Absence is a
   * supported, REPORTED state - never silently substituted, and never the thing
   * that stops the app explaining itself. See the header note.
   */
  DATABASE_URL: postgresConnectionString.optional(),

  /** Injected by Vercel. Absent locally. Reported by /api/health. */
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

export class EnvironmentValidationError extends Error {
  readonly issues: readonly string[];

  constructor(issues: readonly string[]) {
    super(`Invalid server environment:\n${issues.map((issue) => `  - ${issue}`).join('\n')}`);
    this.name = 'EnvironmentValidationError';
    this.issues = issues;
  }
}

/**
 * Pure, testable parse. Does NOT read process.env, so a test never depends on
 * the developer's ambient shell.
 *
 * Empty strings are treated as absent: a Vercel project variable that exists
 * but holds "" is a missing value, not a malformed one, and must fall through
 * to the schema default or to `undefined`.
 */
export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const present = Object.fromEntries(
    Object.entries(source).filter(([, value]) => value !== undefined && value !== ''),
  );

  const result = serverEnvSchema.safeParse(present);
  if (result.success) {
    return result.data;
  }

  // Keys and messages only. Never issue.input, never the offending value.
  throw new EnvironmentValidationError(
    result.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`),
  );
}

let cached: ServerEnv | undefined;

/** Memoized accessor over the real process environment. Server code only. */
export function serverEnv(): ServerEnv {
  cached ??= parseServerEnv(process.env);
  return cached;
}
