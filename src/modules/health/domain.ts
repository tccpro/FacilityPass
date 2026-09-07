import type { DependencyConnectivity, HealthReport } from './schema';

export interface HealthInput {
  /** Whether DATABASE_URL is set. Says nothing about reachability. */
  readonly databaseConfigured: boolean;
  /** Result of an actual connection attempt. Always NOT_CHECKED in Phase 0. */
  readonly databaseConnectivity: DependencyConnectivity;
  readonly environment: HealthReport['environment'];
  readonly phase: string;
  /** Passed in, never read from a clock, so the function stays deterministic. */
  readonly checkedAt: Date;
}

function describeDatabase(configured: boolean, connectivity: DependencyConnectivity): string {
  if (!configured) {
    return 'DATABASE_URL is not set. FacilityPass is running without a database; no facility data is available.';
  }
  switch (connectivity) {
    case 'NOT_CHECKED':
      return 'DATABASE_URL is set, but no connection has been opened. Reachability is not known and is not assumed.';
    case 'REACHABLE':
      return 'A query against the configured database succeeded.';
    case 'UNREACHABLE':
      return 'DATABASE_URL is set, but a connection attempt failed.';
  }
}

/**
 * Pure. No I/O, no environment access, no clock, and type-only imports - so it
 * is trivially testable, and so the Route Handler decides nothing.
 */
export function buildHealthReport(input: HealthInput): HealthReport {
  // From Phase 1 the application needs a database, so a missing one is a
  // misconfiguration rather than a documented state - it degrades, which makes a
  // platform health check fail loudly on a deploy with no DATABASE_URL.
  //
  // NOT_CHECKED with a configured database is still `ok`: we did not try, and not
  // trying is not evidence of failure. That distinction is the whole reason
  // `configured` and `connectivity` are separate fields.
  const status: HealthReport['status'] =
    !input.databaseConfigured || input.databaseConnectivity === 'UNREACHABLE' ? 'degraded' : 'ok';

  return {
    service: 'facilitypass',
    status,
    phase: input.phase,
    environment: input.environment,
    checkedAt: input.checkedAt.toISOString(),
    checks: {
      database: {
        configured: input.databaseConfigured,
        connectivity: input.databaseConnectivity,
        detail: describeDatabase(input.databaseConfigured, input.databaseConnectivity),
      },
    },
  };
}
