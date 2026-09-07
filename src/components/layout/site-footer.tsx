import { APP_PHILOSOPHY } from '@/lib/app-meta';

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <p className="text-sm text-ink-muted">{APP_PHILOSOPHY}</p>
        <p className="mt-2 text-xs text-ink-subtle">
          FacilityPass does not certify that an experiment will scientifically succeed.
        </p>
      </div>
    </footer>
  );
}
