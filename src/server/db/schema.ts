// Drizzle schema root.
//
// Tables arrive per phase - a migration represents an actual decision, so a table
// is created by the phase that needs it, never five phases early.
// See docs/founder/data-model.md.
//
//   Phase 1  techniques -> facilities -> measurement_offerings -> evidence_assertions
//   Phase 2  none - a match is derived data
//   Phase 4  experiment_passports
//   Phase 5  feasibility_requests + feasibility_responses (with token columns)

import { pgTable, text, timestamp, bigserial, uniqueIndex } from 'drizzle-orm/pg-core';

/**
 * A normalized scientific measurement technique.
 *
 * The first table deliberately: it has no foreign keys and no evidence, so the
 * migration path and the repository -> service -> page route can be proven
 * before anything scientifically subtle is introduced.
 *
 * `slug` is the public identifier. Techniques are a small, curated, closed
 * vocabulary that we control, so they need no separate immutable public_id the
 * way facilities do.
 */
export const techniques = pgTable(
  'techniques',
  {
    /** Internal. Never leaves the server. */
    id: bigserial('id', { mode: 'number' }).primaryKey(),
    slug: text('slug').notNull(),
    name: text('name').notNull(),
    /** e.g. diffraction, spectroscopy, microscopy. Free text until the real corpus proves a closed set. */
    category: text('category').notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('techniques_slug_idx').on(table.slug)],
);

export type TechniqueRow = typeof techniques.$inferSelect;
export type NewTechniqueRow = typeof techniques.$inferInsert;
