---
name: 14-se-acceptance-testing
description: Memvalidasi user flow lengkap terhadap acceptance criteria sebelum deployment.
---

# Acceptance Testing

## Purpose

Gunakan skill ini untuk memastikan hasil implementasi diterima dari perspektif pengguna/stakeholder.

## Required Inputs

- `docs/software-engineering/03-specification.md`
- `docs/software-engineering/08-ui-design.md`
- `docs/software-engineering/12-test-planning.md`
- `docs/software-engineering/13-automated-testing.md`

## Workflow

1. Ubah AC menjadi checklist `UAT-###`.
2. Jalankan happy path, edge case penting, dan permission case.
3. Catat environment, role, data, command/browser evidence, defect, dan feedback.
4. Putuskan accepted, accepted with notes, rejected, atau blocked.

## Output

Simpan acceptance testing record ke `docs/software-engineering/14-acceptance-testing.md`.

## Handoff

Jika accepted, lanjut ke Step 15 deployment. Jika rejected, route defect ke step terdampak.
