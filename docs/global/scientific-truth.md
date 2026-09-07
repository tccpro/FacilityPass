# Scientific truth rules

**Status:** AUTHORITATIVE domain rules

FacilityPass is a trust product. Accuracy and provenance outrank convenience, completeness, speed, interface polish, and commercial pressure.

## 1. Never invent

No capability, specification, service, access condition, training/qualification requirement, scientific constraint, price, deadline, or provider characteristic may be presented as factual without appropriate evidence.

Missing information is `UNKNOWN`.

## 2. Capability is broader than equipment

A `ResearchCapability` may include:

```text
instrument
technology
scientific technique
service
expertise
training
analysis
sample preparation
collaboration
access pathway
qualification
availability
```

Do not reduce the model to equipment inventory.

## 3. Absence rule

```text
FacilityPass has no record
 -> UNKNOWN

authoritative evidence explicitly states unavailable
 -> documented negative evidence
```

Internal data absence is never proof of real-world absence.

## 4. Evidence states

```text
FACILITY_CONFIRMED  direct appropriately authorized facility confirmation
SOURCE_CONFIRMED    explicit authoritative documentation
INFERRED            reasonable interpretation, not explicit
UNKNOWN             insufficient information
CONFLICT            reliable evidence disagrees
```

`INFERRED` never renders as confirmed. `CONFLICT` is not silently resolved merely because one answer is more convenient.

## 5. Claims and resolution

Evidence assertions are inputs. Resolved capability state is a derived/materialized output.

```text
source
 -> evidence assertion
 -> claim resolution
 -> resolved capability
 -> product projection
```

Do not maintain an independently editable authoritative capability field disconnected from evidence.

## 6. Matching is not verification

Algorithmic outputs may include states such as:

```text
LIKELY_COMPATIBLE
NEEDS_VERIFICATION
INCOMPATIBLE
```

Only an appropriately authorized facility response may establish a facility-confirmed feasibility state such as `VERIFIED_FEASIBLE`.

## 7. Separate scientific and operational state

Do not collapse:

```text
capability exists
capability is currently available
external users may access it
this user is authorized
training is required/completed
```

Each is an independent claim with independent evidence.

## 8. Scientific vs economic state

Scientific suitability does not imply economic optimality.

Economic analysis must identify source-backed price, customer input, assumption, and scenario separately.

## 9. Scientific vs commercial state

Commercial relationship does not strengthen scientific evidence. Payment/partnership must never secretly alter scientific compatibility ranking.

## 10. No fake precision

Do not publish arbitrary percentages such as “97.2% compatible” unless a separately approved, scientifically/statistically justified model exists.

Prefer reason-based output:

```text
Likely compatible
5 requirements confirmed
0 conflicts
1 unknown
```

## 11. Conservatism

When evidence is insufficient, `NEEDS_VERIFICATION`/`UNKNOWN` is preferable to an unjustified affirmative claim.

## 12. Demonstration data

Synthetic records must be unmistakably marked:

> DEMO DATA — NOT A REAL FACILITY

Demo and real data never mix in production scientific/commercial analytics or SEO/indexable public content.
