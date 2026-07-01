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
- [ ] Public URL and smoke test completed after `workers.dev` onboarding.

## Deployment Steps

Create the remote D1 database, replace the placeholder ID in `wrangler.jsonc`, apply migrations and seed with `--remote`, run `wrangler deploy`, then verify `/api/health`, role selector, report creation, and lifecycle actions.

## Rollback Plan

If a smoke test fails, roll back the Worker to the previous deployment. For this first additive migration, retain D1 data and deploy the corrected Worker; restore from D1 backup/export only if data integrity is affected.

## Current Result

The Worker and five static assets uploaded successfully and the production D1 binding is active. Publishing is blocked only because this Cloudflare account has not registered a `workers.dev` subdomain. Complete the one-time onboarding at `https://dash.cloudflare.com/a914bb189a597cbfa263e2812c2a8b27/workers/onboarding`, rerun `npm run deploy`, then record the URL and smoke result. REL-001 is not marked fully deployed until that public check passes.
