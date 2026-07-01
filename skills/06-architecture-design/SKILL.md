---
name: 06-se-architecture-design
description: Menentukan bagian utama aplikasi dan keputusan arsitektur sebelum database, API, dan UI dirancang.
---

# Architecture Design

## Purpose

Gunakan skill ini untuk mengubah requirements tervalidasi menjadi rancangan arsitektur sistem yang traceable.

## Required Inputs

- `docs/software-engineering/03-specification.md`
- `docs/software-engineering/05-validation-change.md`
- Constraints deployment, NFR, stakeholder goals, dan validated decisions.

## Workflow

1. Baca requirements yang sudah `Ready`.
2. Tentukan architecture style dan deployment shape.
3. Pecah sistem menjadi component/module dengan tanggung jawab jelas.
4. Catat data flow, trust boundary, external dependency, dan risk.
5. Tulis ADR untuk keputusan penting.

## Output

Simpan artefak ke `docs/software-engineering/06-architecture-design.md`.

## Traceability

Gunakan dan pertahankan ID `REQ`, `NFR`, `AC`, `DEC`, `COMP`, dan `ADR`.

## Handoff

Kirim component map dan ADR ke Step 7 database/API design.
