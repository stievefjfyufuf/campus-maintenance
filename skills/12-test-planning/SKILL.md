---
name: 12-se-test-planning
description: Membuat strategi pengujian, scenario, coverage matrix, test data, dan regression checklist.
---

# Test Planning

## Purpose

Gunakan skill ini untuk memetakan acceptance criteria dan risiko menjadi test plan yang traceable.

## Required Inputs

- `docs/software-engineering/03-specification.md`
- `docs/software-engineering/09-issue-planning.md`
- `docs/software-engineering/10-implementation.md`
- `docs/software-engineering/11-code-review.md`

## Workflow

1. Map setiap AC ke scenario test.
2. Pisahkan unit, integration, API, UI/e2e, manual, security, performance, dan regression checks.
3. Tentukan test data, boundary case, dan negative case.
4. Prioritaskan permission, data integrity, dan critical flow.
5. Catat bagian yang belum bisa diotomasi.

## Output

Simpan test plan ke `docs/software-engineering/12-test-planning.md`.

## Handoff

Kirim `TEST-###` plan ke Step 13 automated testing.
