// The database boundary.
//
// PHASE 1: DATABASE_URL is now REQUIRED (see docs/founder/decisions/003). The Phase 0
// no-database contract has ended deliberately - but the LAZINESS has not.
//
// `getDb()` stays lazy for a reason that outlives Phase 0: Next evaluates module
// top-level code for prerendered routes during `next build`. A pool created at
// module scope would make the build require a reachable database, which would
// couple every CI run and every deployment build to database availability.
// Pages that read data declare themselves dynamic instead.

import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { serverEnv, type ServerEnv } from '@/server/env';

import * as schema from './schema';

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super(
      'DATABASE_URL is not configured. Set it in .env.local - see .env.example for the ' +
        'expected shape.',
    );
    this.name = 'DatabaseNotConfiguredError';
  }
}

/** Pure guard, extracted so the boundary is testable without a driver. */
export function resolveDatabaseUrl(env: ServerEnv): string {
  if (env.DATABASE_URL === undefined) {
    throw new DatabaseNotConfiguredError();
  }
  return env.DATABASE_URL;
}

let pool: Pool | undefined;
let instance: NodePgDatabase<typeof schema> | undefined;

/**
 * Lazy accessor. One pool per process, reused across requests.
 *
 * node-postgres rather than the Neon HTTP driver, so local Docker Postgres and a
 * hosted Neon instance use the SAME driver path - a dev/prod driver split is
 * where "works on my machine" bugs live. It is also the driver the Phase 1
 * import script needs, because the HTTP driver has no interactive transactions.
 */
export function getDb(): NodePgDatabase<typeof schema> {
  if (!instance) {
    pool = new Pool({ connectionString: resolveDatabaseUrl(serverEnv()) });
    instance = drizzle(pool, { schema });
  }
  return instance;
}

/** Configuration presence only. Says nothing about reachability. */
export function isDatabaseConfigured(): boolean {
  return serverEnv().DATABASE_URL !== undefined;
}

/** Closes the pool. For scripts and integration tests; the server never calls it. */
export async function closeDb(): Promise<void> {
  await pool?.end();
  pool = undefined;
  instance = undefined;
}
