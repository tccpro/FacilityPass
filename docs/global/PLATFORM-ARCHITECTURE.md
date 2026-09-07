# System architecture

**Status:** AUTHORITATIVE  
**Default shape:** modular monolith; workspace/monorepo-ready without speculative package splitting

## 1. Dependency direction

```text
UI
  -> API / Server Action / application adapter
  -> service/use-case
  -> domain
  -> repository interface
  -> persistence adapter
```

External systems enter through explicit adapters. A framework, database, model provider, email provider, analytics SDK, or deployment platform must not become a hidden domain layer.

## 2. Layer responsibilities

| Layer | May | Must not |
|---|---|---|
| UI | render, collect input, presentation state, call approved interfaces | decide scientific truth, authorize, query DB directly |
| API/application adapter | parse, validate, call use-case, serialize | contain substantial domain rules or SQL |
| Service/use-case | orchestrate a business action, transaction boundary | become an unstructured second domain layer |
| Domain | pure business/scientific rules, state transitions, deterministic matching | perform framework/database/network I/O |
| Repository | persist/retrieve mapped domain data | decide scientific/business policy |
| Infrastructure adapter | provider/database/runtime integration | create authoritative domain facts on its own |

## 3. Current shape and monorepo target

FacilityPass is a **modular monolith inside one monorepo**. Responsibility separation
is achieved through packages, modules, contracts, code ownership, branch segments,
reviews, and decision authority — never by splitting into separate products.

### Target repository shape (`PROJECT-LOGIC.md` §6)

```text
apps/
  web/
  # admin/ only when an internal UI is genuinely required

packages/
  domain/        # pure business/scientific rules
  application/   # use cases / orchestration
  contracts/     # shared DTO/schema contracts (jointly owned)
  db/            # persistence adapters / migrations
  ai/            # model gateway + provider adapters
  ui/            # reusable presentation
  config/        # shared configuration
  # integrations/    only when a real integration exists
  # observability/   only when shared observability code exists

data/
  demo/
  curated/
  evaluation/

e2e/
scripts/
docs/
.github/
```

### Current implementation shape (reality)

The application currently lives as a single Next.js app under `src/` with
business-module separation:

```text
src/app/            -> becomes apps/web
src/components/     -> becomes apps/web (or packages/ui when shared)
src/modules/<m>/    -> becomes packages/{domain,application,db} split per module
src/server/db/      -> becomes packages/db
src/lib/            -> becomes packages/config or stays app-local
data/  e2e/  scripts/  docs/  .github/   (already in target positions)
```

### Transition rule

Move from `src/` to `apps/` + `packages/` only when at least one of these is true:

- a second independently deployed application exists;
- shared domain/contracts are consumed by multiple real clients;
- dependency boundaries cannot be enforced cleanly inside `src/`;
- ownership/build performance justifies physical separation.

The move is an explicit milestone segment (M0 `monorepo-structure`), executed with its
own ADR and PR — never opportunistically during unrelated feature work. Do not create
empty packages merely to make the repository look sophisticated.

## 4. Hard prohibitions

```text
no Next.js/React imports in domain;
no Drizzle imports in domain/application;
no AI-provider SDK outside packages/ai;
no database access from React components;
no core business/scientific logic in route handlers or UI;
no raw database rows as public DTOs;
no AI deciding authoritative truth, authorization, security, hard matching,
  commercial state, or workflow state;
no microservices/Kubernetes/Redis/queues/search cluster unless a current
  measured requirement justifies them.
```

These are enforced by ESLint import-boundary rules where mechanical, and by review
everywhere else.

## 5. API-first rule

Business capabilities must be callable without React. Future web, CLI, SDK, institutional integration, MCP, or AI-agent clients consume the same application/domain capabilities.

Do not import Next.js APIs into domain modules.

## 6. Contract boundaries

External request and response contracts require explicit validation. Zod is the default boundary validator unless an ADR changes it.

Error responses should be stable, typed, and safe:

```json
{
  "error": {
    "code": "STABLE_CODE",
    "message": "Safe user-facing explanation"
  }
}
```

Never expose raw database errors, stack traces, secret values, or internal implementation details to clients.

## 7. IDs

Internal database IDs should not become public identifiers by accident. Externally addressable objects should use stable opaque public IDs or deliberate slugs.

Never encode sensitive data directly in an identifier or URL.

## 8. Search, matching, ranking

Keep these concepts separate:

```text
search    = retrieve possible candidates
matching  = evaluate requirements against evidence/rules
ranking   = order already eligible candidates
```

Semantic similarity alone must not establish scientific compatibility.

Preferred pipeline:

```text
input
 -> structured requirement
 -> candidate retrieval
 -> hard constraints
 -> evidence evaluation
 -> reason codes
 -> ranking
```

## 9. Buy / build / integrate

Before a major subsystem, decide explicitly:

```text
BUILD      differentiated capability intelligence
INTEGRATE  commodity operational system
BUY/USE    standard non-differentiated service
```

Default examples:

- matching/provenance/capability graph: build;
- booking/billing/payments: integrate unless strategy proves otherwise.

## 10. Architecture fitness checks

Architecture is healthy when an external engineer can locate:

- domain rules;
- persistence;
- API contracts;
- scientific evidence resolution;
- AI boundary;
- security boundary;
- ownership;
- tests.

Use lint/import rules or architecture tests for boundaries that are important enough to enforce mechanically.
