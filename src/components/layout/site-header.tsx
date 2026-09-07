import Link from 'next/link';

import { APP_NAME, APP_PRODUCT, CURRENT_PHASE } from '@/lib/app-meta';

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-surface/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-baseline gap-2 text-ink no-underline">
          <span className="text-base font-semibold tracking-tight">{APP_NAME}</span>
          <span className="hidden text-xs text-ink-subtle sm:inline">{APP_PRODUCT}</span>
        </Link>
        <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-ink-muted">
          Phase {CURRENT_PHASE} · foundation
        </span>
      </div>
    </header>
  );
}
