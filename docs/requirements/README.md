# Requirements Engineering Index

Artefak requirements engineering dan downstream traceability disimpan dengan urutan proses di `docs/software-engineering/`.

## Requirements Baseline

| Tahap | Artefak | Status |
|---|---|---|
| 01 - Inception dan Stakeholder | [`../software-engineering/01-inception.md`](../software-engineering/01-inception.md) | Approved |
| 02 - Elicitation | [`../software-engineering/02-elicitation.md`](../software-engineering/02-elicitation.md) | Completed |
| 03 - Specification | [`../software-engineering/03-specification.md`](../software-engineering/03-specification.md) | Approved; 24 REQ and 48 AC |
| 04 - Prioritization | [`../software-engineering/04-prioritization.md`](../software-engineering/04-prioritization.md) | Approved |
| 05 - Validation dan Change | [`../software-engineering/05-validation-change.md`](../software-engineering/05-validation-change.md) | Validated |

## Downstream Traceability

| Tahap | Artefak | Purpose |
|---|---|---|
| 06 - Architecture | [`../software-engineering/06-architecture-design.md`](../software-engineering/06-architecture-design.md) | Maps validated requirements to components and ADRs |
| 07 - Database/API | [`../software-engineering/07-database-api-design.md`](../software-engineering/07-database-api-design.md) | Maps REQ/AC to DATA and API contracts |
| 08 - UI Design | [`../software-engineering/08-ui-design.md`](../software-engineering/08-ui-design.md) | Maps stories/API to UI screens and states |
| 09 - Issue Planning | [`../software-engineering/09-issue-planning.md`](../software-engineering/09-issue-planning.md) | Maps approved scope to implementation issues |
| 10-15 - Delivery | [`../software-engineering/10-implementation.md`](../software-engineering/10-implementation.md) to [`../software-engineering/15-deployment.md`](../software-engineering/15-deployment.md) | Implementation, review, test, UAT, deployment |
| 16 - Change Control | [`../software-engineering/16-change-request.md`](../software-engineering/16-change-request.md) | Tracks baseline-impacting changes |

## Current Baseline

- REL-001: MVP baseline.
- REL-002: active deployed baseline with CR-006 dashboard UI metrics.

Index ini membantu reviewer menemukan artefak tanpa membuat salinan yang berisiko tidak sinkron.
