import type { Metadata } from 'next';

import { listTechniques } from '@/modules/techniques/service';

export const metadata: Metadata = {
  title: 'Techniques',
  description:
    'The measurement techniques FacilityPass currently covers. Deliberately small, and nothing claimed beyond it.',
};

/**
 * Dynamic on purpose. A statically prerendered page would make `next build`
 * require a reachable database, coupling every CI run and deployment build to
 * database availability. Rendering per request keeps the build free of secrets
 * and infrastructure - the property Phase 0 established and Phase 1 keeps.
 *
 * ISR is the right answer once this data is stable and traffic justifies it;
 * that is a measurement-driven change, not a default.
 */
export const dynamic = 'force-dynamic';

export default async function TechniquesPage() {
  const techniques = await listTechniques();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight text-ink">Techniques</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-ink-muted">
          The measurement techniques FacilityPass currently covers. This list is deliberately small:
          materials characterization, and nothing claimed beyond it.
        </p>
      </section>

      <section aria-labelledby="technique-list">
        <h2 id="technique-list" className="sr-only">
          Technique list
        </h2>

        {techniques.length === 0 ? (
          // An empty list is a fact about our data, not about the world. Say so
          // rather than rendering a bare page that implies nothing exists.
          <p className="text-sm text-ink-muted">No techniques have been curated yet.</p>
        ) : (
          <ul className="divide-y divide-line rounded-panel border border-line">
            {techniques.map((technique) => (
              <li key={technique.slug} className="flex flex-col gap-1 px-5 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium text-ink">{technique.name}</h3>
                  <span className="shrink-0 font-mono text-xs text-ink-subtle">
                    {technique.category}
                  </span>
                </div>
                {technique.description === null ? (
                  <p className="text-sm text-ink-subtle italic">No description recorded.</p>
                ) : (
                  <p className="text-sm leading-relaxed text-ink-muted">{technique.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-sm text-ink-subtle">
          {techniques.length} {techniques.length === 1 ? 'technique' : 'techniques'} covered.
          Facility records and capability evidence arrive next.
        </p>
      </section>
    </div>
  );
}
