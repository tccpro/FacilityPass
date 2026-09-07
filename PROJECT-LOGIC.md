# FacilityPass - Unified Project Logic

**Status:** Canonical project logic for the current rebuild  
**Audience:** Founder / Core Systems Lead, Product & Frontend Lead, AI coding agents  
**Purpose:** Replace backend-oriented project guidance with one product, business, engineering, AI, and delivery logic  
**Version date:** 2026-09-05

---

## 0. How to use this file

This file defines the logic that every other FacilityPass guideline must follow.

It answers five questions before implementation begins:

1. What product are we building?
2. What is the first publishable shape?
3. Who owns which decisions?
4. How is one milestone split into parallel engineering segments and promoted through Git?
5. Where does deterministic software end and model assistance begin?

If an older document conflicts with this file, update or archive the older document rather than silently following both.

The desired documentation hierarchy is:

```text
PROJECT-LOGIC.md
        |
        +--> PLATFORM-ARCHITECTURE.md
        +--> product / frontend rules
        +--> backend / domain rules
        +--> database / evidence rules
        +--> AI integration rules
        +--> Git / testing / staging rules
        +--> milestone briefs
        +--> AI coder task packets
```

This file is not a replacement for detailed coding manuals. It is the source from which those manuals derive their direction.

---

# 1. Product identity

FacilityPass is a **Research Capability Access Platform**.

Its central problem is broader than equipment search:

> Given an R&D objective, identify the capability gap, determine what capability is actually required, discover credible ways to obtain it, and help the organization move toward a qualified engagement.

The permanent product flow is:

```text
Research Objective
        |
        v
Capability Gap
        |
        v
Capability Requirements
        |
        v
Capability Discovery
        |
        v
Provider / Offering
        |
        v
Access Strategy
        |
        v
Qualified Request
        |
        v
Provider Response
        |
        v
Engagement
        |
        v
Outcome
```

Possible access strategies may include:

```text
OUTSOURCE
ACCESS
SHARE
COLLABORATE
TRAIN
TRANSFER
BUILD
LEASE
ACQUIRE / BUY
```

A facility is one possible provider context. It is not the root abstraction of the company.

**Capability is more fundamental than Facility, Instrument, Provider, Supplier, or
Transaction.** Old thinking was `Facility → Instrument → Search`. Current thinking:

```text
Scientific / business objective
→ Capability need
→ Requirements
→ Capability / strategy options
→ Evidence
→ Independent evaluations
→ Decision
→ Qualified action / execution
→ Outcome
→ Learning / re-evaluation
```

A provider may expose capabilities through:

- equipment or instrument access;
- managed laboratory services;
- sample preparation;
- specialist analysis;
- expert consultation;
- training;
- collaborative research;
- technology access or transfer.

---

# 2. First publication shape

The first release is **not** defined as a complete SaaS suite, an operating system, an enterprise dedicated deployment, or a generic AI assistant.

The first public form is:

> **FacilityPass Platform - Controlled Web Beta**

The first beta should prove one complete user story:

```text
I have a scientific / R&D need
        |
        v
I can discover a relevant capability
        |
        v
I can understand who provides it
        |
        v
I can see evidence and uncertainty
        |
        v
I can understand the access path
        |
        v
I can take an actionable next step
```

For the first beta, the important proof is:

```text
real supply
+
credible evidence
+
useful discovery
+
actionable access
```

Future commercial forms may include:

```text
FacilityPass Network
FacilityPass Teams
FacilityPass Institution
FacilityPass Dedicated
Partner / public API
MCP / agent interfaces
```

They are configurations or delivery forms of the same platform core. They must not create duplicated business logic.

---

# 3. One product, one monorepo, separated authority

FacilityPass is one product and one repository.

Do not split it into independent frontend and backend projects simply because ownership differs.

The intended shape is:

```text
                         FACILITYPASS
                              |
       +----------------------+----------------------+
       |                      |                      |
  Product Experience      Core Platform        Operations
       |                      |                      |
 frontend / UX          domain / data / AI       review / audit
       |                      |                      |
       +----------------------+----------------------+
                              |
                        shared contracts
```

Responsibility separation is achieved through:

- packages;
- modules;
- contracts;
- code ownership;
- branch segments;
- reviews;
- decision authority.

It is not achieved by creating separate products.

---

# 4. Leadership and responsibility

## 4.1 Founder / Business & Core Systems Lead

Primary ownership:

### Company and business

- company vision;
- business model;
- target markets;
- commercial strategy;
- provider and customer relationships;
- pricing direction;
- budget and investment decisions;
- final roadmap priority.

### Core engineering

- system architecture;
- domain/application architecture;
- backend services;
- API/server boundaries;
- PostgreSQL and Drizzle;
- migrations;
- evidence and provenance architecture;
- scientific/data integrity rules;
- AI architecture;
- model-provider integrations;
- infrastructure and security boundaries;
- backend/integration testing.

Final authority inside this domain includes:

```text
domain correctness
database integrity
scientific/evidence semantics
AI authority boundaries
security architecture
backend architecture
data architecture
```

## 4.2 Product & Frontend Lead

Primary ownership:

### Product

- user journeys;
- product flows;
- information architecture;
- screen hierarchy;
- interaction models;
- wireframes and prototypes;
- usability;
- product presentation of uncertainty and evidence.

### Frontend engineering

- `apps/web` frontend structure;
- frontend architecture;
- component architecture;
- design system;
- `packages/ui`;
- responsive behavior;
- accessibility;
- frontend performance;
- frontend testing;
- visual and interaction consistency.

This is an ownership role, not a ticket-taking frontend role.

Within the product/frontend domain, this lead may challenge or block an implementation that produces:

- broken primary UX;
- inaccessible interaction;
- misleading evidence presentation;
- poor responsive behavior;
- duplicated or inconsistent design patterns;
- a frontend architecture that is difficult to maintain.

## 4.3 Shared authority

The following are joint decisions:

```text
packages/contracts
major user workflows
frontend-visible domain semantics
public API / DTO behavior
cross-stack error semantics
phase acceptance
release readiness
major cross-boundary architecture changes
```

Neither lead silently changes a shared contract.

## 4.4 Future role expansion

After the first production beta, the Product & Frontend Lead may expand toward **Platform Lead** if both people agree and the actual working relationship supports it.

That expansion may include:

- day-to-day milestone coordination;
- cross-stack dependency management;
- release readiness;
- platform consistency;
- future contributor coordination.

This does not automatically transfer Founder/company authority or core data/AI/security ownership.

Legal title, equity, compensation, time commitment, code ownership, and company ownership are separate matters and must be explicitly agreed rather than inferred from an engineering title.

---

# 5. Decision boundary

Use this matrix when disagreement appears.

| Decision                            | Primary authority       | Required consultation                            |
| ----------------------------------- | ----------------------- | ------------------------------------------------ |
| Product flow / UX                   | Product & Frontend Lead | Core Lead when contracts/domain are affected     |
| Frontend architecture               | Product & Frontend Lead | Core Lead for shared/platform boundaries         |
| Backend/domain architecture         | Core Lead               | Product Lead for user-facing consequences        |
| Database/evidence semantics         | Core Lead               | Product Lead for presentation implications       |
| AI architecture and authority       | Core Lead               | Product Lead for user-facing AI behavior         |
| Shared contracts                    | Joint                   | Both approve                                     |
| Phase acceptance                    | Joint                   | Both approve                                     |
| Company strategy / market / pricing | Founder                 | Product Lead consulted where product is affected |
| Security/data-integrity stop-ship   | Core Lead               | Immediate joint review                           |
| UX/accessibility stop-ship          | Product Lead            | Immediate joint review                           |

Do not resolve ownership disputes by who writes code first.

---

# 6. Software architecture

FacilityPass begins as a modular monolith.

Normal dependency direction:

```text
UI / Client
    |
    v
Web Adapter / API / Server Action
    |
    v
Application Use Case
    |
    v
Domain Rules
    |
    v
Ports
    |
    v
Infrastructure Adapters
    |
    +--> PostgreSQL
    +--> AI providers
    +--> external services
```

Business rules point inward. Infrastructure depends on ports defined by the application/core.

Recommended repository shape:

```text
apps/
  web/
  # admin/ only when an internal UI is genuinely required

packages/
  domain/
  application/
  contracts/
  db/
  ai/
  ui/
  config/
  # integrations/ only when a real integration exists
  # observability/ only when shared observability code exists

data/
  demo/
  curated/
  evaluation/

e2e/
scripts/
docs/
.github/
```

Do not create empty packages merely to make the repository look sophisticated.

---

# 7. Contract-first parallel development

The contract is the handshake between the two engineering domains.

For a milestone such as Capability Discovery, define first:

```text
CapabilitySearchRequest
CapabilitySearchResult
CapabilitySummary
EvidenceSummary
public errors
pagination
URL/query behavior
UNKNOWN / CONFLICT semantics
```

Then parallel work is possible:

```text
                  SHARED CONTRACT
                  /             \
                 /               \
        Product / Frontend     Core / Backend
                |                   |
        fixtures + UX          use case + data
                |                   |
                 \                 /
                  \               /
                   PHASE INTEGRATION
```

Frontend may develop against schema-valid fixtures while backend/data implements the real use case.

Fixtures must represent the actual contract, including difficult states. They must not invent behavior that the backend will never support.

---

# 8. Git architecture: work -> segment -> phase -> test -> staging -> main

The project uses six stability levels.

```text
work/<developer>/<task>
          |
          v
segment/<milestone>/<responsibility>
          |
          v
phase/<milestone>
          |
          v
test/<milestone>
          |
          v
staging
          |
          v
main
```

These branches are not bureaucracy. Each represents a different state of confidence.

## 8.1 `work/*`

Purpose: individual implementation.

Examples:

```text
work/core/m03-search-repository
work/core/m03-search-use-case
work/product/m03-search-page
work/product/m03-capability-card
```

Rules:

- one coherent task;
- normally one owner;
- short lived;
- merge into the relevant segment;
- never merge directly to `staging` or `main`;
- delete after integration.

## 8.2 `segment/*`

Purpose: one responsibility boundary inside one milestone.

Example:

```text
phase/m03-capability-discovery

segment/m03/contracts
segment/m03/search-backend
segment/m03/search-data
segment/m03/discovery-frontend
```

A segment is based on responsibility, not automatically on every technology.

Do not create an AI segment when the milestone does not require AI.

Segment owner responsibilities:

- internal architecture;
- task decomposition;
- segment tests;
- review of work branches;
- readiness for phase integration.

## 8.3 `phase/*`

Purpose: integrate all segments into one usable milestone.

The phase branch answers:

> Does the complete product capability work end to end?

Integration bugs and contract mismatches are fixed here through dedicated fix branches or coordinated work branches.

Do not perform unrelated feature work directly on the phase branch.

## 8.4 `test/*`

Purpose: code-freeze candidate and formal QA.

Allowed:

```text
bug fixes
accessibility corrections
integration corrections
release blockers
test corrections that preserve invariants
```

Not allowed:

```text
new features
new architecture
new speculative packages
scope expansion
```

A failed test produces a targeted `fix/<milestone>/<issue>` branch into `test/*`.

## 8.5 `staging`

Purpose: production-like release candidate.

Staging validates:

- deployment;
- migrations;
- environment configuration;
- realistic data;
- model routing when applicable;
- external integrations;
- end-to-end workflows;
- product/business acceptance.

Staging uses its own database, secrets, and environment.

## 8.6 `main`

Purpose: accepted production state.

Only staging-approved releases reach `main`.

No ordinary feature development occurs directly on `main`.

## 8.7 Additional branch types

```text
fix/<milestone>/<issue>          targeted QA/integration correction
hotfix/<issue>                   urgent production correction from main
experiment/<milestone>/<idea>    isolated technical/product experiment
```

An experiment never becomes production merely because it works. It must be converted into an approved segment/task with acceptance criteria.

---

# 9. Milestone and segment rule

A milestone is a **product outcome**, not a backend phase or frontend phase.

Bad:

```text
Backend Phase 1
Frontend Phase 1
AI Phase 1
```

Good:

```text
M03 - Capability Discovery
```

Inside a milestone, create only required technical segments.

Example:

```text
M03 - Capability Discovery

contracts
search backend
search data
frontend discovery
```

The milestone is done only when the full user capability works.

---

# 10. Project development order and stage plan - MANDATORY

The old workflow error to avoid: beginning with backend implementation, database
schema, or frontend screens before product definition.

Use this order:

```text
Business mechanism
        ↓
Product workflow
        ↓
Product design
        ↓
Domain model
        ↓
Shared contracts
        ↓
Technical architecture
        ↓
Frontend + backend parallel implementation
        ↓
Integration
        ↓
Real validation
```

For each product surface, reason from: User → Goal → Problem → Action → Information
needed → Decision → Outcome. Do NOT design screens from database tables, database
tables from speculative future features, or AI agents before the product operation
requiring them exists.

The project-stage vocabulary is **STAGE 0–8**; each stage defines separate BUSINESS,
PRODUCT, TECHNICAL, and AI goals plus exit criteria. The authoritative stage plan,
current stage status, and the first-platform design surfaces live in
`docs/global/stages.md`. Open product/business decisions live in
`docs/global/OPEN-DECISIONS.md` and must not be resolved silently in code.

## Former M0–M8 milestones (superseded)

The former M0–M8 milestone details are superseded by the STAGE 0–8 plan in
`docs/global/stages.md` (mapping table included there). Historical copy:
`docs/founder/archive/2026-milestones-v3.md`.

# 11. Platform database logic

The database represents the platform, not website pages.

Core logical domains:

```text
SUPPLY
Provider
  |
Offering -------- Capability
  |
AccessPath

EVIDENCE
EvidenceSource
  |
EvidenceAssertion
  |
ResolvedClaim / derived projection

DEMAND
ResearchIntent
  |
RequirementSet
  |
Requirement

DECISION
Requirement + Offering/Capability
  |
Evaluation / Match / Access Assessment

ENGAGEMENT
QualifiedRequest
  |
ProviderResponse
  |
Engagement
  |
Outcome

AI OPERATIONS
AIRun
AICandidateOutput
PromptVersion / config metadata
AIEvaluation
```

Do not create all tables on day one.

Introduce them when the milestone needs them.

Externally visible scientific claims must remain traceable to evidence.

Missing information must remain `UNKNOWN`; it must not silently become false.

---

# 12. AI architecture

FacilityPass depends on **AI capabilities**, not on one model vendor.

```text
Application Use Case
        |
        v
AI Capability Port
        |
        v
Model Gateway / Router
     /       |        \
    v        v         v
 OpenAI   Anthropic   Google
```

The application asks for operations such as:

```text
extractResearchIntent()
extractEvidenceCandidates()
normalizeTerminology()
draftQualifiedRequest()
```

It should not spread calls such as `callGPT()` or `callClaude()` through domain/application code.

Provider SDKs remain behind `packages/ai` adapters.

---

# 13. Engineering vs model authority

LLMs may:

```text
interpret language
extract candidate data
classify ambiguous text
normalize terminology
summarize evidence
draft communication
suggest possibilities
```

Deterministic engineering owns:

```text
authoritative database state
authorization
security
workflow state transitions
scientific verification
evidence state
hard requirement evaluation
commercial status
financial calculations
permissions
```

Mandatory truth-sensitive pipeline:

```text
Unstructured Source / User Input
          |
          v
         LLM
          |
          v
Structured Candidate
          |
          v
Schema Validation
          |
          v
Deterministic / Evidence Validation
          |
          v
Human / Authority Review when required
          |
          v
Authoritative Product State
```

A polished model response is never sufficient evidence by itself.

## AI state separation - mandatory

Keep separate:

```text
Conversation State
Agent Working State
User / Organization Memory
Canonical Domain / Evidence State
```

```text
AI MEMORY != SCIENTIFIC TRUTH
AgentRun   = what AI did
Evidence   = what a source supports
Canonical State = what FacilityPass accepts
```

An AI conclusion is not itself evidence.

Model routing is evaluation-driven, not brand-driven. Routing classes:

```text
NO AI        SQL, filters, calculations, permissions, deterministic constraints
ECONOMY      intent classification, simple normalization, summaries
BALANCED     requirement extraction, evidence extraction, normal interpretation
FRONTIER     rare complex ambiguity, conflicting-evidence assistance, complex planning
SPECIALIZED  speech, multimodal, long-context, task-specific models
```

Keep a degraded mode where search and deterministic operations continue if AI
providers fail. Operation-level evaluation (schema validity, extraction accuracy,
unsupported-claim rate, abstention quality, correction rate, latency, cost,
fallback behavior) is a first-class engineering concern. Detail:
`docs/founder/ai-integration.md`.

---

# 14. AI learning strategy

Do not equate "learning" with "train our own model."

FacilityPass should mature through this ladder:

```text
L0  telemetry
    |
L1  human corrections + accepted outcomes
    |
L2  evaluation corpus and metrics
    |
L3  prompt / schema / retrieval / routing improvement
    |
L4  supervised or preference tuning if justified
    |
L5  reinforcement fine-tuning only with a reliable reward signal
```

Before tuning, preserve:

```text
source/input
model candidate
human decision
human correction
accepted result
downstream outcome
```

This dataset is strategically more durable than one provider or model version.

Fine-tuning is optional and provider/model support changes over time. Never make the core product depend on the availability of one tuning method.

---

# 15. Supporting infrastructure rule

Start managed and simple:

```text
Browser
  |
Next.js / managed application runtime
  |
Application / Domain
  |
Managed PostgreSQL
```

Add supporting systems only when a measured requirement appears.

Potential future support:

```text
Object storage      -> source documents / large files
Worker / queue      -> long-running extraction / ingestion / batches
Search extension    -> only when Postgres search is insufficient
Observability       -> technical, product, AI telemetry
Admin application   -> when recurring internal review needs a UI
Authentication      -> when real identity/organization workflows require it
Audit subsystem     -> sensitive/authoritative mutations
```

Do not begin with Kubernetes, microservices, dedicated search clusters, or self-hosted foundation models without a proven need.

---

# 16. Testing and release semantics

Before `phase -> test`:

- required segments merged;
- contract compatibility verified;
- unit/integration tests pass;
- primary vertical path works.

During `test/*`:

- feature freeze;
- full QA;
- accessibility/responsive states;
- migrations;
- E2E;
- UNKNOWN/CONFLICT/error cases.

Before `test -> staging`:

- no known release blocker;
- release notes / migration notes prepared;
- staging dataset/config ready.

Before `staging -> main`:

### Technical gate

- deployment succeeds;
- migration rehearsal succeeds;
- smoke/E2E succeeds;
- security/data integrity reviewed;
- AI failure/fallback behavior verified where applicable.

### Product gate

- primary workflow understandable;
- loading/empty/error/unknown/conflict states reviewed;
- accessibility/responsive acceptance complete.

### Business gate

Answer:

```text
What hypothesis are we releasing?
Who will test/use it?
What behavior do we expect?
What will we measure?
What decision will the result allow us to make?
```

---

# 17. Existing-code restart rule

The rebuild is an architecture restart, not a blind rewrite.

Classify existing code:

```text
KEEP     correct and already fits the new architecture
PORT     valuable logic in the wrong layer/location
REWRITE  useful behavior built on the wrong abstraction
DELETE   obsolete, duplicate, unsafe, or tied to retired assumptions
```

Do not rewrite tested code merely for visual consistency.

Do not preserve old code merely because it exists.

---

# 18. Business evidence rule

Technical completion does not prove business value.

Use separate support labels for business claims:

```text
FACT
SOURCE_BACKED
CUSTOMER_VALIDATED
PROVIDER_CONFIRMED
PARTNER_CONFIRMED
ASSUMPTION
HYPOTHESIS
SCENARIO
DECISION
OPEN_QUESTION
```

Permanent distinctions:

```text
conversation != partnership
interest != committed pilot
provider listing != provider participation
estimate != negotiated price
potential revenue != forecast
signed contract != successful outcome
scientific feasibility != commercial availability
provider response != successful engagement
```

Important project decisions are tracked as:

```text
LOCKED
OPEN
DEFERRED
EXPERIMENTAL
SUPERSEDED
```

The authoritative open-decisions register is `docs/global/OPEN-DECISIONS.md`.

Strong business evidence generally progresses from:

```text
actual paid engagement
    |
committed pilot / signed agreement
    |
real provider/customer workflow
    |
explicit willingness to participate
    |
observed user behavior
    |
structured interview evidence
    |
market research
    |
internal assumption
```

Do not call an assumption "market demand" or a conversation "partnership."

---

# 19. Extensibility and budget rule

FacilityPass may expand across:

```text
users       individual -> teams -> organizations
supply      facilities -> providers -> experts -> services
science     initial domains -> additional disciplines
geography   initial region -> national -> international
delivery    web -> API -> integrations -> dedicated deployments
```

Architecture expansion follows measured triggers.

Examples:

```text
worker       -> synchronous jobs are timing out / unreliable
cache        -> repeated expensive reads are measured
vector search-> semantic retrieval demonstrably beats text/structured search
microservice -> independent scaling/deployment/runtime boundary is proven
fine-tuning  -> stable task + reviewed data + evaluation + ROI
```

Budget follows proof:

```text
hypothesis
  |
small expenditure
  |
evidence
  |
larger commitment
```

Never build expensive infrastructure first and search for demand later.

---

# 20. AI coder behavior

Every AI coding agent must:

1. read this file first;
2. identify the milestone and segment;
3. identify its allowed touch set;
4. inspect the existing implementation before creating code;
5. preserve ownership and package boundaries;
6. never guess product/scientific/commercial decisions;
7. implement the smallest complete vertical slice required;
8. add/update tests;
9. report actual commands run;
10. never commit/push/merge/rebase/tag/release unless explicitly instructed by a human.

The agent must not create a new segment, package, provider, table, or architecture layer merely because it may be useful in the future.

---

# 21. Permanent project rule

The desired operating loop is:

```text
BUSINESS PROBLEM
      |
      v
PRODUCT HYPOTHESIS
      |
      v
SHARED CONTRACT
      |
      v
SEGMENTS
(product / frontend / core / data / AI only when required)
      |
      v
PHASE INTEGRATION
      |
      v
TEST FREEZE
      |
      v
STAGING
      |
      v
REAL USER / PROVIDER VALIDATION
      |
      v
BUSINESS + PRODUCT + TECHNICAL LEARNING
      |
      v
NEXT DECISION
```

FacilityPass is not:

```text
his frontend project + my backend project
```

It is:

> **Separate ownership, shared contracts, one platform, one release path, and one business-learning loop.**

---

# 22. Supplier / option neutrality

Neutrality is a core product rule. FacilityPass must not choose a supplier, lender,
vendor, or partner first and then manufacture reasoning to justify that choice.

For external-supply cases the conceptual logic is:

```text
Customer requirement
→ Candidate option universe
→ Hard eligibility
→ Scientific compatibility
→ Evidence quality
→ Availability / access conditions
→ Economic / operational / strategic factors
→ Customer preferences
→ Explainable alternatives
```

For broader strategy cases, compare plausible strategy families before deciding that
supplier search is even the correct next step.

Commercial relationships must never silently improve scientific compatibility,
evidence strength, eligibility, or verification state. Sponsored or
referral-supported options must remain distinguishable from evidence-based organic
recommendations.

---

# 23. Outcome semantics

The system must distinguish:

```text
feasibility != response != engagement != execution != outcome != business value
```

```text
VERIFIED_FEASIBLE
!= provider accepted
!= contract signed
!= work completed
!= scientific success
!= business success
```

`VERIFIED_FEASIBLE` belongs to scientific/feasibility truth only — it is produced by
provider/expert confirmation, never by a matching algorithm, and it does not mean
available, affordable, eligible, qualified, contracted, paid, successful, or
strategically optimal. Outcome history feeds product learning.

---

# 24. Anti-goals

FacilityPass must not be reduced to:

```text
equipment directory
facility directory
search engine
generic chatbot
scientific marketplace clone
procurement clone
booking clone
AI agent demo
single-institution portal
equipment ecommerce store
generic startup consultant
generic ERP / lab-management suite
```

It may include functionality that overlaps some of these categories, but its
strategic center remains:

```text
capability intelligence + evidence + decision + orchestration + outcome learning
```

---

# 25. Change control for guidelines

Major changes must not silently enter the project through a coding task. When
proposing a major change, record:

```text
Current rule
Evidence / problem
Proposed change
Why it is better
What it affects
What remains unchanged
Requested status: LOCKED / OPEN / DEFERRED / EXPERIMENTAL / SUPERSEDED
```

Reference material may influence a decision; it does not become project authority by
existing. Prefer a small number of clear authoritative files over many overlapping
rule documents; a specialized guideline references the canonical principle instead
of copying it.
