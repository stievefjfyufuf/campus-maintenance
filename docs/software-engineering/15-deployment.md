# Deployment

## Release Scope

REL-001 includes CR-005, ISSUE-001–010, REQ-001–024, TEST-001–020, and UAT-001–006.

## Pre-Deployment Checklist

- [x] Dependencies install with zero vulnerabilities.
- [x] Lint passes with no errors.
- [x] Production build passes.
- [x] Twenty automated tests pass.
- [x] Local D1 migration and seed pass.
- [x] Local browser UAT passes.
- [x] Remote D1 created in APAC and production binding configured.
- [x] Remote migration and seed completed (9 tables, 42 rows written).
- [x] Public URL and production smoke test completed.

## Deployment Steps

Create the remote D1 database, replace the placeholder ID in `wrangler.jsonc`, apply migrations and seed with `--remote`, run `wrangler deploy`, then verify `/api/health`, role selector, report creation, and lifecycle actions.

## Rollback Plan

If a smoke test fails, roll back the Worker to the previous deployment. For this first additive migration, retain D1 data and deploy the corrected Worker; restore from D1 backup/export only if data integrity is affected.

## Smoke Tests

| Check | Result |
|---|---|
| Public page | HTTP 200, HTML served |
| `GET /api/health` | HTTP 200, `{ "ok": true }` |
| `GET /api/users` | HTTP 200, four seeded roles returned from production D1 |
| D1 binding | Active: `campus-maintenance`, APAC |

## Current Result

REL-001 deployed successfully on 1 July 2026.

- URL: `https://campus-maintenance.stievefjfyufuf.workers.dev`
- Cloudflare Worker version: `edd9317a-8018-4b2c-abf7-e81711455df6`
- Assets: five static assets published.
- Database: remote migration and seed completed; production API reads D1 successfully.

## New Baseline

REL-001 is the first deployed baseline for CR-005, ISSUE-001–010, REQ-001–024, TEST-001–020, and UAT-001–006. Production feedback or defects route through Step 16 change control.
