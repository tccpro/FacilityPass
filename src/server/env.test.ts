import { describe, expect, it } from 'vitest';

import { EnvironmentValidationError, parseServerEnv } from './env';

describe('parseServerEnv', () => {
  it('accepts an environment with no database configured (the Phase 0 contract)', () => {
    const env = parseServerEnv({ NODE_ENV: 'test' });

    expect(env.DATABASE_URL).toBeUndefined();
    expect(env.NODE_ENV).toBe('test');
  });

  it('treats an empty DATABASE_URL as absent rather than malformed', () => {
    // Vercel project variables can exist and hold "". Without this, a production
    // build fails with a confusing "must not be empty" instead of running
    // database-free as designed.
    expect(parseServerEnv({ DATABASE_URL: '' }).DATABASE_URL).toBeUndefined();
  });

  it('accepts a valid postgres connection string', () => {
    const url = 'postgresql://user:pass@host.example/facilitypass?sslmode=require';

    expect(parseServerEnv({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
  });

  it('rejects a non-postgres DATABASE_URL without echoing the value', () => {
    // A connection string is a secret. The error must name the key and never
    // the value - this test is the mechanism, not the intention.
    const secret = 'mysql://root:hunter2@db.internal/facilitypass';

    try {
      parseServerEnv({ DATABASE_URL: secret });
      expect.unreachable('expected EnvironmentValidationError');
    } catch (error) {
      expect(error).toBeInstanceOf(EnvironmentValidationError);

      const message = (error as Error).message;
      expect(message).toContain('DATABASE_URL');
      expect(message).not.toContain('hunter2');
      expect(message).not.toContain(secret);
    }
  });
});
