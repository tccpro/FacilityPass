export const APP_NAME = 'FacilityPass';
export const APP_PRODUCT = 'FacilityPass Scout';
export const APP_PROMISE = 'Know where your experiment can actually happen.';
export const APP_PHILOSOPHY =
  'FacilityPass recommends candidates. Facility experts confirm feasibility.';

/** Current implementation phase. Update on phase transition. */
export const CURRENT_PHASE = '0';

/**
 * Literal `process.env.NEXT_PUBLIC_*` reference - required for Next's build-time
 * inlining. Do NOT route this through src/server/env.ts: the substitution only
 * happens for the literal expression, and the value would be undefined in the
 * browser.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
