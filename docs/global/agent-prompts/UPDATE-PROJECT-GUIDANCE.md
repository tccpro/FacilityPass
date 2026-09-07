# FacilityPass - AI Coder Repository Update Prompt

Copy the prompt below into the coding agent that will update the existing FacilityPass repository/guidelines.

---

## Prompt

You are updating an existing FacilityPass repository after a project-architecture reset.

This is **not** a request to blindly rewrite the codebase. First inspect the repository, current branches, package configuration, migrations, tests, and all existing project guidance. Preserve useful tested work, but update the project's operating logic so the repository reflects the new full-platform direction rather than the previous backend-first / Scout-shaped direction.

### 1. Mandatory product definition

FacilityPass is a **Research Capability Access Platform**.

Permanent product flow:

```text
Research Objective
        |
Capability Gap
        |
Capability Requirements
        |
Capability Discovery
        |
Provider / Offering
        |
Access Strategy
        |
Qualified Request
        |
Provider Response
        |
Engagement
        |
Outcome
```

A facility is one possible provider context, not the root abstraction.

A capability can include equipment/instrument access, laboratory service, sample preparation, specialist analysis, expertise, training, collaboration, or technology access.

The first publishable form is a **controlled hosted web beta of the FacilityPass platform**, not a complete SaaS suite, not a dedicated OS, and not a generic AI chatbot.

The first beta should demonstrate:

```text
real capability supply
+
credible evidence
+
useful discovery
+
an actionable access next step
```

Do not hard-code a specific customer, geography, launch date, pricing model, compensation arrangement, or commercial commitment unless that information already exists in an approved project decision.

### 2. Responsibility model

There are two primary engineering/product ownership domains.

#### Founder / Business & Core Systems Lead

Primary ownership:

- company/business direction;
- domain/application architecture;
- backend;
- API/server boundaries;
- PostgreSQL/Drizzle;
- migrations;
- evidence/provenance;
- scientific/data integrity;
- AI architecture;
- model provider integrations;
- infrastructure/security boundaries;
- backend/integration testing.

#### Product & Frontend Lead

Primary ownership:

- user journeys;
- information architecture;
- product design;
- interaction design;
- frontend architecture;
- `apps/web` frontend;
- design system / `packages/ui`;
- responsive behavior;
- accessibility;
- frontend performance;
- frontend testing;
- user-facing product quality.

#### Joint ownership

- `packages/contracts`;
- major user workflows;
- frontend-visible domain semantics;
- public DTO/API behavior;
- cross-stack errors;
- phase acceptance;
- release readiness;
- major cross-boundary changes.

Do not encode legal/equity/company ownership from these engineering roles.

### 3. Repository architecture

Target architecture is a modular monolith inside one monorepo:

```text
apps/
  web/
  # admin/ only when a real internal UI requirement exists

packages/
  domain/
  application/
  contracts/
  db/
  ai/
  ui/
  config/
  # integrations/ only when actually required
  # observability/ only when actually required

data/
  demo/
  curated/
  evaluation/

e2e/
scripts/
docs/
.github/
```

Do not create empty packages or future services merely to match the diagram.

Normal dependency direction:

```text
UI / external client
        |
web adapter / API / Server Action
        |
application use case
        |
domain
        |
ports
        |
infrastructure adapters
```

Hard prohibitions:

- no Next.js/React imports in domain;
- no Drizzle imports in domain/application;
- no AI-provider SDK outside `packages/ai`;
- no database access from React components;
- no core business/scientific logic in route handlers or UI;
- no raw database rows as public DTOs;
- no AI deciding authoritative truth, authorization, security, hard matching, commercial state, or workflow state;
- no microservices/Kubernetes/Redis/queues/search cluster unless a current measured requirement justifies them.

### 4. Shared-contract workflow

Significant cross-stack milestones begin by defining shared contracts.

Example:

```text
CapabilitySearchRequest
CapabilitySearchResult
CapabilitySummary
EvidenceSummary
public errors
pagination
URL/query behavior
UNKNOWN/CONFLICT semantics
```

Frontend may use schema-valid fixtures while backend/data implements the real path.

Fixtures must cover real states and must not invent unsupported backend behavior.

Any material shared-contract change requires cross-boundary review.

### 5. NEW Git branch architecture - update all old Git guidance

The canonical delivery path is now:

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

Update `AGENTS.md`, Git workflow docs, development-management docs, PR guidance, examples, and any other conflicting project instructions to use this model.

#### `work/*`

Individual implementation task.

Rules:

- one coherent task;
- normally one owner;
- short lived;
- merge into a segment;
- never directly to staging/main.

#### `segment/*`

One responsibility inside a milestone.

Examples:

```text
segment/m03/contracts
segment/m03/search-backend
segment/m03/search-data
segment/m03/discovery-frontend
```

Segments are created only if required by the milestone.

Never create permanent generic `frontend`, `backend`, or `ai` branches.

#### `phase/*`

Integrates all required milestone segments into one complete product capability.

No unrelated feature development directly on the phase branch.

#### `test/*`

Feature-freeze / formal QA branch.

Allowed:

```text
bug fixes
accessibility corrections
integration corrections
release blockers
```

Forbidden:

```text
new feature
new architecture
scope expansion
```

Use `fix/<milestone>/<issue>` branches for targeted corrections.

#### `staging`

Production-like release candidate with separate database, secrets, integrations, and AI configuration.

#### `main`

Accepted/published production state.

Additional branch types:

```text
fix/<milestone>/<issue>
hotfix/<issue>
experiment/<milestone>/<idea>
```

Experiments do not become production automatically.

### 6. Milestone segmentation

Milestones are product outcomes, not technology departments.

Do not create "backend phase" and "frontend phase."

Use this roadmap as the current planning baseline:

#### M0 - Alignment & Platform Foundation

Technical:

- monorepo;
- contracts;
- frontend foundation;
- core/application foundation;
- DB foundation;
- CI/tests;
- staging.

Business:

- first problem/customer hypothesis;
- initial supply hypothesis;
- first complete user journey;
- first beta definition/non-goals.

Typical segments:

```text
contracts
frontend-foundation
core-foundation
database-foundation
delivery
```

#### M1 - Supply Core

```text
Provider
Capability
Offering
AccessPath
```

Typical segments:

```text
contracts
domain
data
frontend
```

#### M2 - Evidence & Trust

```text
EvidenceSource
EvidenceAssertion
provenance
freshness/observation
user-facing evidence states
```

#### M3 - Capability Discovery

```text
contracts
search-backend
search-data
discovery-frontend
```

No production AI by default.

#### M4 - Requirements & Deterministic Evaluation

```text
contracts
requirements-domain
evaluation
requirements-frontend
```

AI intent extraction may exist as `experiment/m04/intent-extraction`, not as an authoritative requirement engine.

#### M5 - Access & Qualified Request

```text
contracts
access-domain
request-backend
request-frontend
notifications/integration if required
```

#### M6 - Provider Response & Engagement

```text
contracts
engagement-domain
provider-workflow
provider-frontend
audit if required
```

#### M7 - AI-Assisted Intelligence

```text
ai-contracts
model-gateway
provider-adapters
intent-extraction
evidence-extraction
evaluation
ai-product-ui if required
```

#### M8 - Commercial Beta & Hardening

```text
security
observability
data-operations
performance
frontend-hardening
release
```

Do not mechanically create every listed segment if the actual milestone scope is smaller.

### 7. Database logic

Use capability-centered platform concepts.

Logical domains:

```text
SUPPLY
Provider -> Offering -> Capability
                  -> AccessPath

EVIDENCE
EvidenceSource -> EvidenceAssertion -> resolved projection

DEMAND
ResearchIntent -> RequirementSet -> Requirement

DECISION
Requirement + Offering -> Evaluation / Match / Access Assessment

ENGAGEMENT
QualifiedRequest -> ProviderResponse -> Engagement -> Outcome

AI OPERATIONS
AIRun / AICandidateOutput / evaluation + prompt/config metadata
```

Do not create all tables at once.

Add tables only when an approved milestone needs them.

Preserve `UNKNOWN` explicitly. Missing information must not become false.

Externally visible scientific claims must remain traceable to evidence.

### 8. Updated AI architecture

FacilityPass depends on AI capability interfaces, not one vendor.

```text
Application
    |
AI capability port
    |
Model gateway / router
  /      |       \
OpenAI Anthropic Google
```

Application-facing operations may include:

```text
ResearchIntentExtractor
EvidenceCandidateExtractor
TerminologyNormalizer
QualifiedRequestDrafter
```

Provider-specific SDK logic belongs only in provider adapters.

Model routing may consider:

- task type;
- quality requirement;
- cost ceiling;
- latency;
- input size/modality;
- provider health;
- data policy;
- evaluation score.

Do not use the most expensive/frontier model by default.

### 9. Engineering vs LLM responsibility

AI may:

```text
interpret
extract
classify
normalize
summarize
draft
suggest
```

Engineering must own:

```text
authoritative database state
authorization
security
workflow transitions
scientific verification
evidence state
hard constraint evaluation
commercial state
financial calculations
permissions
```

Mandatory truth-sensitive pipeline:

```text
input/source
  -> LLM candidate
  -> schema validation
  -> deterministic/evidence validation
  -> human review where required
  -> authoritative state
```

### 10. AI learning / fine-tuning policy

Do not introduce model training as a foundation requirement.

Learning order:

```text
telemetry
-> human corrections + accepted outcomes
-> evaluation corpus
-> prompt/schema/retrieval/routing improvement
-> supervised/preference tuning only if justified
-> reinforcement fine-tuning only with a reliable reward signal
```

Store the information necessary to learn later, subject to privacy/licensing rules:

```text
source/input
candidate output
human correction
accepted result
outcome
evaluation score
```

Never automatically mark customer/provider/private data as training eligible.

If adding training-data eligibility, distinguish at minimum:

```text
NOT_ELIGIBLE
EVAL_ONLY
TRAINING_ELIGIBLE
```

### 11. Supporting-system policy

Initial platform should use managed services and remain operationally simple.

Introduce only when needed:

```text
object storage -> large source documents
worker/queue   -> long-running/retryable jobs
special search-> measured Postgres search limitation
admin app      -> recurring internal workflow needs UI
auth/orgs      -> real identity/organization requirement
advanced audit -> authoritative/sensitive workflow scale
```

Do not provision future scale in advance.

### 12. Existing code classification

Before changing implementation, classify relevant code:

```text
KEEP
PORT
REWRITE
DELETE
```

Definitions:

- KEEP: correct and already fits the new architecture.
- PORT: valuable but currently in the wrong layer/location.
- REWRITE: behavior is useful but built on an obsolete abstraction.
- DELETE: obsolete, duplicate, unsafe, or tied to retired project assumptions.

Do not perform a cosmetic full rewrite.

### 13. Required documentation update

At minimum inspect and reconcile:

```text
README.md
PROJECT-LOGIC.md (create if absent)
PLATFORM-ARCHITECTURE.md
AGENTS.md
CLAUDE.md / other agent entrypoints
docs/* coding architecture
docs/* Git/delivery
docs/* development management
docs/* AI integration
docs/* database architecture
docs/* implementation roadmap
.github/PULL_REQUEST_TEMPLATE.md
.github/copilot-instructions.md if present
```

Do not leave two conflicting branch models or two conflicting product identities active.

If preserving old documents for history, move them to a clearly marked legacy/archive location and remove them from the active instruction hierarchy.

### 14. AI coder execution rules

Before modifying files, report:

```text
Current repository state:
Conflicting guidance found:
Files to update:
Files to archive:
Code impact expected:
Migration impact expected:
Open product/business decisions that must NOT be guessed:
```

Then perform the smallest coherent update.

Do not automatically:

- commit;
- push;
- merge;
- rebase shared history;
- force-push;
- tag;
- release;
- modify production data;
- rotate secrets.

At completion report:

```text
Updated files:
Archived/reconciled files:
Branch-model changes:
Architecture changes:
AI-policy changes:
Roadmap changes:
Checks actually run:
Remaining conflicts/open decisions:
```

Do not claim a command/test passed unless you actually executed it.

### 15. Acceptance criteria for this repository-guideline update

The update is complete only when:

- active docs describe FacilityPass as a capability-access platform;
- first publish shape is a controlled web beta, not a fake mature SaaS claim;
- Product & Frontend Lead vs Core Systems Lead ownership is explicit;
- shared contracts are jointly owned;
- Git guidance uses `work -> segment -> phase -> test -> staging -> main` consistently;
- segment branch rules exist and include examples;
- milestones have separate technical and business goals;
- production AI is provider-independent and non-authoritative;
- learning/tuning is a staged future optimization, not a foundation dependency;
- database guidance is capability/evidence/demand/engagement centered;
- old Scout/backend-first direction is either reconciled or clearly archived;
- no speculative infrastructure/packages/tables are created solely because the architecture may need them later.

First inspect. Then update the project guidance. Do not begin a broad implementation rewrite unless a separate implementation task explicitly requests it.
