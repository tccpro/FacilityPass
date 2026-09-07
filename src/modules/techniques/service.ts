// Orchestration. Accepts and returns plain data, imports no web framework, and
// touches no database directly - so a future public API or agent-facing tool
// interface can call this unchanged.

import { findAllTechniques } from './repository';
import { TechniqueListSchema, type Technique } from './schema';

export async function listTechniques(): Promise<Technique[]> {
  const rows = await findAllTechniques();

  // Validate the outbound boundary, not only the inbound one. If a column is
  // added, renamed or nulled and the DTO is not updated, this fails loudly here
  // rather than shipping a silently wrong shape to a client.
  return TechniqueListSchema.parse(
    rows.map((row) => ({
      slug: row.slug,
      name: row.name,
      category: row.category,
      description: row.description,
    })),
  );
}
