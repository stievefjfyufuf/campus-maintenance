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
