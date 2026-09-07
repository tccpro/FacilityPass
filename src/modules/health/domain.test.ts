import { describe, expect, it } from 'vitest';

import { buildHealthReport } from './domain';
import { HealthReportSchema } from './schema';

const CHECKED_AT = new Date('2026-08-20T09:41:02.517Z');

const base = {
  environment: 'test',
  phase: '1',
  checkedAt: CHECKED_AT,
} as const;

describe('buildHealthReport', () => {
  it('degrades when no database is configured, because from Phase 1 that is a misconfiguration', () => {
    // This flipped at Phase 1. In Phase 0, running without a database was the
    // documented state and stayed `ok`. Now the application needs one, so a
    // missing DATABASE_URL must make a platform health check fail loudly rather
    // than report a green service that cannot serve a single page.
    const report = buildHealthReport({
      ...base,
      databaseConfigured: false,
      databaseConnectivity: 'NOT_CHECKED',
    });

    expect(report.status).toBe('degraded');
    expect(report.checks.database.configured).toBe(false);
    expect(report.checks.database.connectivity).toBe('NOT_CHECKED');
  });

  it('never claims reachability from the mere presence of a connection string', () => {
    // The most important test here: having a string is not having a working
    // database. Configuration and connectivity stay separate facts, and
    // NOT_CHECKED is an absence of evidence rather than a soft pass.
    const report = buildHealthReport({
      ...base,
      databaseConfigured: true,
      databaseConnectivity: 'NOT_CHECKED',
    });

    expect(report.checks.database.configured).toBe(true);
    expect(report.checks.database.connectivity).toBe('NOT_CHECKED');
    expect(report.checks.database.detail).toMatch(/not assumed/);
    // We did not try, and not trying is not evidence of failure.
    expect(report.status).toBe('ok');
  });

  it('reports REACHABLE only after a query actually succeeded', () => {
    const report = buildHealthReport({
      ...base,
      databaseConfigured: true,
      databaseConnectivity: 'REACHABLE',
    });

    expect(report.checks.database.connectivity).toBe('REACHABLE');
    expect(report.status).toBe('ok');
  });

  it('degrades when a configured database is unreachable', () => {
    const report = buildHealthReport({
      ...base,
      databaseConfigured: true,
      databaseConnectivity: 'UNREACHABLE',
    });

    expect(report.status).toBe('degraded');
  });

  it('satisfies its own published DTO schema', () => {
    // Validating against the same schema the handler serializes means the
    // contract is tested rather than assumed.
    const report = buildHealthReport({
      ...base,
      databaseConfigured: true,
      databaseConnectivity: 'REACHABLE',
    });

    expect(HealthReportSchema.safeParse(report).success).toBe(true);
    expect(report.checkedAt).toBe('2026-08-20T09:41:02.517Z');
  });
});
