import { z } from 'zod';

/**
 * Public DTO for a technique.
 *
 * Note what is absent: the internal `id`. Identifiers that leave the server are
 * `slug` (techniques) or `publicId` (facilities, offerings, passports) - never a
 * database primary key.
 */
export const TechniqueSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().nullable(),
});
export type Technique = z.infer<typeof TechniqueSchema>;

export const TechniqueListSchema = z.array(TechniqueSchema);
