# UI Design

## Status

Approved by owner authorization under CR-005.

## Screen List

| ID | Screen/area | User goal | Main actions | Traceability |
|---|---|---|---|---|
| UI-001 | Role selector | Switch demo identity | Select seeded user | REQ-022, AC-043/044, API-001 |
| UI-002 | Report list | Find and monitor reports | Search, filter, read cards | REQ-003/004, AC-005/008, API-003 |
| UI-003 | New report form | Submit a facility issue | Validate and create | REQ-001/002, AC-001/004, API-002 |
| UI-004 | Lifecycle actions | Move work through the workflow | Review, assign, accept, resolve, close | REQ-005/008/010/012/013 |
| UI-005 | Dashboard data | View operational summary | Read totals/status | REQ-020/024, API-018 |

## Navigation Flow

Role selector → role-filtered report list → create or permitted lifecycle action → refreshed status. Pelapor sees only owned reports; technician sees assigned reports; admin/manager sees operational scope.

## Form and States

New report requires title 5–100 chars, description 20–2000 chars, location, category, and valid contact. Loading, empty, error, success, unauthorized, and disabled-by-role states are explicit. Errors are announced through a status notice. Layout collapses to a single column below 700px and labels remain associated with every control.

## Wireframe

Header: product identity + role selector. Main: report heading/filter row, conditional new-report panel, responsive report cards. Each card shows status, priority, ID, location, category, and only role-permitted actions.
