# Deployment Documentation Index

Folder ini adalah index release/deployment untuk reviewer. Deployment record lengkap tetap berada di Step 15.

| Release | Source of truth | Status |
|---|---|---|
| REL-001 | [`../software-engineering/15-deployment.md`](../software-engineering/15-deployment.md) | Historical MVP baseline |
| REL-002 | [`../software-engineering/15-deployment.md`](../software-engineering/15-deployment.md) | Active deployed baseline |

## Production

- URL: <https://campus-maintenance.stievefjfyufuf.workers.dev>
- Runtime: Cloudflare Workers
- Database: Cloudflare D1 binding `env.DB (campus-maintenance)`
- Active release: REL-002

## Operational Notes

- Rollback baseline: REL-001 Worker version `edd9317a-8018-4b2c-abf7-e81711455df6`.
- REL-002 Worker version: `fb4c4545-7f09-4560-bca4-fe2598780926`.
- Production feedback or defects must route through Step 16 change control.
