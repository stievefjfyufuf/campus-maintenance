---
name: 13-se-automated-testing
description: Menambahkan atau memperbarui unit/integration tests dan mencatat hasil eksekusi test.
---

# Automated Testing

## Purpose

Gunakan skill ini untuk menutup planned tests dengan automated coverage yang deterministik.

## Required Inputs

- `docs/software-engineering/10-implementation.md`
- `docs/software-engineering/12-test-planning.md`
- Existing test framework dan package scripts.

## Workflow

1. Ikuti test framework dan style repo.
2. Prioritaskan scenario berisiko tinggi dan acceptance criteria utama.
3. Gunakan fixture lokal/stabil.
4. Jalankan focused test lalu suite lebih luas.
5. Catat command, result, failure, fix, dan coverage gap.

## Output

Simpan automated testing notes ke `docs/software-engineering/13-automated-testing.md`.

## Handoff

Jika tests pass, lanjut ke Step 14 acceptance testing. Jika gagal karena bug, kembali ke Step 10.
