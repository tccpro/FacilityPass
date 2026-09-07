# Product vision and scope

**Status:** AUTHORITATIVE for current product direction

## Permanent company direction

FacilityPass is a research-capability access platform. Its purpose is to help R&D organizations obtain scientific capabilities they do not own and to make that process faster, clearer, more reliable, and economically better.

The long-term platform may connect:

```text
Research Intent
  -> Capability Gap
  -> Capability Requirement
  -> Access Strategy
  -> Capability
  -> Provider / Facility / Expert
  -> Qualification / Training
  -> Qualified Request
  -> Engagement
  -> Outcome
```

The platform may eventually support discovery, matching, verification, access strategy, routing, institutional intelligence, and agent/API access. These are directions, not permission to implement everything now.

## First publication shape

The first public form is a **controlled hosted web beta of the FacilityPass platform**
(`PROJECT-LOGIC.md` §2) — not a complete SaaS suite, not a dedicated deployment, not a
generic AI assistant. The beta must prove one complete user story: need → discover a
relevant capability → understand who provides it → see evidence and uncertainty →
understand the access path → take an actionable next step.

## Commercial hypothesis and geography

The currently accepted business hypothesis is that small and mid-sized R&D
organizations need specialized scientific capabilities they do not own. Which supply
geography and scientific domain the first release targets is a **Stage 0
business-gate decision** (`docs/global/stages.md`), recorded as a PDR when made — it
is never hard-coded into architecture, data model, or product copy.

## Access strategies

A provider context may satisfy a capability gap through:

```text
ACCESS        direct use of equipment/facilities
OUTSOURCE     managed laboratory/analysis services
COLLABORATE   joint research work
TRAIN         build the capability through training
TRANSFER      technology/know-how transfer
LEASE         temporary access to instruments
ACQUIRE       acquire the capability or its provider
```

A facility is one possible provider context — it is not the root abstraction of the
company. The architecture must remain capable of representing every strategy above.

An existing capability may later be KEEP / UPGRADE / REPLACE / EXTERNALIZE / SHARE /
RETIRE — capability lifecycle, not V1 features.

## Strategic position

> FacilityPass should become the intelligence, decision, and orchestration layer
> between an organization's scientific objectives and the real-world capabilities
> required to execute them.

FacilityPass improves how an R&D capability is understood, obtained, developed,
operated, changed, and learned from over time. Feature-filtering question:

> Does this feature improve an organization's ability to understand, obtain,
> operate, develop, or change an R&D capability?

## Customer lifecycle the platform must be able to grow toward

The platform must not assume the user is an established R&D company with a known
instrument request:

```text
A. Founder / pre-incorporation startup
   "What capabilities do we actually need, which matter now, and how do we obtain
   them without wasting capital?"
B. Active R&D team
   "We need to accomplish this objective but lack the capability. What should we do?"
C. Experienced researcher / buyer
   "I know the capability. Where can I obtain it under these constraints?"
D. Growing organization
   "We repeatedly outsource this. Should we internalize it?"
E. Mature R&D organization
   "Should we keep, upgrade, replace, externalize, share, or retire this capability?"
```

## Product modes: one core, different depths

Do not design separate backends per customer type. Conceptual modes:

```text
DISCOVER   user knows or semi-knows the capability
SOLVE      user knows the objective, not the capability/path
PLAN       planning an organization, program, or capability portfolio
OPTIMIZE   restructuring an existing capability portfolio
```

One capability-centered domain system supports different depths of workflow and
persistence (Quick Explore → Capability Case → Capability Blueprint →
Institution/Enterprise). Do not create four unrelated products unless real product
evidence requires it.

## First-platform design surfaces (conceptual)

Customer/Founder Home · Research/Capability Intake · Requirement Confirmation ·
Capability Blueprint/Current State · Capability Strategy Options · Candidate
Providers/Partners/Alternatives · Evidence View · Multi-dimensional Comparison ·
Chosen Strategy/Next Action · Qualified Request or Equivalent Action ·
Provider/Partner Response · Case/Engagement/Outcome · Re-evaluation/History.

Not every surface ships in the first release; the purpose is product coherence,
not maximum screen count.

## Relationship to the earlier Scout plan

The previous “FacilityPass Scout / Europe / materials-characterization” plan is retained as useful product-learning history, but it is **not the permanent company definition**.

“Scout” remains a valid capability-discovery mode inside FacilityPass. The architecture must not be constrained to Europe, to one scientific domain, or to equipment-only discovery unless the current product decision explicitly narrows a release for validation.

Any release-specific scientific domain or geographic dataset belongs in `docs/global/CURRENT.md` or an accepted PDR, not in permanent architecture.

## Product boundary

FacilityPass should not become, by default:

- a generic laboratory directory;
- a generic scientific search engine;
- a generic CRO marketplace;
- a booking/billing/payment platform;
- a generic LMS;
- a generic scientific chatbot;
- an AI demonstration product.

Preferred rule:

> **Build differentiated capability intelligence. Integrate commodity operations.**

## Feature validation gate

Before a significant product capability enters implementation, identify:

1. user/customer;
2. problem and last-real-event evidence;
3. current workaround;
4. expected measurable benefit;
5. smallest testable workflow;
6. success/failure metric;
7. scope explicitly deferred.

A feature can be technically correct and still fail the product gate.

## Expansion rule

Do not build the global platform before proving a repeatable local/initial transaction or workflow.

Preferred sequence:

```text
manual service
  -> repeated workflow
  -> structured workflow
  -> productized workflow
  -> automation
  -> scale
```
