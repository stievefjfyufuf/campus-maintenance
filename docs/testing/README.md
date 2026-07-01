# Testing Documentation Index

Folder ini adalah index testing. Catatan test lengkap tetap berada di workflow utama agar traceability Step 12–14 tidak terpecah.

| Area | Source of truth | Current evidence |
|---|---|---|
| Test planning | [`../software-engineering/12-test-planning.md`](../software-engineering/12-test-planning.md) | TEST-001–026 mapped to REQ/AC/ISSUE |
| Automated testing | [`../software-engineering/13-automated-testing.md`](../software-engineering/13-automated-testing.md) | `npm.cmd test` passes 26/26 tests |
| Acceptance testing | [`../software-engineering/14-acceptance-testing.md`](../software-engineering/14-acceptance-testing.md) | UAT-001–012 accepted |
| Test source | [`../../tests/domain.test.ts`](../../tests/domain.test.ts), [`../../tests/dashboard.test.ts`](../../tests/dashboard.test.ts) | Domain and dashboard regression tests |

## Current Gates

- `npm.cmd test`
- `npm.cmd run lint`
- `npm.cmd run build`

REL-002 release evidence is recorded in Step 15 deployment notes.
