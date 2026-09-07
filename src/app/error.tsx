'use client';

// The `error` prop is required by Next's generated route types even though it is
// deliberately never rendered: a user-facing error explains what happened and
// what to do, and never leaks a stack trace or a database message. The server
// log keeps the context; the page does not.
export default function AppError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-ink">Something went wrong</h1>
      <p className="max-w-xl leading-relaxed text-ink-muted">
        FacilityPass could not complete that request. The details have been recorded on the server.
        Try again - if it keeps happening, the problem is on our side, not yours.
      </p>
      <button
        type="button"
        onClick={reset}
        className="w-fit rounded-panel border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink"
      >
        Try again
      </button>
    </div>
  );
}
