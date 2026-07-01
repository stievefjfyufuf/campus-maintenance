# Acceptance Testing

## Environment

Local Vite/Cloudflare Worker with local D1 migration and seed, tested 1 July 2026 through the in-app browser.

## UAT Checklist

- [x] UAT-001: Pelapor creates a valid report and sees it after reload (`SUBMITTED`).
- [x] UAT-002: Administrator changes it to `UNDER_REVIEW` and assigns the seeded technician.
- [x] UAT-003: Technician sees the assigned report, accepts it (`IN_PROGRESS`), and resolves it.
- [x] UAT-004: Reporter sees the resolved report and closes it (`CLOSED`).
- [x] UAT-005: Role selector changes visible data/actions according to permissions.
- [x] UAT-006: Empty, loading, success, and role-filtered states render correctly.

## Defects

The initial run exposed FINDING-001 (`form.reset()` after asynchronous event handling). It was fixed and the complete flow was repeated successfully.

## Decision

Accepted for deployment. UAT-001–006 pass; no open blocking defect.
