# Test Plan

## Scope and Strategy

Risk-based coverage for CR-005 and ISSUE-001–010: input validation, role permissions, lifecycle transitions, business-day dates, database integrity, API/UI integration, and production smoke checks.

## Coverage Matrix

| Tests | Type | Scenario | Traceability |
|---|---|---|---|
| TEST-001–009 | Unit | Valid/invalid report payload boundaries | REQ-001/002, AC-001/002, ISSUE-003 |
| TEST-010–017 | Unit/security | Allowed and denied status transitions | REQ-005/008/010/012/013/017, ISSUE-004–006 |
| TEST-018–020 | Unit | ID format and business-day calculations | REQ-002/023, AC-003/045 |
| UAT-001 | Integration/UI | Reporter creates persisted report | REQ-001/002/024, UI-003 |
| UAT-002 | Integration/UI | Admin reviews and assigns technician | REQ-005/008, UI-004 |
| UAT-003 | Integration/UI | Technician accepts and resolves | REQ-010/012, UI-004 |
| UAT-004 | Integration/UI | Reporter closes resolved report | REQ-013, UI-004 |

## Test Data and Regression

Use synthetic seeded users, five categories, and five locations. Re-run install, migration, seed, tests, lint, build, role visibility, internal-comment filtering, and end-to-end lifecycle before release.
