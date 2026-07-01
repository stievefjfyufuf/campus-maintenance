# Issue Planning

## Milestone REL-001 — Baseline MVP

| ID | Outcome | Dependencies | Traceability |
|---|---|---|---|
| ISSUE-001 | D1 schema, indexes, and seed users/master data | None | DATA-001–008, REQ-024, AC-047 |
| ISSUE-002 | Hono API foundation and role validation | ISSUE-001 | ADR-005, REQ-022, AC-044 |
| ISSUE-003 | Create/list/detail reports with access boundaries | ISSUE-001/002 | REQ-001–004, AC-001–008, API-002–004 |
| ISSUE-004 | Admin review and triage | ISSUE-003 | REQ-005/006/023, AC-009–012/045 |
| ISSUE-005 | Assignment and technician acceptance | ISSUE-004 | REQ-008–010, AC-015–020 |
| ISSUE-006 | Progress, resolve, close, and audit lifecycle | ISSUE-005 | REQ-011–019, AC-021–038 |
| ISSUE-007 | Comment visibility and history | ISSUE-003 | REQ-018/019, AC-035–038 |
| ISSUE-008 | Dashboard backed by D1 | ISSUE-003 | REQ-020/021/024, AC-039–042/047 |
| ISSUE-009 | Responsive role-based React UI | ISSUE-002–008 | UI-001–005, REQ-001/003/022 |
| ISSUE-010 | Automated tests, UAT, deployment, and documentation | ISSUE-001–009 | NFR-001–012, AC-048, CR-005 |

Each issue is limited to its stated outcome; optional upload, email, QR, inventory, vendor, and production authentication remain out of scope. Acceptance requires linked AC behavior, role denial paths, deterministic tests, and a reviewable diff. Implementation sequence is ISSUE-001 through ISSUE-010.
