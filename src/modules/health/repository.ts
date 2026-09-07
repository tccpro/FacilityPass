// Persistence for the health check. The only file in this module allowed to
// import the database.

import { sql } from 'drizzle-orm';

import { getDb } from '@/server/db';

/**
 * The cheapest possible round-trip that proves the database is genuinely
 * reachable and answering, not merely that a TCP port accepted a connection.
 *
 * Returns a boolean rather than throwing, because for a health check an
 * unreachable database is information to report, not an exception to propagate.
 * The reason is logged by the caller; the response never carries it, since a
 * driver error can contain host names and credentials.
 */
export async function pingDatabase(): Promise<{ reachable: boolean; error?: unknown }> {
  try {
    await getDb().execute(sql`select 1`);
    return { reachable: true };
  } catch (error) {
    return { reachable: false, error };
  }
}
