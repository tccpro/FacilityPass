import { defineConfig } from 'drizzle-kit';

/**
 * PHASE 0: configuration only.
 *
 * No drizzle-kit command is wired into package.json yet, because
 * src/server/db/schema.ts declares no tables and every command that applies
 * changes needs a reachable database. A script that can only throw is a bad
 * developer interface. The db:* scripts arrive in Phase 1.
 *
 * `next build` never imports this file - it is type-checked, not executed - so
 * it cannot affect the Phase 0 no-database contract.
 *
 * `?? ''` rather than `!`: a non-null assertion would be a lie about a value we
 * know may be absent. drizzle-kit only reads dbCredentials for the commands
 * that actually connect (push / migrate / pull); `generate` reads the schema
 * file alone and needs no database.
 */
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/server/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? '',
  },
});
