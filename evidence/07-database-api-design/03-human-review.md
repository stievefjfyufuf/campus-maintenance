# Evidence 03 — Human Review

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 07 - Database & API Design |
| Tipe | Human review record |
| Status | **Disetujui setelah koreksi CR-005** |
| Tanggal dibuat | 1 Juli 2026 |
| Reviewer | Stieve - Project owner/stakeholder proxy |
| Artifact yang direview | `docs/software-engineering/07-database-api-design.md` |

---

## Review Checklist (Diisi oleh Human Reviewer)

Reviewer diharapkan mengisi kolom Status pada setiap item setelah membaca artifact.

| No | Item Review | Status | Catatan Reviewer |
|---|---|---|---|
| 1 | Entitas database (`DATA-001` - `DATA-008`) mencakup seluruh kebutuhan data | — | |
| 2 | Relasi ERD dan foreign keys didefinisikan dengan benar | — | |
| 3 | SQLite/D1 data types dan constraints (CHECK, UNIQUE, NOT NULL) tepat | — | |
| 4 | Kategori dan lokasi dipisah dari laporan (bukan hardcoded string bebas) | — | |
| 5 | Satu teknisi aktif per laporan dijamin lewat skema assignments | — | |
| 6 | Tabel audit_events immutable dan mencatat event yang relevan | — | |
| 7 | Endpoints (`API-001` - `API-022`) mencakup seluruh fungsionalitas lifecycle | — | |
| 8 | Parameter request payload dan validasi input didefinisikan | — | |
| 9 | Respon error HTTP (`400`, `401`, `403`, `404`, `409`, `422`, `500`) dipetakan | — | |
| 10 | Security: Catatan internal (`type = INTERNAL`) disaring di level query | — | |
| 11 | SLA target waktu (`due_time`) melompati akhir pekan (Senin-Jumat) | — | |
| 12 | Seed data menyertakan minimal 4 user dummy dengan role berbeda | — | |
| 13 | Traceability ke REQ, NFR, dan AC tercantum di setiap item | — | |
| 14 | Tidak ada kode implementasi fungsional (fokus murni pada rancangan kontrak) | — | |

---

## Pertanyaan Review untuk Stieve

Reviewer diharapkan meninjau poin-poin berikut sebelum memberikan approval:

1. Apakah ada entitas atau data tambahan yang ingin disimpan di luar 8 tabel di atas? (Semua data file upload dan notifikasi email tetap berada di luar cakupan baseline).
2. Apakah format ID laporan `REP-YYYYMMDD-XXXX` (Sequential per hari) atau UUID acak yang lebih Anda sukai untuk demonstrasi? (Draft menggunakan referensi format `REP-YYYYMMDD-XXXX`).

---

## Instruksi untuk Reviewer

1. Baca [`docs/software-engineering/07-database-api-design.md`](file:///C:/Users/Stieven Londok/.gemini/antigravity/scratch/campus-maintenance/docs/software-engineering/07-database-api-design.md) secara lengkap.
2. Isi kolom Status pada tabel checklist (`✓ Setuju`, `✗ Perlu perubahan`, atau `? Pertanyaan`).
3. Jawab pertanyaan review di atas.
4. Berikan pernyataan eksplisit: **"Saya setujui Step 7"** atau **"Perlu revisi: [deskripsi]"**.

---

## Review Decision

| Field | Nilai |
|---|---|
| Status | Approved |
| Approved by | Stieve — Project owner/stakeholder proxy |
| Approval date | 1 Juli 2026 |
| Approval statement | “ok langsung aja anda eksekusi saja kalau saya setuju semua” |

Approval mencakup koreksi status, HTTP 201, penomoran API, dan constraint satu assignment aktif melalui CR-005. Step 8 dapat dimulai.
