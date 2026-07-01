# Evidence 02 — AI Initial Output

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 07 - Database & API Design |
| Tipe | AI initial output record |
| Tanggal | 1 Juli 2026 |
| Model | Gemini 3.5 Flash (Medium) |
| Conversation ID | 7485d701-fb37-4843-be92-17daa7118683 |

## Output Summary

AI menghasilkan skema database relasional dan API contract lengkap pada file `docs/software-engineering/07-database-api-design.md` dengan detail berikut:

1. **8 Tabel Relasional (`DATA-001` s/d `DATA-008`)**:
   - `users` (Demo users & roles)
   - `categories` (Soft delete categories)
   - `locations` (Main campus buildings)
   - `reports` (Primary table for requests and target due times)
   - `assignments` (Technician tasks, max 1 active per report)
   - `progress_updates` (Updates added by active technician)
   - `comments` (Supports separation of PUBLIC comments and INTERNAL notes)
   - `audit_events` (Immutable records of all changes)

2. **22 REST Endpoints (`API-001` s/d `API-022`)**:
   - Dibuat berdasarkan *use case* pengguna dari `docs/software-engineering/03-specification.md`.
   - Meliputi alur pembuatan laporan, triage (kategori/prioritas), assignment & reassignment, pengerjaan teknisi (accept, progress, resolve), konfirmasi (close pelapor, manual close admin), pengajuan & keputusan reopen, penulisan komentar/catatan internal, serta dashboard statistika manajer.

3. **5 Aturan Validasi (`V-001` s/d `V-005`)**:
   - Memastikan panjang string, foreign key, role check (misal: assignment hanya untuk role `TEKNISI`), dan datetime masa depan divalidasi sebelum disimpan.

4. **Error Handling**:
   - Skema mapping standar kode HTTP: `400`, `401`, `403` (unauthorized access to other's reports / internal comments), `404`, `409`, `422`, dan `500`.

5. **D1 Migrations & Seeds**:
   - SQL DDL lengkap dengan index penunjang performa (NFR-001, NFR-002) dan constraint `CHECK`/`FOREIGN KEY`.

6. **Security & Data Notes**:
   - Konsep middleware filtering data komentar agar catatan internal tidak bocor ke pelapor (BR-013, NFR-003).
   - Logika kalkulasi target waktu kerja (`due_time`) melompati akhir pekan (Senin-Jumat) sesuai baseline akademik (REQ-023, DEC-019).

## Traceability Coverage

Semua entitas `DATA-###` dan endpoint `API-###` terhubung ke minimal satu ID dari `REQ`, `NFR`, `BR`, atau `AC`.
Tidak ada field data pribadi asli atau credential rahasia yang dimasukkan (NFR-004).

## Status

Dokumen ini merepresentasikan rancangan awal AI. **Persetujuan (Human Review) Stieve diperlukan** sebelum desain ini sah menjadi baseline.
