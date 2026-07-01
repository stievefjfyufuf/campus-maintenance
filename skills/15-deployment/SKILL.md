---
name: 15-se-deployment
description: Menyiapkan release, menjalankan deployment, smoke test, rollback plan, dan baseline marker.
---

# Deployment

## Purpose

Gunakan skill ini untuk mempublikasikan release yang sudah lolos test dan acceptance gates.

## Required Inputs

- `docs/software-engineering/09-issue-planning.md`
- `docs/software-engineering/13-automated-testing.md`
- `docs/software-engineering/14-acceptance-testing.md`
- Environment config, migration plan, rollback constraints, dan release scope.

## Workflow

1. Verifikasi build, tests, acceptance, env, secrets, dan migration readiness.
2. Tulis deployment order dan release notes.
3. Jalankan deployment hanya setelah target environment dan rollback jelas.
4. Jalankan smoke tests post-deploy.
5. Tandai `REL-###` sebagai baseline baru jika sukses.

## Output

Simpan deployment record ke `docs/software-engineering/15-deployment.md`.

## Handoff

Production defect atau feedback setelah deployment harus masuk Step 16 change control.
