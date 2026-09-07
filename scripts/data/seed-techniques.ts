/**
 * Seeds the closed technique vocabulary from data/curated/techniques.json.
 *
 * Seed data never travels as a migration - `drizzle/` contains DDL only. A
 * migration is a schema decision; this is content, and content changes on a
 * different cadence and needs different review.
 *
 * Techniques are a curated vocabulary WE control, not claims about any facility,
 * so describing XRD as "X-ray diffraction" invents nothing. Facility
 * capabilities are a different matter entirely and require evidence.
 *
 * Idempotent: upserts by slug, so re-running changes nothing.
 *
 *   pnpm data:seed
 */

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

import { closeDb, getDb } from '@/server/db';
import { techniques } from '@/server/db/schema';
import { TechniqueListSchema } from '@/modules/techniques/schema';

const SOURCE = fileURLToPath(new URL('../../data/curated/techniques.json', import.meta.url));

async function main(): Promise<void> {
  const raw: unknown = JSON.parse(await readFile(SOURCE, 'utf8'));

  // Validate before touching the database. A malformed curated file should fail
  // here with a readable error, not halfway through a transaction.
  const parsed = TechniqueListSchema.parse(raw);

  const db = getDb();

  for (const technique of parsed) {
    await db
      .insert(techniques)
      .values({
        slug: technique.slug,
        name: technique.name,
        category: technique.category,
        description: technique.description,
      })
      .onConflictDoUpdate({
        target: techniques.slug,
        set: {
          name: technique.name,
          category: technique.category,
          description: technique.description,
          updatedAt: new Date(),
        },
      });
  }

  console.warn(`seeded ${parsed.length} techniques`);
  await closeDb();
}

await main();
