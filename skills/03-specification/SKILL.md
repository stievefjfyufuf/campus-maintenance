---
name: 03-specification
description: Convert approved Campus Maintenance elicitation needs into traceable functional requirements, non-functional requirements, business rules, user stories, and testable acceptance criteria. Use when creating or revising Step 3 specification artifacts before prioritization, while preserving NEED, GOAL, STK, DEC, REQ, NFR, BR, US, and AC traceability.
---

# Campus Maintenance Specification

## Required Inputs

1. Read `docs/software-engineering/01-inception.md` and `02-elicitation.md`.
2. Use only confirmed stakeholder answers and decisions as facts.
3. Preserve unresolved items as explicit assumptions or open questions.

## Workflow

1. Define actors and access boundaries without adding technical design.
2. Convert raw needs into atomic `REQ-###` statements with source and actor/goal links.
3. Define measurable `NFR-###` statements with verification criteria.
4. Define `BR-###` rules for state, authority, integrity, privacy, and policy.
5. Write `US-###` stories and at least two verifiable `AC-###` criteria per story.
6. Build traceability from NEED/DEC through REQ/NFR/BR/US/AC.
7. Mark uncertain items Provisional; never silently invent stakeholder decisions.
8. Save the artifact to `docs/software-engineering/03-specification.md`.
9. Require human review before routing the specification to Step 4.

## Quality Gates

- Every REQ has a stable ID, source, actor/goal, status, and AC link.
- Every NFR is measurable under a stated dataset or operating condition.
- Positive and negative paths exist for authorization and validation rules.
- No out-of-scope feature is introduced.
- Conflicts and open questions remain visible.
- Human approval and AI evidence are stored under `evidence/03-specification/`.

## Change Control

Do not overwrite an approved requirement baseline. Route material changes through `docs/software-engineering/16-change-request.md` and preserve all existing traceability IDs unless an approved CR explicitly retires one.

## Handoff

Send the approved requirement set and unresolved-item register to `04-prioritization`.
