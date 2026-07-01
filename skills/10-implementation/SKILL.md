---
name: 10-se-implementation
description: Mengerjakan issue terpilih menjadi perubahan code yang terkontrol dan traceable.
---

# Implementation

## Purpose

Gunakan skill ini untuk mengimplementasikan satu issue atau approved change scope tanpa melebar dari batas yang disetujui.

## Required Inputs

- `docs/software-engineering/09-issue-planning.md`
- Artefak design yang dirujuk issue: Step 6, 7, dan/atau 8.
- Source code, tests, dan package scripts.

## Workflow

1. Baca issue dan design boundary.
2. Inspeksi repo dan pattern lokal sebelum coding.
3. Implementasikan perubahan terkecil yang memenuhi acceptance criteria.
4. Catat file berubah, alasan teknis, migration/config impact, dan verification.
5. Jalankan test/lint/build sesuai risiko.

## Output

Simpan implementation notes ke `docs/software-engineering/10-implementation.md`.

## Handoff

Kirim diff dan verification evidence ke Step 11 code review.
