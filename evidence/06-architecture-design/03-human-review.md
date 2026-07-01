# Evidence 03 — Human Review

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 06 - Architecture Design |
| Tipe | Human review record |
| Status | **Menunggu review — BELUM DISETUJUI** |
| Tanggal dibuat | 1 Juli 2026 |
| Reviewer | Stieve - Project owner/stakeholder proxy |
| Artifact yang direview | `docs/software-engineering/06-architecture-design.md` |

---

## Review Checklist (Diisi oleh Human Reviewer)

Reviewer diharapkan mengisi kolom Status pada setiap item setelah membaca artifact.

| No | Item Review | Status | Catatan Reviewer |
|---|---|---|---|
| 1 | Architecture style (Modular Monolith) sesuai constraint proyek | — | |
| 2 | Komponen COMP-001 hingga COMP-007 tepat dan tidak tumpang tindih | — | |
| 3 | Sub-modul MOD-* menggambarkan domain bisnis yang benar | — | |
| 4 | Data flow happy path (SUBMITTED→CLOSED) akurat | — | |
| 5 | Dashboard data flow sesuai REQ-020/REQ-021 | — | |
| 6 | Comment flow memisahkan public/internal dengan benar (BR-013) | — | |
| 7 | Authorization matrix sesuai keputusan stakeholder (BR-003, DEC-021) | — | |
| 8 | Role Selector sebagai demo mechanism sudah tepat (DEC-002, REQ-022) | — | |
| 9 | Deployment shape sesuai Cloudflare free tier (CONSTRAINT-002) | — | |
| 10 | ADR-001 hingga ADR-006 mencerminkan keputusan yang diinginkan | — | |
| 11 | Security boundaries cukup untuk baseline | — | |
| 12 | ARCH-RISK-001 hingga ARCH-RISK-006 diakui | — | |
| 13 | Handoff notes ke Step 7 lengkap | — | |
| 14 | Tidak ada keputusan database/API/UI detail yang belum waktunya | — | |
| 15 | Traceability ke REQ/NFR/BR/GOAL/DEC ada di seluruh dokumen | — | |

---

## Pertanyaan Review untuk Stieve

Reviewer diharapkan menjawab pertanyaan berikut sebelum memberikan approval:

### Q-ARCH-001 — Router Strategy
AI memilih REST JSON API dan menyebut "manual routing atau Itty Router." Apakah Anda ingin:
- **A)** Menggunakan URL API bawaan Worker tanpa dependency tambahan, atau
- **B)** Menambahkan Itty Router sebagai dependency ringan untuk kemudahan routing?

Pilihan ini memengaruhi Step 7 (API design convention) dan implementasi awal Worker.

### Q-ARCH-002 — COMP-006 Migration Runner
Untuk menjalankan D1 migrations, apakah:
- **A)** Dijalankan manual oleh developer dengan `wrangler d1 migrations apply`, atau
- **B)** Otomatis dipicu oleh CI/CD pipeline (GitHub Actions) pada setiap deploy?

Pilihan ini memengaruhi CONSTRAINT-007 (GitHub workflow) dan Step 15 (Deployment).

### Q-ARCH-003 — Test Framework
Architecture menyebut "build/lint/test otomatis" (NFR-009). Framework mana yang akan digunakan?
- **A)** Vitest (sudah kompatibel dengan Vite ecosystem)
- **B)** Jest
- **C)** Keputusan ditunda ke Step 12 (Test Planning)

### Q-ARCH-004 — Worker Routing Library
Apakah ada preferensi untuk routing library di Worker (misalnya Hono, Itty Router, atau vanilla URL parsing), atau Anda serahkan ke tim?

### Q-ARCH-005 — Architecture Risks Prioritization
Di antara ARCH-RISK-001 hingga ARCH-RISK-006, adakah risk yang perlu mendapat prioritas mitigasi khusus sebelum Step 7 dimulai?

---

## Instruksi untuk Reviewer

1. Baca `docs/software-engineering/06-architecture-design.md` secara lengkap.
2. Isi kolom Status pada tabel checklist (`✓ Setuju`, `✗ Perlu perubahan`, atau `? Pertanyaan`).
3. Jawab pertanyaan Q-ARCH-001 hingga Q-ARCH-005 di atas.
4. Berikan pernyataan eksplisit: **"Saya setujui Step 6"** atau **"Perlu revisi: [deskripsi]"**.

---

## Review Decision

| Field | Nilai |
|---|---|
| Status | Menunggu review |
| Approved by | — |
| Approval date | — |
| Approval statement | — |

**PENTING:** Dokumen ini tidak dapat dianggap disetujui sebelum reviewer memberikan pernyataan eksplisit. Step 7 (Database & API Design) tidak boleh dimulai sebelum approval diberikan dan dicatat di sini.
