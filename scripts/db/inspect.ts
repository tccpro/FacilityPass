/**
 * Database inspection utility (read-only diagnostics).
 *
 *   pnpm db:inspect
 *
 * Reads DATABASE_URL from the environment (--env-file-if-exists=.env.local in
 * the package script). Never accepts a connection string argument: connection
 * strings contain credentials, and credentials do not belong in shell history.
 * Reports server version, tables, row counts, and applied drizzle migrations.
 * Makes no writes.
 */

import { Client } from 'pg';

async function main(): Promise<void> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is not configured - nothing to inspect. (Exit code 1.)');
    process.exit(1);
  }

  const client = new Client({ connectionString: url });

  try {
    await client.connect();

    const version = await client.query<{ version: string }>('select version()');
    const versionRow = version.rows[0];
    if (!versionRow) throw new Error('server version query returned no rows');
    console.warn(`VERSION: ${versionRow.version}`);

    const tables = await client.query<{ table_name: string }>(
      "select table_name from information_schema.tables where table_schema = 'public' order by 1",
    );
    console.warn(`TABLES: ${JSON.stringify(tables.rows.map((row) => row.table_name))}`);

    for (const { table_name } of tables.rows) {
      const count = await client.query<{ n: number }>(
        `select count(*)::int as n from "${table_name}"`,
      );
      const countRow = count.rows[0];
      if (!countRow) throw new Error(`count query for "${table_name}" returned no rows`);
      console.warn(`rows/${table_name}: ${countRow.n}`);
    }

    try {
      const migrations = await client.query<{ n: number }>(
        'select count(*)::int as n from drizzle.__drizzle_migrations',
      );
      const migrationsRow = migrations.rows[0];
      if (!migrationsRow) throw new Error('migration count query returned no rows');
      console.warn(`applied drizzle migrations: ${migrationsRow.n}`);
    } catch {
      console.warn('applied drizzle migrations: none recorded');
    }
  } catch (error) {
    console.error(`DB_ERROR: ${error instanceof Error ? error.message : String(error)}`);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

void main();
