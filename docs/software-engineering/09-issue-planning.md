# Issue Planning

## Metadata

| Item | Value |
|---|---|
| Baseline | REL-001 |
| Active change | CR-006 |
| Inputs | Steps 3–8 |
| Selected issue | ISSUE-011 |
| Next step | 10-se-implementation |

## Historical Milestone REL-001

ISSUE-001–010 remain the historical delivery plan applied through CR-005. CR-006 does not rewrite their scope or completion history.

| ID | Outcome | Dependencies | Traceability |
|---|---|---|---|
| ISSUE-001 | D1 schema, indexes, and seed users/master data | None | DATA-001–008, REQ-024, AC-047 |
| ISSUE-002 | Hono API foundation and role validation | ISSUE-001 | ADR-005, REQ-022, AC-044 |
| ISSUE-003 | Create/list/detail reports with access boundaries | ISSUE-001/002 | REQ-001–004, AC-001–008, API-002–004 |
| ISSUE-004 | Admin review and triage | ISSUE-003 | REQ-005/006/023, AC-009–012/045 |
| ISSUE-005 | Assignment and technician acceptance | ISSUE-004 | REQ-008–010, AC-015–020 |
| ISSUE-006 | Progress, resolve, close, and audit lifecycle | ISSUE-005 | REQ-011–019, AC-021–038 |
| ISSUE-007 | Comment visibility and history | ISSUE-003 | REQ-018/019, AC-035–038 |
| ISSUE-008 | Dashboard API backed by D1 | ISSUE-003 | REQ-020/021/024, AC-039–042/047, API-018 |
| ISSUE-009 | Responsive role-based React UI | ISSUE-002–008 | UI-001–005, REQ-001/003/022 |
| ISSUE-010 | Automated tests, UAT, deployment, and documentation | ISSUE-001–009 | NFR-001–012, AC-048, CR-005 |

## CR-006 Backlog

| ID | Outcome | Priority | Owner role | Dependencies | Risk | Status |
|---|---|---|---|---|---|---|
| ISSUE-011 | Expose D1 dashboard metrics to authorized users in React UI | Must | Frontend developer | API-018, UI-005, ISSUE-008/009 | Low | Implemented; pending Step 11 review |
| ISSUE-012 | Add report detail view with safe access states | Should | Full-stack developer | API-004, UI-006 | Medium | Backlog |
| ISSUE-013 | Add triage and reassignment forms | Should | Full-stack developer | API-006–008, UI-007 | Medium | Backlog |
| ISSUE-014 | Add progress and resolution forms | Should | Full-stack developer | API-010/011, UI-008 | Medium | Backlog |
| ISSUE-015 | Add comments, history, close, and reopen interfaces | Should | Full-stack developer | API-012–017, UI-009/010 | High | Backlog |

Only ISSUE-011 is approved for Step 10 in CR-006. ISSUE-012–015 require their own selected implementation scope and API/security review before coding.

## ISSUE-011 — Expose D1 Dashboard Metrics in React UI

### Context

REL-001 includes `REQ-020`, `REQ-024`, `AC-039`, `AC-047`, `API-018`, and `UI-005`. The Worker returns D1-backed dashboard values, but the current React application does not render them. This leaves an observable gap between the approved UI behavior and implementation.

### Scope

- Request `GET /api/dashboard` for ADMIN and MANAJER using the existing request helper.
- Render total, active, closed, overdue, and status distribution.
- Support loading, empty, error, retry, role-switch, and responsive states.
- Refresh dashboard data after lifecycle actions.
- Keep dashboard hidden for PELAPOR and TEKNISI.

### Acceptance Checklist

- [ ] Authorized admin and manager see dashboard metrics returned by API-018.
- [ ] Pelapor and technician never see or request the dashboard panel.
- [ ] Metrics are derived from API data and contain no hard-coded operational counts.
- [ ] Loading, empty, and error states are understandable in Bahasa Indonesia.
- [ ] Dashboard failure does not erase or block the report list.
- [ ] Changing from an authorized to unauthorized role clears stale dashboard data.
- [ ] Layout works below 700px and every metric has a visible text label.
- [ ] Existing TEST-001–020, lint, and build remain passing.

### Technical Notes

- Extend frontend types for `totals` and `byStatus`; coerce nullable SQLite aggregate values to safe numeric display values.
- Keep API-018 unchanged and avoid chart dependencies.
- Use a dedicated dashboard loading/error state so report loading remains independent.
- Reuse `request()` so current role headers and 401/403 handling remain consistent.

### Test Notes

- Automated regression: `npm test`, `npm run lint`, `npm run build`.
- Manual: switch across all four seeded roles; simulate API failure; verify zero-data rendering; verify dashboard refresh after report lifecycle mutation.
- Step 13 may later add component/API integration coverage; it is outside this three-skill request.

### Dependencies

- `DEP-001`: API-018 and role middleware must remain compatible.
- `DEP-002`: UI-001 selected user must drive dashboard authorization and refetch.

### Out of Scope

New API metrics, filters, charts, database changes, authentication, report detail, comments, progress forms, production deployment, and baseline promotion.

### Traceability

- Change: CR-006
- Requirements: REQ-020, REQ-024
- Acceptance: AC-039, AC-040, AC-047
- API/UI: API-018, UI-001, UI-005
- Architecture: ADR-001, ADR-004, ADR-005
- Prior work: ISSUE-008, ISSUE-009

## Dependency Map

```text
ISSUE-008 (API-018) ─┐
                     ├─> ISSUE-011 (selected) ─> Step 11 review
ISSUE-009 (React) ───┘

ISSUE-011 ─> ISSUE-012/013/014/015 remain independent backlog candidates
```

## Handoff to Step 10

Implement only ISSUE-011. Any discovered API or authorization defect must be recorded and routed upstream rather than silently expanding the issue.
