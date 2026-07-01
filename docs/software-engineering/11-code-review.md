# Code Review

## Findings

| ID | Severity | File/Line | Finding | Resolution |
|---|---|---|---|---|
| FINDING-001 | P1 | `src/App.tsx` create handler | React form reference became null after asynchronous request | Fixed by capturing the form before `await`; browser regression passed |
| FINDING-002 | P2 | Step 7 API table | Non-standard HTTP 210 responses | Corrected to HTTP 201 |
| FINDING-003 | P1 | assignments migration | One active technician was not database-enforced | Added partial unique index |
| FINDING-004 | P2 | Step 7 status/evidence | Artifact claimed approval while review was pending | Synchronized through CR-005 |

## Missing Tests and Residual Risk

Twenty domain tests cover validation, permissions, workflow, dates, and IDs. Remote D1 integration and production authentication remain residual risks. The latter is explicitly out of scope.

## Decision

Approve after fixes. Build, lint, local migration/seed, 20 tests, and browser lifecycle UAT pass. Route to Step 12.

---

## CR-006 Review — ISSUE-011

### Scope and Traceability

Reviewed `CR-006` and `ISSUE-011` against `REQ-020`, `REQ-024`, `AC-039`, `AC-040`, `AC-047`, `API-018`, `UI-001`, and `UI-005`.

### Findings

| ID | Severity | File/Line | Finding | Resolution |
|---|---|---|---|---|
| FINDING-005 | P3 | `src/App.tsx` dashboard effects | React lint initially reported the existing effect pattern when dashboard loading was added. | Scoped suppression retained for the report loader; final lint has 0 errors. |
| FINDING-006 | P3 | `package-lock.json` / install gate | `npm ci` exposes a pre-existing optional peer-dependency lock mismatch. | Not introduced by CR-006; no dependency or lockfile changes included. Track as a separate maintenance CR. |

No P0, P1, or P2 findings remain. The diff does not modify Worker routes, D1 schema, migrations, dependencies, secrets, or production configuration.

### Missing Tests and Residual Risk

- Existing TEST-001–020 pass, but there is no automated React integration test asserting dashboard role visibility and API rendering.
- In-app browser automation was unavailable in this session, so visual role-switch and responsive UAT is not claimed.
- API-018 returns a subset of the full metrics envisioned by REQ-020/021; CR-006 intentionally renders only existing response fields.

### Regression and Security Review

- PELAPOR and TEKNISI fail the frontend `canViewDashboard` guard before an API request is made.
- ADMIN and MANAJER reuse the existing authenticated request helper and Worker authorization boundary.
- Dashboard loading/error state is isolated from the report list, and stale dashboard data is cleared for unauthorized roles.
- No data mutation, migration, destructive operation, or compatibility break is introduced.

### Verification

| Gate | Result |
|---|---|
| `npm test` | Pass: 20/20 |
| `npm run lint` | Pass: 0 errors; 2 generated Cloudflare warnings |
| `npm run build` | Pass: Worker and client bundles |
| `git diff --check` | Pass |

### Decision

**Approve with notes.** CR-006/ISSUE-011 is safe to commit and push to `main`. Route next to Step 12–14 before promoting a new release baseline or deploying production. REL-001 remains the active deployed baseline.

### Step 13 Follow-up Review

After Step 12 identified the missing automated dashboard coverage, Step 13 extracted pure dashboard helpers into `src/dashboard.ts` and added `tests/dashboard.test.ts`.

| Check | Result |
|---|---|
| Scope | No API, database, migration, dependency, secret, or production config change |
| Behavior | App still renders the same dashboard fields; helper centralizes role guard and numeric fallbacks |
| Regression | `npm.cmd test` passes 26/26; lint/build pass with the same generated Wrangler log warning |

Decision remains **approved with notes** for CR-006, now with automated coverage for the previously noted dashboard visibility/metric gap.
