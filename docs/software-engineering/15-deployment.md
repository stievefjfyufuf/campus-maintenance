# Deployment Plan

## REL-001 Historical Baseline

REL-001 deployed CR-005 / ISSUE-001–010 on 1 July 2026 to:

`https://campus-maintenance.stievefjfyufuf.workers.dev`

Cloudflare Worker version: `edd9317a-8018-4b2c-abf7-e81711455df6`.

## Release Scope

REL-002 deploys CR-006 / ISSUE-011:

- Expose D1-backed dashboard metrics in the React UI for `ADMIN` and `MANAJER`.
- Keep dashboard hidden for `PELAPOR` and `TEKNISI`.
- Add automated dashboard regression coverage TEST-021–026.
- Preserve REL-001 API, D1 schema, migrations, dependencies, and production binding.

Traceability: `CR-006`, `ISSUE-011`, `REQ-020`, `REQ-024`, `AC-039`, `AC-040`, `AC-047`, `AC-048`, `UI-001`, `UI-005`, `TEST-021–026`, `UAT-007–012`.

## Pre-Deployment Checklist

- [x] Build ready: `npm.cmd run build` passed.
- [x] Tests passed: `npm.cmd test` passed 2 files, 26/26 tests.
- [x] Lint passed: `npm.cmd run lint` passed with 0 errors and 2 generated Cloudflare type warnings.
- [x] Acceptance passed: UAT-007–012 accepted.
- [x] Environment configured: existing Cloudflare Worker and D1 binding `campus-maintenance`.
- [x] Migration reviewed: no database migration required.
- [x] Rollback reviewed: revert Worker to REL-001 version if smoke test fails.

## Deployment Steps

1. Run `npm.cmd run deploy`.
2. Confirm Wrangler uses redirected deploy config from `wrangler.jsonc`.
3. Upload changed client assets.
4. Deploy Worker to `campus-maintenance.stievefjfyufuf.workers.dev`.
5. Run production smoke tests for page, health, users, and dashboard API.

## Smoke Tests

| Check | Result |
|---|---|
| Public page | HTTP 200 |
| `GET /api/health` | HTTP 200, `{ "ok": true }` |
| `GET /api/users` | HTTP 200, seeded roles include `ADMIN` |
| `GET /api/dashboard` as `usr-admin` / `ADMIN` | HTTP 200, response contains `totals` |
| D1 binding | Active: `env.DB (campus-maintenance)` |

## Rollback Plan

If a production smoke test or early user verification fails:

1. Roll back Cloudflare Worker to REL-001 version `edd9317a-8018-4b2c-abf7-e81711455df6`.
2. Keep D1 data intact because REL-002 has no migration or data rewrite.
3. Record the defect through Step 16 as a new CR before reattempting deployment.

## Release Notes

REL-002 adds the dashboard panel to the deployed React app for admin/manager roles. The release is frontend-focused and compatible with the existing REL-001 Worker API and D1 schema.

## Post-Deployment Result

REL-002 deployed successfully on 2 July 2026.

- URL: `https://campus-maintenance.stievefjfyufuf.workers.dev`
- Cloudflare Worker version: `fb4c4545-7f09-4560-bca4-fe2598780926`
- Assets uploaded: 3 changed static assets, 2 already uploaded.
- Worker startup time: 7 ms.
- Production smoke tests: pass.

## New Baseline

REL-002 is the active deployed baseline for CR-006 / ISSUE-011. REL-001 remains the rollback baseline. Production feedback or defects route through Step 16 change control.
