# Design Documentation Index

Folder ini adalah index desain agar reviewer dapat menemukan artefak desain tanpa menyalin isi dari baseline utama.

| Area | Source of truth | Status | Traceability |
|---|---|---|---|
| Architecture | [`../software-engineering/06-architecture-design.md`](../software-engineering/06-architecture-design.md) | Approved baseline | ADR-001–006, REQ-001–024 |
| Database and API | [`../software-engineering/07-database-api-design.md`](../software-engineering/07-database-api-design.md) | Approved baseline | DATA-001–008, API-001–022 |
| UI design | [`../software-engineering/08-ui-design.md`](../software-engineering/08-ui-design.md) | Approved with CR-006 dashboard update | UI-001–010, CR-006 |

## Baseline

- REL-001 delivered the original architecture, D1 schema, API, and role-based UI.
- REL-002 added the dashboard metrics panel for admin/manager roles without changing database or API contracts.

## Change Control

Any design change after REL-002 must be recorded through [`../software-engineering/16-change-request.md`](../software-engineering/16-change-request.md) before implementation.
