import { z } from 'zod';

/**
 * How strongly a SINGLE assertion is backed. This is a property of one
 * observation, not a conclusion about the claim.
 *
 * `CONFLICT` exists because the product specification names it, but a single
 * assertion should not normally carry it: disagreement is what EMERGES when
 * several assertions disagree, and the resolver expresses that as `DISPUTED`.
 * Treat it as a legacy escape hatch, never as a shortcut for stuffing several
 * sources into one row.
 */
export const VerificationLevelSchema = z.enum([
  'FACILITY_CONFIRMED',
  'SOURCE_CONFIRMED',
  'INFERRED',
  'UNKNOWN',
  'CONFLICT',
]);
export type VerificationLevel = z.infer<typeof VerificationLevelSchema>;

/**
 * The resolver's output state. Deliberately a DIFFERENT type from
 * `VerificationLevel`: "how good is this one observation" and "what do we
 * therefore believe" are different questions, and collapsing them is how a
 * disputed claim ends up rendering as a definite answer.
 */
export const ClaimResolutionStateSchema = z.enum(['CONFIRMED', 'INFERRED', 'UNKNOWN', 'DISPUTED']);
export type ClaimResolutionState = z.infer<typeof ClaimResolutionStateSchema>;

export const FreshnessSchema = z.enum([
  /** Recently observed. */
  'CURRENT',
  /** Old enough to mention, still usable. */
  'AGING',
  /** Too old to support a negative conclusion. */
  'STALE',
  /** No observation date, or no freshness policy for this claim category. */
  'AGE_UNKNOWN',
]);
export type Freshness = z.infer<typeof FreshnessSchema>;

/**
 * Claim categories drive freshness, because different facts go stale at wildly
 * different rates: a facility's address outlives an access policy by years.
 *
 * An unlisted category resolves to AGE_UNKNOWN rather than inheriting some other
 * category's interval - see freshness.ts.
 */
export const ClaimCategorySchema = z.enum([
  'FACILITY_IDENTITY',
  'OFFERING_EXISTENCE',
  'CATALOGUE_COMPLETENESS',
  'SAMPLE_HANDLING',
  'ACCESS_POLICY',
]);
export type ClaimCategory = z.infer<typeof ClaimCategorySchema>;

/**
 * A claim value. Deliberately narrow: scalars and arrays of scalars.
 *
 * Wide enough for every Phase 1 claim (tri-states, sample-form lists,
 * completeness enums) and narrow enough that two values can be compared for
 * equality deterministically - which the resolver depends on when deciding
 * whether two sources actually disagree.
 */
export const ClaimValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
  z.array(z.union([z.string(), z.number(), z.boolean()])),
]);
export type ClaimValue = z.infer<typeof ClaimValueSchema>;

export const EvidenceAssertionSchema = z.object({
  id: z.string().min(1),
  /** e.g. AIR_SENSITIVE_TRANSFER. Identifies WHAT is claimed. */
  claimKey: z.string().min(1),
  /** Drives the freshness policy. Identifies HOW FAST this kind of fact rots. */
  claimCategory: ClaimCategorySchema,
  assertedValue: ClaimValueSchema,

  sourceUrl: z.string().nullable(),
  /** Identifies which VERSION of the source was read. A change triggers review. */
  contentHash: z.string().nullable(),

  verificationLevel: VerificationLevelSchema,
  /** Required when FACILITY_CONFIRMED: how and by whom. Enforced by the resolver. */
  verificationMethod: z.string().nullable(),

  /** When the claim was observed. Null means the age is unknown, not zero. */
  observedAt: z.date().nullable(),

  /** Non-null means superseded: retained for audit, excluded from resolution. */
  supersededById: z.string().nullable(),
});
export type EvidenceAssertion = z.infer<typeof EvidenceAssertionSchema>;

/** Why an assertion did or did not contribute. Makes the resolution auditable. */
export const AssertionRoleSchema = z.enum([
  'SUPPORTS',
  'CONTRADICTS',
  'SUPERSEDED',
  'NOT_USABLE',
  'NO_INFORMATION',
]);
export type AssertionRole = z.infer<typeof AssertionRoleSchema>;

export const EvidenceRefSchema = z.object({
  assertionId: z.string().min(1),
  role: AssertionRoleSchema,
  verificationLevel: VerificationLevelSchema,
  freshness: FreshnessSchema,
});
export type EvidenceRef = z.infer<typeof EvidenceRefSchema>;

export const ResolvedClaimSchema = z.object({
  claimKey: z.string().min(1),
  claimCategory: ClaimCategorySchema,

  /** Null whenever resolutionState is UNKNOWN or DISPUTED - we hold no value. */
  value: ClaimValueSchema.nullable(),
  resolutionState: ClaimResolutionStateSchema,

  /** Highest authority tier backing `value`. Null when nothing backs a value. */
  strongestLevel: VerificationLevelSchema.nullable(),

  /**
   * The MOST RECENT observation AGREEING with `value` - not the timestamp of the
   * strongest one. Authority and freshness are separate axes: a 2022 page
   * re-confirmed in 2026 is current, while a lone 2022 page is not.
   */
  effectiveObservedAt: z.date().nullable(),
  effectiveFreshness: FreshnessSchema,

  /** Every assertion considered, agreeing or not, with the reason why. */
  evidenceRefs: z.array(EvidenceRefSchema),

  resolvedAt: z.date(),
  /** Stamped so a stored decision stays interpretable after the rules change. */
  rulesVersion: z.string().min(1),
  freshnessPolicyVersion: z.string().min(1),
});
export type ResolvedClaim = z.infer<typeof ResolvedClaimSchema>;
