# Automated Testing Notes

## Tests Added/Updated

| Test ID | Test File | Scenario | Requirement / AC |
|---|---|---|---|
| TEST-001–020 | `tests/domain.test.ts` | Existing REL-001 validation, workflow, ID, and business-day regression coverage | REQ-001/002/005/008/010/012/013/017/023 |
| TEST-021 | `tests/dashboard.test.ts` | Admin and manager can view dashboard metrics | REQ-020/024, AC-039/047, ISSUE-011 |
| TEST-022 | `tests/dashboard.test.ts` | Reporter and technician cannot view dashboard metrics through the UI guard | REQ-003/020/022/024, AC-040/043/044, ISSUE-011 |
| TEST-023 | `tests/dashboard.test.ts` | Dashboard metric labels and active count are derived from API totals | REQ-020/024, AC-039/047/048, ISSUE-011 |
| TEST-024 | `tests/dashboard.test.ts` | Empty/null dashboard totals produce safe zero values | REQ-020/024, AC-040/047, ISSUE-011 |
| TEST-025 | `tests/dashboard.test.ts` | Active count is clamped to zero if closed exceeds total | REQ-020/024, AC-039/040, ISSUE-011 |
| TEST-026 | `tests/dashboard.test.ts` | Status labels and counts normalize safely from API response values | REQ-020/024, AC-039/040/047, ISSUE-011 |

## Test Data/Fixtures

- `tests/domain.test.ts` uses deterministic synthetic report payloads, roles, status transitions, and fixed dates.
- `tests/dashboard.test.ts` uses local dashboard response fixtures only; no network, D1, browser, or Cloudflare dependency is required.

## Commands Run

| Command | Result |
|---|---|
| `npm test` | Blocked by local PowerShell execution policy for `npm.ps1`; rerun with `npm.cmd` |
| `npm.cmd test` | Pass: 2 files, 26/26 tests |
| `npm.cmd run lint` | Pass: 0 errors; 2 generated `worker-configuration.d.ts` warnings |
| `npm.cmd run build` | Pass: Worker and client bundles built; Wrangler optional log write reports sandbox EPERM with exit code 0 |

## Results

CR-006 automated regression passes. The previous review gap for dashboard role visibility and metric derivation is now covered by TEST-021–026.

## Failures and Fixes

- No product test failures after adding dashboard coverage.
- The only command issue was the host PowerShell script policy for `npm`; using `npm.cmd` avoids changing machine policy.

## Coverage Notes

- Automated tests cover deterministic dashboard logic, permission guard, zero-state metric handling, and status distribution normalization.
- Browser visual UAT remains a Step 14 concern; no new dependency such as jsdom or Playwright was introduced.
# CR-008 Test Run Addendum

| Command | Result |
|---|---|
| `npm.cmd ci` | Pass; 212 packages installed, 0 vulnerabilities |
| `npm.cmd test` | Pass; 2 files, 26/26 tests |
| `npm.cmd run lint` | Pass; 0 errors, 2 generated Cloudflare warnings |
| `npm.cmd run build` | Pass; Worker and client bundles generated |
| `git diff --check` | Pass; line-ending warning only |

Wrangler could not write its optional debug log outside the workspace sandbox, but the production build completed with exit code 0.
# CR-009 Automated Test Addendum

| Command | Result |
|---|---|
| `npm.cmd test` | Pass: 2 files, 26/26 tests |
| `npm.cmd run lint` | Pass: 0 errors; 2 generated Cloudflare warnings |
| `npm.cmd run build` | Pass: Worker and client production bundles |

The existing domain and dashboard regression suite passes unchanged, confirming the REL-002 workflow remains compatible.
# CR-010 Automated Testing Addendum

| Gate | Result |
|---|---|
| `npm.cmd test` | Pass: 2 files, 29/29 tests |
| `npm.cmd run lint` | Pass: 0 errors, 2 generated warnings |
| `npm.cmd run build` | Pass: Worker and client bundles |
| Production `/api/health` | Pass: `{ "ok": true }` |
| Production `/api/auth/config` | Pass: `{ "googleEnabled": false }`, correctly reflecting missing secrets |
