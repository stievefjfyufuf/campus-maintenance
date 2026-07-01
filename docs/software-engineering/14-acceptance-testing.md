# Acceptance Testing

## User Flow

CR-006 acceptance focuses on `FLOW-003 — Operational dashboard` from Step 8:

`Admin/Manajer role selector -> dashboard loading -> metrics from API-018 -> status distribution -> switch to Pelapor/Teknisi -> dashboard removed`.

REL-001 lifecycle UAT-001–006 remains accepted for create/review/assign/resolve/close and role-filtered report access.

## UAT Checklist

- [x] UAT-001: Pelapor creates a valid report and sees it after reload (`SUBMITTED`).
- [x] UAT-002: Administrator changes it to `UNDER_REVIEW` and assigns the seeded technician.
- [x] UAT-003: Technician sees the assigned report, accepts it (`IN_PROGRESS`), and resolves it.
- [x] UAT-004: Reporter sees the resolved report and closes it (`CLOSED`).
- [x] UAT-005: Role selector changes visible data/actions according to permissions.
- [x] UAT-006: Empty, loading, success, and role-filtered states render correctly.
- [x] UAT-007 / AC-039/047/048 / TEST-021/023: Dashboard candidate renders authorized operational metrics through the existing API response shape.
- [x] UAT-008 / AC-043/044 / TEST-022: Reporter and technician roles are blocked by the UI guard before dashboard rendering.
- [x] UAT-009 / AC-040 / TEST-024: Empty or null dashboard totals render zero-safe values and an empty distribution message.
- [x] UAT-010 / AC-039/047 / TEST-023/026: Dashboard metric and status values are derived from response data rather than hard-coded operational counts.
- [x] UAT-011 / NFR-007/008: Dashboard cards and status distribution have visible text labels and remain dependency-free/responsive through existing CSS.
- [x] UAT-012 / NFR-012: Production URL and `/api/health` smoke test passed after REL-002 deployment.

## Evidence

| Evidence | Result |
|---|---|
| `npm.cmd test` | Pass: 2 files, 26/26 tests |
| `npm.cmd run lint` | Pass: 0 errors; 2 generated Cloudflare type warnings |
| `npm.cmd run build` | Pass: Worker/client bundles built; optional Wrangler log write EPERM only |
| Code inspection | `src/App.tsx` uses `canViewDashboardRole`, `buildDashboardMetrics`, and `normalizeStatusDistribution`; unauthorized roles do not render the dashboard section |
| Production smoke | Public page 200; `/api/health` 200; `/api/users` 200; admin `/api/dashboard` 200 with `totals` |

## Defects

No blocking CR-006 acceptance defect found.

## Feedback

- Rich dashboard filters/trends from REQ-021 remain outside CR-006 and should stay backlog/change-control scope.
- Browser screenshot evidence was not captured in this run; production smoke will provide release evidence in Step 15.

## Decision

Accepted. CR-006 passed TEST-021–026, UAT-007–012, deployment, and production smoke verification.

## Follow-up

REL-002 is promoted as the active deployed baseline. Future production feedback routes through Step 16.
# CR-008 Acceptance Addendum

- [x] Public Cloudflare page loads the Campus Care frontend.
- [x] D1-backed users, locations, and categories load in the reporter form.
- [x] ADMIN role displays the operational dashboard.
- [x] Dashboard values are returned and rendered without an error state.
- [x] No personal data was submitted during read-only smoke verification.

Decision: **accepted**. REL-002 behavior remains unchanged.
