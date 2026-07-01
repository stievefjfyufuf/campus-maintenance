---
name: campus-maintenance-prioritization
description: Prioritize approved Campus Maintenance requirements, define MVP and release boundaries, resolve scope conflicts, and preserve traceability for validation.
---

# Campus Maintenance Prioritization

## Purpose

Gunakan skill ini untuk memprioritaskan requirement Campus Maintenance tanpa mengubah requirement baseline secara diam-diam.

## Required Inputs

1. Baca `docs/software-engineering/01-inception.md`.
2. Baca `docs/software-engineering/03-specification.md`.
3. Pertahankan semua ID `REQ`, `NFR`, `BR`, `AC`, `GOAL`, dan pertanyaan terbuka.

Jika artefak upstream tidak tersedia atau belum disetujui, hentikan prioritization dan minta input yang valid.

## Workflow

1. Nilai setiap `REQ` dan `NFR` berdasarkan value, risk reduction, urgency, compliance, effort, dan dependency.
2. Tetapkan MoSCoW dengan rationale; angka tidak boleh menjadi satu-satunya alasan.
3. Definisikan MVP end-to-end, Baseline+, Could, dan Won't.
4. Buat urutan dependency yang mendahulukan data, access, integrity, dan audit sebelum fitur yang bergantung padanya.
5. Catat konflik stakeholder/scope serta pemilik keputusan.
6. Jangan memasukkan fitur out-of-scope tanpa change request.
7. Simpan hasil ke `docs/software-engineering/04-prioritization.md`.

## Required Output

- Scored priority matrix untuk seluruh `REQ` dan `NFR`.
- MoSCoW dan release boundary.
- MVP scope dan exit criteria.
- Dependency/delivery sequence.
- Prioritization decision register.
- Conflict log dan deferred/Won't list.
- Handoff ke Step 5.

## Quality Rules

- Semua priority memiliki rationale dan dependency.
- MVP harus mampu menjalankan alur laporan dari submit sampai close.
- Security, privacy, persistence, integrity, audit, dan deployment tidak boleh ditunda keluar MVP.
- Item provisional tetap ditautkan ke pertanyaan terbukanya.
- `Should` tidak berarti dibatalkan dari required baseline.
- Hasil harus siap divalidasi oleh `05-se-validation-change`.
