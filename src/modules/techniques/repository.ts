// The ONLY file in this module permitted to import the database. The ESLint
// layering rule is scoped around repository.ts rather than over it, because
// owning persistence is precisely the job this file exists to do.

import { asc } from 'drizzle-orm';

import { getDb } from '@/server/db';
import { techniques, type TechniqueRow } from '@/server/db/schema';

export async function findAllTechniques(): Promise<TechniqueRow[]> {
  return getDb().select().from(techniques).orderBy(asc(techniques.name));
}
