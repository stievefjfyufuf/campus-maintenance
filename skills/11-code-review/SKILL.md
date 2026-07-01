---
name: 11-se-code-review
description: Memeriksa diff, test, security, risiko regresi, dan kesesuaian scope sebelum testing lebih luas.
---

# Code Review

## Purpose

Gunakan skill ini untuk menilai apakah implementasi aman dilanjutkan ke test planning.

## Required Inputs

- `docs/software-engineering/09-issue-planning.md`
- `docs/software-engineering/10-implementation.md`
- Diff aktual, changed files, tests, dan acceptance checklist.

## Workflow

1. Bandingkan diff dengan issue scope.
2. Prioritaskan bug, security risk, data loss, authorization issue, dan regression.
3. Catat finding dengan severity dan file/area.
4. Pastikan coverage test/manual verification cukup.
5. Putuskan approve, request changes, atau block.

## Output

Simpan review ke `docs/software-engineering/11-code-review.md`.

## Handoff

Jika approve, lanjut ke Step 12 test planning. Jika gagal, kembali ke Step 10.
