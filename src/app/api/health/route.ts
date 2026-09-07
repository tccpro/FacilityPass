import { HealthReportSchema } from '@/modules/health/schema';
import { checkHealth } from '@/modules/health/service';
import { isDatabaseConfigured } from '@/server/db';
import { serverEnv } from '@/server/env';

/**
 * Declared explicitly so this endpoint can never be captured into a build
 * artifact, and so the intent survives a framework default change. If it ever
 * appears as static in the build route table, something reached environment or
 * database code at build time - an architecture failure, not a rendering detail.
 */
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * The error envelope every FacilityPass Route Handler will use. Declared inline
 * while there is exactly one handler; it moves to src/lib/api-response.ts when a
 * second one needs it. A stable machine-readable `code`, a human-readable
 * `message` that says what happened and what to do - never a stack trace, never
 * a raw driver error.
 */
function errorResponse(status: number, code: string, message: string): Response {
  return Response.json(
    { error: { code, message } },
    { status, headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function GET(): Promise<Response> {
  let report;

  try {
    const env = serverEnv();

    report = await checkHealth({
      databaseConfigured: isDatabaseConfigured(),
      environment: env.VERCEL_ENV ?? env.NODE_ENV,
      phase: '1',
      checkedAt: new Date(),
    });
  } catch (error) {
    // The server log keeps the context; the response does not.
    console.error('[health] server environment is invalid', error);
    return errorResponse(
      503,
      'ENVIRONMENT_INVALID',
      'The server environment is not valid. See server logs for the offending keys.',
    );
  }

  // Validate the response boundary, not only the request boundary. A handler
  // that validates its input and trusts its own output is half a contract.
  const validated = HealthReportSchema.safeParse(report);
  if (!validated.success) {
    console.error('[health] response failed its own DTO schema', validated.error.issues);
    return errorResponse(
      500,
      'INVALID_RESPONSE',
      'FacilityPass produced an invalid health response. This is a bug and has been logged.',
    );
  }

  return Response.json(validated.data, {
    status: validated.data.status === 'ok' ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  });
}
