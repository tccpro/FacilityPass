import { buildHealthReport } from './domain';
import { pingDatabase } from './repository';
import { type DependencyConnectivity, type HealthReport } from './schema';

export interface HealthCheckContext {
  readonly databaseConfigured: boolean;
  readonly environment: HealthReport['environment'];
  readonly phase: string;
  readonly checkedAt: Date;
}

/**
 * Orchestration: decide whether a connection attempt is even possible, make it,
 * then hand plain data to the pure domain function.
 *
 * The service does the I/O and the domain does the reasoning. That split is why
 * every status rule is unit-testable without a database.
 */
export async function checkHealth(context: HealthCheckContext): Promise<HealthReport> {
  let connectivity: DependencyConnectivity = 'NOT_CHECKED';

  if (context.databaseConfigured) {
    const { reachable, error } = await pingDatabase();
    connectivity = reachable ? 'REACHABLE' : 'UNREACHABLE';

    if (!reachable) {
      // The server log keeps the driver error; the response never carries it,
      // because a connection failure can name hosts and credentials.
      console.error('[health] database ping failed', error);
    }
  }

  return buildHealthReport({
    databaseConfigured: context.databaseConfigured,
    databaseConnectivity: connectivity,
    environment: context.environment,
    phase: context.phase,
    checkedAt: context.checkedAt,
  });
}
