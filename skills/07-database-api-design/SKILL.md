---
name: 07-se-database-api-design
description: Membuat rancangan tabel database, relasi, constraint, migration notes, dan endpoint API.
---

# Database and API Design

## Purpose

Gunakan skill ini untuk merancang schema D1 dan kontrak API yang mendukung requirements dan arsitektur.

## Required Inputs

- `docs/software-engineering/03-specification.md`
- `docs/software-engineering/05-validation-change.md`
- `docs/software-engineering/06-architecture-design.md`

## Workflow

1. Identifikasi entity, relationship, status, dan audit data.
2. Definisikan table, primary key, foreign key, constraint, index, dan retention note.
3. Rancang endpoint berdasarkan user flow, bukan hanya tabel.
4. Catat request, response, validation, authorization, dan error behavior.
5. Hubungkan schema/API dengan REQ, AC, DATA, API, dan ADR.

## Output

Simpan artefak ke `docs/software-engineering/07-database-api-design.md`.

## Handoff

Kirim ERD dan API contract ke Step 8 UI design dan Step 9 issue planning.
