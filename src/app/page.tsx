const STEPS = [
  {
    n: '1',
    title: 'Describe your measurement',
    body: 'Technique, sample form, handling constraints, and whether you are an academic or commercial user. Nothing proprietary.',
  },
  {
    n: '2',
    title: 'Compare evidence-backed matches',
    body: 'Every capability claim carries its source, when it was observed, and how strongly it is verified.',
  },
  {
    n: '3',
    title: 'Ask the facility to verify feasibility',
    body: 'Send a facility scientist a secure link. Their answer - not our algorithm - is what marks a request verified.',
  },
] as const;

// Four states, not three. INFERRED must never render as confirmed, so it gets
// its own glyph and treatment rather than being folded into either neighbour.
const EVIDENCE_LEGEND = [
  {
    glyph: '✓',
    label: 'Confirmed',
    body: 'A source or the facility itself supports this claim.',
    className: 'text-confirmed border-confirmed-line bg-confirmed-surface',
  },
  {
    glyph: '~',
    label: 'Inferred',
    body: 'A reasonable reading of the evidence, not something a source states outright.',
    className: 'text-inferred border-inferred-line bg-inferred-surface',
  },
  {
    glyph: '?',
    label: 'Unknown',
    body: 'We found no reliable information. We will say so rather than guess.',
    className: 'text-unknown border-unknown-line bg-unknown-surface',
  },
  {
    glyph: '✕',
    label: 'Conflict',
    body: 'Reliable sources disagree, so we do not know which one is current.',
    className: 'text-conflict border-conflict-line bg-conflict-surface',
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section>
        <h1 className="text-display font-semibold text-balance text-ink">
          Know where your experiment can actually happen.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">
          Find research facilities that match your measurement requirements and verify technical
          feasibility before you commit time or resources.
        </p>

        <div className="mt-10">
          {/*
            aria-disabled, not disabled: `disabled` removes the control from the
            tab order, so a screen-reader user would never reach the explanation
            of why it is unavailable. Nor is this a placeholder /search route -
            that would invite the next slice to fill it before a matcher exists.
          */}
          <button
            type="button"
            aria-disabled="true"
            aria-describedby="search-availability"
            className="cursor-not-allowed rounded-panel border border-line-strong bg-surface-muted px-6 py-3 text-base font-medium text-ink-subtle"
          >
            Find a facility
          </button>

          <p
            id="search-availability"
            className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted"
          >
            <span className="font-medium text-ink">Not open yet.</span> Facility search opens once
            the first curated facility records are published. FacilityPass will not return matches
            before there is evidence behind them.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-it-works">
        <h2 id="how-it-works" className="text-xl font-semibold text-ink">
          How FacilityPass works
        </h2>
        <ol className="mt-6 flex flex-col gap-5">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line font-mono text-sm text-ink-muted"
              >
                {step.n}
              </span>
              <div>
                <h3 className="font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="evidence-vocabulary">
        <h2 id="evidence-vocabulary" className="text-xl font-semibold text-ink">
          How we label what we know
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
          FacilityPass separates what published capabilities suggest from what a facility has
          confirmed. Every capability claim carries one of four labels, shown as a symbol and a word
          - never as colour alone.
        </p>

        <dl className="mt-6 flex flex-col gap-3">
          {EVIDENCE_LEGEND.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <dt
                className={`inline-flex w-32 shrink-0 items-center gap-2 rounded-panel border px-2.5 py-1 text-sm font-medium ${item.className}`}
              >
                <span aria-hidden="true" className="font-mono">
                  {item.glyph}
                </span>
                {item.label}
              </dt>
              <dd className="pt-1 text-sm leading-relaxed text-ink-muted">{item.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="verified-feasibility"
        className="rounded-panel border border-line bg-surface p-6"
      >
        <h2 id="verified-feasibility" className="text-lg font-semibold text-ink">
          Likely compatible is not the same as verified feasible
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          A match means published capabilities appear compatible with your requirements. Verified
          feasibility means a facility representative reviewed your requirements and answered.
          FacilityPass never presents the first as the second.
        </p>
      </section>
    </div>
  );
}
