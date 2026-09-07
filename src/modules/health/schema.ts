import { z } from 'zod';

/**
 * Configuration and connectivity are two DIFFERENT facts, so they get two
 * different fields. Overloading one word to mean both - "is it set up?" and "does
 * it work?" - is the infrastructure form of the failure this product exists to
 * prevent, and this endpoint is the template every later route will copy.
 */
export const DependencyConnectivitySchema = z.enum([
  /** We have not tried. An absence of evidence, never a soft pass. */
  'NOT_CHECKED',
  /** A query actually succeeded. */
  'REACHABLE',
  /** We tried and it failed. */
  'UNREACHABLE',
]);
export type DependencyConnectivity = z.infer<typeof DependencyConnectivitySchema>;

export const DependencyCheckSchema = z.object({
  /** Whether the dependency is configured. Says nothing about reachability. */
  configured: z.boolean(),
  connectivity: DependencyConnectivitySchema,
  /** Plain-language explanation for operators. Never contains secrets. */
  detail: z.string().min(1),
});
export type DependencyCheck = z.infer<typeof DependencyCheckSchema>;

export const HealthReportSchema = z.object({
  service: z.literal('facilitypass'),
  status: z.enum(['ok', 'degraded']),
  /** A string, not a number: phase labels like "1a" must stay expressible. */
  phase: z.string().min(1),
  environment: z.enum(['development', 'test', 'preview', 'production']),
  checkedAt: z.iso.datetime(),
  checks: z.object({
    database: DependencyCheckSchema,
  }),
});
export type HealthReport = z.infer<typeof HealthReportSchema>;
