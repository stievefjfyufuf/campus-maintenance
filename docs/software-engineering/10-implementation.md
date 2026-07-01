# Implementation Notes

## Issues

ISSUE-001 through ISSUE-010 under CR-005, linked to REQ-001–024, AC-001–048, DATA-001–008, API-001–022, and UI-001–005.

## Files Changed

| Area | Files | Reason |
|---|---|---|
| Database | `database/migrations/0001_initial_schema.sql`, `database/seed.sql` | D1 schema, one-active-assignment constraint, master/demo data |
| API | `worker/index.ts`, `worker/domain.ts` | Hono routes, role validation, workflow, audit, dashboard |
| UI | `src/App.tsx`, `src/App.css` | Responsive role-based report workflow |
| Config | `wrangler.jsonc`, `package.json` | D1 binding, Hono, Vitest, test command |
| Tests | `tests/domain.test.ts` | 20 deterministic domain tests |

## Behavior Implemented

Create/list/filter/detail reports, role-scoped visibility, review, triage, assignment, acceptance, resolution, closure, comments with internal filtering, history, dashboard metrics, D1 persistence, seed role switching, validation, audit events, and business-day due dates.

## Migration and Compatibility

The initial migration is additive and intended for a new D1 database. Production requires replacing the placeholder database ID after `wrangler d1 create`. Optional features and production authentication remain out of scope.

## Verification

Run `npm test`, `npm run lint`, `npm run build`, local D1 migrations/seed, then browser/API UAT. Deployment follows only after these gates pass.

---

## CR-006 Increment — ISSUE-011

### Issue and Boundary

`ISSUE-011` exposes the existing D1-backed dashboard to authorized React users. Traceability: `CR-006`, `REQ-020`, `REQ-024`, `AC-039`, `AC-040`, `AC-047`, `API-018`, `UI-001`, and `UI-005`.

In scope: frontend dashboard rendering and Step 8–10 records. Out of scope: Worker/API behavior, database/migrations, new metrics or filters, authentication, deployment, and promotion of REL-001.

### Files Changed

| File | Reason |
|---|---|
| `src/App.tsx` | Fetch API-018 only for ADMIN/MANAJER; render metrics, status distribution, loading/error/empty/retry states; refresh after lifecycle action |
| `src/App.css` | Add responsive dashboard cards, status summary, and retry/error styling |
| `docs/software-engineering/08-ui-design.md` | Complete screens, flows, forms, states, permissions, accessibility, wireframes, and traceability |
| `docs/software-engineering/09-issue-planning.md` | Preserve REL-001 history and define developer-ready ISSUE-011 plus controlled backlog |
| `docs/software-engineering/16-change-request.md` | Register CR-006 without modifying prior CR history |
| `docs/software-engineering/changes/CR-006.md` | Record impact, approved scope, gate, verification, compatibility, and routing |

### Approach and Behavior Implemented

- Reuse the existing authenticated request helper and `GET /api/dashboard`; no contract or dependency change.
- Maintain dashboard state separately from report-list state so a dashboard failure does not remove reports.
- Clear dashboard data immediately when switching to PELAPOR or TEKNISI.
- Display total, active, in-progress, closed, overdue, and per-status counts with safe zero fallbacks.
- Refetch dashboard data after authorized role changes and lifecycle mutations.
- Keep all metrics text-labelled and responsive without introducing a chart library.

### Migration and Config Changes

None. The change is backward compatible with REL-001 API-018 and D1 schema.

### Verification

| Command | Result |
|---|---|
| `npm test` | Pass: 1 file, 20/20 tests |
| `npm run lint` | Pass: 0 errors; generated Cloudflare warnings only |
| `npm run build` | Pass: Worker and client production bundles; Wrangler could not write its optional log outside the sandbox |

Manual browser UAT remains a Step 14 gate before any release or deployment. A clean `npm ci` also exposed a pre-existing package-lock peer-dependency mismatch; CR-006 did not modify dependencies or the lock file.

### Risks and Handoff

- API-018 currently exposes a subset of the richer metrics described in REQ-020/021; the UI intentionally displays only returned data.
- No automated React integration test is added because Step 13 is outside the requested three-skill route; existing regression gates remain mandatory.
- Handoff: send the CR-006 diff and verification result to `11-se-code-review`. REL-001 remains unchanged.

### Step 13 Test-Support Follow-up

Step 13 extracted dashboard role and metric derivation into `src/dashboard.ts` and added `tests/dashboard.test.ts` so ISSUE-011 has deterministic automated coverage without adding browser/test dependencies. `src/App.tsx` now consumes the helper while preserving the same rendered dashboard behavior.

Latest automated result: `npm.cmd test` passes 2 files, 26/26 tests.
# CR-008 Repository Maintenance Addendum

CR-008 made no runtime implementation change. Obsolete `.gitkeep` placeholders were removed after verifying each directory had a real artifact, and reviewer guidance was added under `tests/unit`, `tests/integration`, and `tests/acceptance`. Frontend, Worker API, D1 schema, dependencies, and Cloudflare configuration remain unchanged.
