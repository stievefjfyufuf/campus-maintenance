# Test Plan

## Scope

REL-001 test plan remains the baseline for CR-005 / ISSUE-001–010. This Step 12 update adds CR-006 / ISSUE-011 coverage for the dashboard UI exposed to authorized roles.

Primary risk areas:

- Dashboard visibility must follow `ADMIN` and `MANAJER` only.
- `PELAPOR` and `TEKNISI` must not retain stale dashboard data after role switch.
- Metrics must be derived from `API-018` values and handle `null`, empty, and stringified SQLite aggregate values safely.
- Dashboard failure must not block the report list.

## Coverage Matrix

| Test ID | Requirement / AC | Issue / UI | Test Type | Scenario | Priority | Automated? |
|---|---|---|---|---|---|---|
| TEST-001–009 | REQ-001/002, AC-001/002 | ISSUE-003 | Unit | Valid/invalid report payload boundaries | High | Yes |
| TEST-010–017 | REQ-005/008/010/012/013/017 | ISSUE-004–006 | Unit/security | Allowed and denied status transitions | High | Yes |
| TEST-018–020 | REQ-002/023, AC-003/045 | ISSUE-003/006 | Unit | ID format and business-day calculations | Medium | Yes |
| TEST-021 | REQ-020/024, AC-039/047 | ISSUE-011, UI-005 | Unit/security | Admin and manager can view dashboard metrics | High | Yes |
| TEST-022 | REQ-003/020/022/024, AC-040/043/044 | ISSUE-011, UI-001/UI-005 | Unit/security | Reporter and technician dashboard access is hidden at UI guard | High | Yes |
| TEST-023 | REQ-020/024, AC-039/047/048 | ISSUE-011, UI-005 | Unit | Active, closed, in-progress, overdue values derive from API totals | High | Yes |
| TEST-024 | REQ-020/024, AC-040/047 | ISSUE-011, UI-005 | Unit | Empty/null dashboard totals render zero-safe metric values | Medium | Yes |
| TEST-025 | REQ-020/024, AC-039/040 | ISSUE-011, UI-005 | Unit | Active count cannot render as a negative number | Medium | Yes |
| TEST-026 | REQ-020/024, AC-039/040/047 | ISSUE-011, UI-005 | Unit | Status distribution labels and counts normalize safely | Medium | Yes |
| UAT-007 | REQ-020/024, AC-039/047/048 | ISSUE-011, UI-005 | Acceptance | Authorized user sees dashboard metrics from operational API data | High | Evidence-backed |
| UAT-008 | REQ-003/022, AC-043/044 | ISSUE-011, UI-001/UI-005 | Acceptance/security | Unauthorized roles do not see dashboard panel | High | Evidence-backed |
| UAT-009 | REQ-020/024, AC-040 | ISSUE-011, UI-005 | Acceptance | Empty dashboard state renders without error | Medium | Evidence-backed |
| UAT-010 | REQ-020/024, AC-039/047 | ISSUE-011, UI-005 | Acceptance | Dashboard values are not hard-coded | Medium | Evidence-backed |
| UAT-011 | NFR-007/008 | ISSUE-011, UI-005 | Acceptance/UI | Dashboard labels and status summary remain readable on responsive layout | Medium | Evidence-backed |
| UAT-012 | NFR-012 | ISSUE-011, REL-002 candidate | Smoke | Deployed URL and `/api/health` respond after release | High | Smoke test |

## Test Data

- Existing seed users: `usr-admin`, `usr-manager`, `usr-reporter`, `usr-tech`.
- Existing D1 reports seeded by REL-001 production data and local fixtures.
- Dashboard unit fixtures include mixed numeric values, `null` totals, stringified counts, and contradictory totals to verify safe fallbacks.

## Regression Checklist

- `npm.cmd test`
- `npm.cmd run lint`
- `npm.cmd run build`
- Verify dashboard remains hidden for `PELAPOR` and `TEKNISI`.
- Verify dashboard visible for `ADMIN` and `MANAJER`.
- Verify report list still loads even if dashboard state changes.
- Verify no database migration, API contract, dependency, or secret change is introduced by CR-006.

## Manual Verification Needed

Browser-level visual checks remain useful for exact responsive layout and click-through role switching. In this run, automated helper coverage plus build/lint/test gates are used as release evidence, and production smoke tests are required in Step 15.

## Risks

- Current dashboard API still exposes only the REL-001 subset of the richer REQ-020/021 metrics. CR-006 must not invent missing metrics.
- `npm ci` has a pre-existing lockfile optional peer mismatch; it is not introduced by CR-006 and should be tracked separately.
- Wrangler may fail to write optional logs in the sandbox while still returning successful build output.
# CR-008 Verification Addendum

CR-008 reuses TEST-001–026 as the runtime regression suite and adds release checks for placeholder removal, `git diff --check`, production page loading, D1-backed reference-data loading, and authorized dashboard visibility. No new behavior requires a new automated test ID.
# CR-009 Test Plan Addendum

Regression scope includes TEST-001–026 plus UAT checks for the OAuth-unconfigured state, demo entry, theme persistence, role workspace headings, admin dashboard authorization, responsive layout, build, and production smoke. A real Google callback is blocked until the project owner supplies Google OAuth credentials as Cloudflare secrets.
