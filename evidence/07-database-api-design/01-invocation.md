# Evidence 01 — Invocation

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 07 - Database & API Design |
| Tipe | Skill invocation record |
| Tanggal | 1 Juli 2026 |
| Skill | `07-se-database-api-design` |
| Agent | Antigravity (Google DeepMind) |
| Conversation ID | 7485d701-fb37-4843-be92-17daa7118683 |

## Trigger

Pengguna meminta perjalan ke Step 7:
> "ok lanjut ke step 7 menggunakan skill diatas"

Dengan skill `07-se-database-api-design` diaktifkan dan dibaca petunjuknya.

## Inputs Used

| Input | Source | Status |
|---|---|---|
| `docs/software-engineering/03-specification.md` | Repository | Read |
| `docs/software-engineering/05-validation-change.md` | Repository | Read |
| `docs/software-engineering/06-architecture-design.md` | Repository (Approved) | Read |
| Skill `07-se-database-api-design/SKILL.md` | Global skill config | Read |
| Skill `07-se-database-api-design/references/skill-docs.md` | Global skill config | Read |

## Readiness Check

Upstream baseline:
- Step 3 (Specification): Approved.
- Step 5 (Validation): Approved.
- Step 6 (Architecture Design): Approved (Modular Monolith, Cloudflare D1, Hono, Vitest).

Seluruh input siap digunakan sebagai basis desain skema database relasional D1 dan kontrak endpoint API.

## Skill Procedure Followed

1. Entitas diidentifikasi dari kata benda domain dan alur kerja (bukan hanya kebutuhan screen). ✓
2. Tabel, primary keys, foreign keys, constraints, dan tipe data SQLite didefinisikan. ✓
3. Struktur dinormalisasi untuk menjaga integritas data. ✓
4. Endpoint API dirancang berbasis use case nyata (laporan, progres, komentar, dashboard), bukan CRUD datar. ✓
5. Otorisasi (role selector), validasi request, respons sukses/gagal, dan idempotensi didokumentasikan. ✓
6. Strategi migrasi D1 dan data seed dirancang. ✓
7. Hubungan penelusuran (traceability) menggunakan `DATA-###` dan `API-###` yang terhubung ke `REQ`, `NFR`, atau `AC` dipelihara. ✓

## Output Target

- `docs/software-engineering/07-database-api-design.md` — artifact utama
- `evidence/07-database-api-design/01-invocation.md` — dokumen ini
- `evidence/07-database-api-design/02-ai-output.md` — output awal skema & kontrak
- `evidence/07-database-api-design/03-human-review.md` — lembar review dan persetujuan
