import type { ClaimCategory, Freshness } from './schema';

/**
 * Freshness thresholds in months, by claim category.
 *
 * These are FIRST HYPOTHESES, deliberately conservative. They are guesses about
 * how fast each kind of fact goes out of date, and the real corpus will correct
 * them. Changing an interval bumps the version, so a stored decision stays
 * interpretable.
 *
 * Deadlines and pricing are absent on purpose: they expire on their own stated
 * date rather than on an interval, and modelling them as "aging" would be wrong.
 * A facility-confirmed feasibility is also absent - it is valid only for the
 * request and period it was given for, never generalised.
 */
export interface FreshnessThresholds {
  /** At or below this age: CURRENT. */
  readonly currentMonths: number;
  /** At or below this age: AGING. Above it: STALE. */
  readonly agingMonths: number;
}

export const FRESHNESS_POLICY_VERSION = 'freshness-v1';

export const freshnessPolicyV1: Partial<Record<ClaimCategory, FreshnessThresholds>> = {
  FACILITY_IDENTITY: { currentMonths: 24, agingMonths: 48 },
  OFFERING_EXISTENCE: { currentMonths: 12, agingMonths: 24 },
  CATALOGUE_COMPLETENESS: { currentMonths: 12, agingMonths: 18 },
  SAMPLE_HANDLING: { currentMonths: 12, agingMonths: 24 },
  ACCESS_POLICY: { currentMonths: 6, agingMonths: 12 },
};

export type FreshnessPolicy = Partial<Record<ClaimCategory, FreshnessThresholds>>;

/** Whole months elapsed, calendar-aware rather than a 30-day approximation. */
export function monthsBetween(from: Date, to: Date): number {
  let months = (to.getUTCFullYear() - from.getUTCFullYear()) * 12;
  months += to.getUTCMonth() - from.getUTCMonth();

  // Not a full month yet if the day-of-month has not been reached.
  if (to.getUTCDate() < from.getUTCDate()) {
    months -= 1;
  }
  return months;
}

/**
 * Classify how current an observation is.
 *
 * Two fail-safe paths, both returning AGE_UNKNOWN:
 *
 *   1. No observation date. An unknown age is not a young age.
 *   2. No policy entry for the category. Adding a new claim type must not
 *      silently inherit some other category's interval - the absence of a
 *      decision is not a decision. Because AGE_UNKNOWN is never usable, a
 *      forgotten policy entry costs a lost exclusion, never a wrong one.
 *
 * A future date (clock skew, a typo in curated data) is treated as CURRENT
 * rather than throwing: the resolver's job is to report, not to reject input,
 * and `data:validate` is where malformed dates belong.
 */
export function classifyFreshness(
  observedAt: Date | null,
  now: Date,
  category: ClaimCategory,
  policy: FreshnessPolicy = freshnessPolicyV1,
): Freshness {
  if (observedAt === null) {
    return 'AGE_UNKNOWN';
  }

  const thresholds = policy[category];
  if (thresholds === undefined) {
    return 'AGE_UNKNOWN';
  }

  const age = monthsBetween(observedAt, now);

  if (age <= thresholds.currentMonths) {
    return 'CURRENT';
  }
  if (age <= thresholds.agingMonths) {
    return 'AGING';
  }
  return 'STALE';
}

/**
 * Whether evidence at this freshness may support a definite conclusion -
 * including a negative one that excludes a facility.
 *
 * AGING still counts: it is surfaced as "last checked N months ago" rather than
 * discarded. STALE and AGE_UNKNOWN do not, which is what stops an old page from
 * ruling a facility out.
 */
export function isUsable(freshness: Freshness): boolean {
  return freshness === 'CURRENT' || freshness === 'AGING';
}
