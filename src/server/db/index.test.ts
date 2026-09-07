import { describe, expect, it } from 'vitest';

import { parseServerEnv } from '@/server/env';

import { DatabaseNotConfiguredError, resolveDatabaseUrl } from './index';

describe('resolveDatabaseUrl', () => {
  it('throws a typed, explainable error when DATABASE_URL is absent', () => {
    // Phase 0's documented state. The failure must be a named domain error, not
    // a driver stack trace leaking out of @neondatabase/serverless.
    expect(() => resolveDatabaseUrl(parseServerEnv({}))).toThrow(DatabaseNotConfiguredError);
  });

  it('returns the connection string when one is configured', () => {
    const url = 'postgres://user:pass@host.example/facilitypass';

    expect(resolveDatabaseUrl(parseServerEnv({ DATABASE_URL: url }))).toBe(url);
  });
});
