# Architecture Design

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 06 - Architecture Design |
| Status | **Approved / Baseline** |
| Tanggal dibuat | 1 Juli 2026 |
| Human reviewer | Stieve - Project owner/stakeholder proxy |
| Upstream | `docs/software-engineering/03-specification.md`, `docs/software-engineering/05-validation-change.md` |
| Downstream | `docs/software-engineering/07-database-api-design.md` |
| Disetujui baseline | Step 1–5 commit `129b6fa` |

Dokumen ini telah disetujui oleh Stieve pada 1 Juli 2026 dan menjadi baseline resmi untuk tahap berikutnya.

---

# 1. Architecture Style

## Pilihan: Modular Monolith (Client-Server) di atas Cloudflare Stack

**Konteks:**
- Sistem dibangun oleh individu atau tim kecil (`CONSTRAINT-003`, `STK-007`).
- Deployment wajib ke Cloudflare Workers dan D1 dalam batas free tier (`CONSTRAINT-002`, `GOAL-009`, `GOAL-010`, `NFR-012`).
- Stack telah ditetapkan oleh repository: React (Vite) + Cloudflare Worker (TypeScript) + Cloudflare D1.
- Seluruh fitur MVP memiliki shared data model (laporan, status, audit) yang tidak memerlukan pemisahan service boundary saat ini (`REQ-001` – `REQ-024`).
- Microservices akan menambah deployment complexity tanpa manfaat scaling pada skala akademik demo.

**Keputusan:**
Gunakan **modular monolith** dengan dua executable boundary yang sudah ditetapkan platform:

| Boundary | Executable | Platform |
|---|---|---|
| Frontend SPA | React (Vite build) | Cloudflare Workers Static Assets |
| Backend API | Cloudflare Worker (TypeScript) | Cloudflare Workers Runtime |

Database: Cloudflare D1 (SQLite) diakses eksklusif dari Worker, tidak pernah dari browser langsung.

**Traceability:** `GOAL-011`, `NFR-009`, `NFR-012`, `CONSTRAINT-002/003`

---

# 2. Components

## Component Map

| ID | Component | Responsibility | Depends On | Owner/Boundary |
|---|---|---|---|---|
| COMP-001 | React SPA | Merender UI seluruh aktor; mengelola state lokal; memanggil Worker API via fetch | COMP-002 (via HTTP) | Frontend layer |
| COMP-002 | Cloudflare Worker (API) | Menangani HTTP request, validasi input, otorisasi role, orchestrasi business logic, dan menulis/membaca D1 | COMP-003, COMP-004, COMP-005 | Backend layer |
| COMP-003 | Role Context & Auth Module | Membaca header/cookie role selector; menetapkan konteks aktor untuk setiap request; menolak aksi yang tidak berwenang | COMP-004 (user data) | Backend — Security boundary |
| COMP-004 | D1 Data Access Layer | Mengabstraksi seluruh SQL query ke D1; menjamin transaksi atomik untuk state + audit event | Cloudflare D1 | Backend — Data boundary |
| COMP-005 | Business Logic Modules | Setiap modul mengelola satu domain: Report, Workflow, Assignment, Comment, Category, Dashboard | COMP-003, COMP-004 | Backend — Domain boundary |
| COMP-006 | Seed / Migration Runner | Menjalankan D1 migrations dan seed data (pengguna dummy, lokasi, kategori awal) | COMP-004 | Build/deploy tooling |
| COMP-007 | Vite Build & Deploy Pipeline | Menghasilkan static assets (HTML/JS/CSS), menjalankan TypeScript check, lint, dan test sebelum wrangler deploy | COMP-001 source | CI/CD boundary |

## Business Logic Sub-Modules (COMP-005)

| Sub-module | Domain | Key Responsibilities | Key REQ |
|---|---|---|---|
| MOD-Report | Laporan | Pembuatan, validasi field wajib, ID unik, status awal `SUBMITTED`, persistensi | REQ-001, REQ-002, REQ-024 |
| MOD-Workflow | Status & Transisi | Menerapkan transition matrix, memvalidasi authority per transisi, memicu audit event | REQ-005, REQ-010, REQ-012, REQ-013, REQ-015, REQ-016, REQ-017 |
| MOD-Assignment | Penugasan Teknisi | Mengelola satu teknisi aktif per laporan, validasi keahlian, reassignment dengan audit | REQ-008, REQ-009 |
| MOD-Comment | Komentar & Catatan | Menyimpan komentar publik dan catatan internal; memfilter berdasarkan role sebelum response | REQ-018 |
| MOD-Audit | History & Immutability | Menulis audit event untuk setiap state/category/priority/assignment/comment change; tidak ada update/delete path | REQ-019, NFR-010 |
| MOD-Category | Kategori | Mengelola lifecycle kategori: tambah, ubah, nonaktifkan (bukan hard delete) | REQ-007 |
| MOD-Dashboard | Metrik & Reporting | Menghitung metrik dashboard dari data D1 (jumlah, distribusi, avg completion, overdue, reopen, beban teknisi, tren) | REQ-020, REQ-021, REQ-023 |
| MOD-RoleSelector | Demo Auth | Mengelola role selector pengguna dummy; menyediakan user context untuk seluruh request | REQ-022, NFR-003 |

---

# 3. Data Flow

## 3.1 Happy Path — Laporan Dibuat sampai CLOSED

```
Pelapor (Browser)
  │  POST /api/reports  {judul, deskripsi, lokasi, kategori, prioritas, identitas}
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = PELAPOR
  ├─ COMP-005/MOD-Report: Validasi field wajib, generate ID unik
  └─ COMP-004: INSERT laporan (status=SUBMITTED) + INSERT audit event
       └─ D1 (atomic transaction)

Admin (Browser)
  │  PATCH /api/reports/:id/review
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = ADMIN
  ├─ COMP-005/MOD-Workflow: Cek transisi SUBMITTED→UNDER_REVIEW
  └─ COMP-004: UPDATE status + INSERT audit event

Admin (Browser)
  │  POST /api/reports/:id/assign  {technicianId}
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = ADMIN atau MANAJER
  ├─ COMP-005/MOD-Assignment: Validasi keahlian, satu teknisi aktif
  └─ COMP-004: UPDATE status=ASSIGNED, INSERT assignment record, INSERT audit event

Teknisi (Browser)
  │  PATCH /api/reports/:id/accept
  │  PATCH /api/reports/:id/progress  {catatan, tindakan, kendala, estimasi}
  │  PATCH /api/reports/:id/resolve   {ringkasan}
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = TEKNISI dan is assigned
  ├─ COMP-005/MOD-Workflow: Cek transisi IN_PROGRESS→RESOLVED
  └─ COMP-004: UPDATE status + INSERT audit event

Pelapor (Browser)
  │  PATCH /api/reports/:id/confirm  {decision: close|reopen, alasan}
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = PELAPOR dan owns report
  ├─ COMP-005/MOD-Workflow: Transisi RESOLVED→CLOSED atau REOPENED→UNDER_REVIEW
  └─ COMP-004: UPDATE status + INSERT audit event
```

## 3.2 Dashboard Data Flow

```
Manajer (Browser)
  │  GET /api/dashboard?status=...&kategori=...&periode=...
  ▼
COMP-002 Worker
  ├─ COMP-003: Validasi role = MANAJER atau ADMIN
  ├─ COMP-005/MOD-Dashboard: Compose SQL aggregates
  └─ COMP-004: SELECT COUNT, AVG, GROUP BY dari tabel reports + audit_events
       └─ D1
  ▼ JSON response dengan semua metrik REQ-020
COMP-001 React SPA: Render kartu dashboard
```

## 3.3 Comment & Internal Note Flow

```
Any authorized actor (Browser)
  │  POST /api/reports/:id/comments  {isi, type: public|internal}
  ▼
COMP-002 Worker
  ├─ COMP-003: Hanya ADMIN, TEKNISI, MANAJER boleh internal; PELAPOR hanya public
  ├─ COMP-005/MOD-Comment: Simpan komentar
  └─ COMP-004: INSERT comment record

GET /api/reports/:id  (Pelapor)
  ▼
COMP-002 Worker → COMP-005/MOD-Comment:
  Filter response: type=internal TIDAK disertakan jika role=PELAPOR   [BR-013, NFR-003]
```

---

# 4. External Integrations

| Integrasi | Tipe | Arah | Keterangan |
|---|---|---|---|
| Cloudflare D1 | Managed SQLite | Worker → D1 | Satu-satunya penyimpanan persisten; diakses melalui D1 binding di Worker runtime |
| Cloudflare Workers Runtime | Hosting platform | Deploy | Worker dan static assets berjalan di Cloudflare edge |
| GitHub (repository) | Source control | Push/PR | Branch, commit, PR, dan CI sesuai CONSTRAINT-007; tidak ada API runtime |
| Wrangler CLI | Build/deploy tool | Local → Cloudflare | Digunakan oleh CI/CD pipeline untuk deploy dan migration |

**Tidak ada** integrasi pihak ketiga lain yang aktif pada baseline ini (email, Google login, object storage, kampus API — semua tetap out of scope sesuai `SCOPE-OUT-001` – `SCOPE-OUT-009`).

---

# 5. Authentication & Authorization Boundary

## Mekanisme Baseline: Role Selector (DEC-002, REQ-022)

- Browser menyimpan konteks aktor yang dipilih dari role selector (contoh: `{userId: "dummy-admin-01", role: "ADMIN"}`).
- Setiap request API mengirimkan identitas ini melalui **request header** (`X-Role`, `X-User-Id`) atau request body.
- COMP-003 memvalidasi keberadaan user di tabel seed dan memastikan role sesuai.
- Ini bukan autentikasi produksi — tidak ada session, JWT, atau credential nyata (`DEC-002`, `EL-CONSTRAINT-001`).

## Authorization Matrix (ringkasan dari `BR-003`, `BR-012`, `DEC-021`)

| Aksi | PELAPOR | ADMIN | TEKNISI | MANAJER |
|---|---|---|---|---|
| Buat laporan | ✓ (milik sendiri) | — | — | — |
| Lihat laporan | Milik sendiri saja | Semua | Assigned saja | Semua |
| Review (SUBMITTED→UNDER_REVIEW) | — | ✓ | — | — |
| Set kategori/prioritas | — | ✓ | — | — |
| Assign teknisi | — | ✓ | — | ✓ |
| Accept & mulai kerja | — | — | ✓ (assigned) | — |
| Update progres & resolve | — | — | ✓ (assigned) | — |
| Close (konfirmasi) | ✓ (owned, RESOLVED) | ✓ (after 5 hari kerja, RESOLVED) | — | — |
| Reopen (request) | ✓ (owned, RESOLVED/CLOSED) | — | — | — |
| Setujui/tolak reopen | — | ✓ | — | ✓ |
| Komentar publik | ✓ | ✓ | ✓ | ✓ |
| Catatan internal | — | ✓ | ✓ (assigned) | ✓ |
| Dashboard & metrik | — | ✓ | — | ✓ |
| Kelola kategori | — | ✓ | — | — |

---

# 6. Deployment Shape

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloudflare Edge Network                   │
│                                                             │
│  ┌────────────────────────────┐   ┌────────────────────┐   │
│  │   Cloudflare Workers       │   │   Cloudflare D1    │   │
│  │   (Worker Runtime)         │◄─►│   (SQLite managed) │   │
│  │                            │   │                    │   │
│  │  COMP-002 API Handler      │   │  Reports table     │   │
│  │  COMP-003 Role Context     │   │  Users table       │   │
│  │  COMP-005 Business Logic   │   │  Categories table  │   │
│  │  COMP-004 Data Access      │   │  Locations table   │   │
│  │                            │   │  Assignments table │   │
│  └────────────┬───────────────┘   │  Comments table    │   │
│               │ serves            │  Audit_events table│   │
│  ┌────────────▼───────────────┐   └────────────────────┘   │
│  │  Static Assets (SPA)       │                             │
│  │  COMP-001 React SPA        │                             │
│  │  (HTML/JS/CSS bundle)      │                             │
│  └────────────────────────────┘                             │
└─────────────────────────────────────────────────────────────┘
              ▲
              │ HTTPS requests
              │
        [Browser / User Agents]
        Pelapor, Admin, Teknisi, Manajer
```

**Single deployment unit:** Satu `wrangler deploy` menghasilkan Worker + static assets pada satu URL Cloudflare publik. D1 terikat melalui binding di `wrangler.jsonc`.

---

# 7. Architecture Decision Records

## ADR-001: Pertahankan Modular Monolith, Tidak Memisahkan Microservices

**Context:** `GOAL-011` meminta pemisahan frontend, backend, dan database yang jelas. Namun `CONSTRAINT-002/003` membatasi deployment ke Cloudflare free tier oleh tim kecil. `NFR-009` mensyaratkan batas tanggung jawab yang jelas.

**Options considered:**
1. Modular Monolith (satu Worker dengan module separation internal)
2. Dua Workers terpisah (API Worker + frontend Worker)
3. Microservices per domain (Report-service, Assignment-service, dll.)

**Decision:** Pilihan 1 — Modular Monolith. Satu Worker yang diorganisir menjadi module-module terisolasi per domain. Static assets dilayani oleh Workers Assets (built-in).

**Consequences:**
- Deployment lebih sederhana; satu wrangler.jsonc, satu D1 binding, satu URL.
- Batas tanggung jawab dijaga melalui module structure, bukan process boundary.
- Revisit ke service split hanya jika ada tekanan scaling nyata dan persetujuan change request.

**Tradeoffs:** Satu Worker berarti seluruh logic compile bersama. Jika modul tumbuh sangat besar, bisa dipisah menjadi D1-accessed service di kemudian hari tanpa mengubah D1 schema.

**Risks:** Coupling antar-module dapat meningkat jika tidak dipatuhi; mitigasi: code review dan lint rule.

**Traceability:** `GOAL-011`, `NFR-009`, `NFR-012`, `CONSTRAINT-002`, `CONSTRAINT-003`

---

## ADR-002: Cloudflare D1 sebagai Satu-satunya Penyimpanan Persisten

**Context:** `GOAL-010`, `NFR-006`, `REQ-024` mewajibkan data persisten menggunakan D1. `CONSTRAINT-002` melarang layanan berbayar.

**Options considered:**
1. Cloudflare D1 (SQLite managed, free tier, native binding)
2. KV Store (flat key-value, tidak cocok untuk relasional)
3. External DB (PostgreSQL, Supabase — melanggar free-tier constraint)

**Decision:** Cloudflare D1 sebagai satu-satunya penyimpanan. Seluruh tabel (laporan, pengguna, kategori, lokasi, assignment, komentar, audit) ada di D1.

**Consequences:**
- Tidak ada dependency eksternal di luar Cloudflare platform.
- Semua data relasional diakses melalui SQL di Worker.
- Migration dikelola dengan wrangler d1 migrations.

**Tradeoffs:** D1 memiliki limit free tier (5 GB, 5 juta baris). Untuk skala demo akademik ini lebih dari cukup (`DEC-020`: 1.000 laporan, 50 pengguna, 20 teknisi, 20 kategori).

**Traceability:** `GOAL-010`, `NFR-006`, `NFR-011`, `NFR-012`, `REQ-024`, `CONSTRAINT-002`, `DEC-020`

---

## ADR-003: Atomicity untuk Status Transition + Audit Event

**Context:** `NFR-005` mensyaratkan operasi perubahan status, assignment, dan audit event bersifat atomik. `NFR-010` mensyaratkan audit history immutable.

**Options considered:**
1. D1 transaction: UPDATE status + INSERT audit_event dalam satu transaction
2. Dual write tanpa transaction (INSERT audit setelah UPDATE status)

**Decision:** Selalu gunakan D1 transaction untuk semua state mutations. Jika status berubah, audit event ditulis dalam transaksi yang sama. Rollback jika salah satu gagal.

**Consequences:**
- Tidak ada laporan dengan state yang berubah tanpa audit event.
- Tidak ada lebih dari satu teknisi aktif per laporan pada satu waktu.
- MOD-Audit tidak memiliki UPDATE atau DELETE endpoint.

**Tradeoffs:** Slightly more complex D1 code; mitigasi dengan helper function di COMP-004.

**Traceability:** `NFR-005`, `NFR-010`, `BR-004`, `REQ-019`, `GOAL-012`

---

## ADR-004: Role Selector sebagai Mekanisme Demo, Bukan Autentikasi Produksi

**Context:** `DEC-002`, `REQ-022`, `EL-CONSTRAINT-001` menetapkan bahwa baseline menggunakan role selector dan pengguna dummy. Autentikasi penuh (Google login) berada di luar scope (`SCOPE-OUT-003`).

**Options considered:**
1. Role selector dengan pengguna dummy — header-based
2. JWT token lokal tanpa server (aman tapi lebih kompleks)
3. Autentikasi penuh — Google OAuth (out of scope)

**Decision:** Role selector dengan pengguna dummy. Browser mengirimkan `X-Role` dan `X-User-Id` header; Worker memvalidasi bahwa userId ada di tabel seed users dan role sesuai.

**Consequences:**
- Demo dapat dilakukan tanpa credential nyata (`DEC-010`).
- Tidak ada password atau secret yang tersimpan.
- COMP-003 tetap bertugas memvalidasi setiap request; authorization rules tetap ditegakkan meskipun authentication disederhanakan.

**Important note:** Ini bukan sistem autentikasi produksi. Untuk deployment nyata, replace COMP-003 dengan autentikasi yang proper menggunakan change request baru.

**Traceability:** `DEC-002`, `REQ-022`, `NFR-003`, `NFR-004`, `EL-CONSTRAINT-001`, `ASSUMP-003`

---

## ADR-005: API Design Prinsip — REST over HTTP, JSON Body

**Context:** `GOAL-011`, `NFR-009` mensyaratkan batas tanggung jawab yang jelas antara frontend dan backend.

**Options considered:**
1. REST JSON API (HTTP verbs + resource paths)
2. GraphQL (lebih fleksibel tapi lebih kompleks untuk tim kecil)
3. RPC-style (misalnya tRPC — tightly coupled TypeScript)

**Decision:** REST JSON API dengan conventional resource paths. Worker menangani routing secara manual atau menggunakan lightweight router (Itty Router atau built-in URL parsing). Tidak ada dependency framework besar.

**Consequences:**
- API mudah ditest dengan curl atau standard test tools.
- Frontend dan backend bisa dikembangkan paralel dengan API contract.
- Detail endpoint, method, dan schema ditetapkan di Step 7 (Database & API Design).

**Tradeoffs:** Manual routing lebih verbose dari framework — mitigasi dengan router helper di COMP-002.

**Traceability:** `GOAL-011`, `NFR-009`, `NFR-003`

---

## ADR-006: Business Day Calculation — Senin-Jumat tanpa Kalender Libur Khusus

**Context:** `DEC-019`, `BR-008`, `BR-009`, `BR-010` menetapkan target layanan dalam hari kerja. `REQ-014`, `REQ-015`, `REQ-023` memerlukan kalkulasi due time.

**Decision:** Implementasi business day helper di MOD-Dashboard/MOD-Workflow yang menghitung hari kerja Senin–Jumat. Libur nasional tidak diperhitungkan pada baseline.

**Consequences:**
- Kalkulasi deterministik dan dapat diuji tanpa external API.
- Dapat diganti dengan kalender libur melalui change request di kemudian hari.

**Traceability:** `DEC-019`, `BR-008`, `BR-009`, `BR-010`, `REQ-014`, `REQ-015`, `REQ-023`

---

# 8. Security Boundaries

| Concern | Mechanism | Traceability |
|---|---|---|
| Role enforcement | Semua API request divalidasi COMP-003 sebelum COMP-005 | `NFR-003`, `BR-003`, `BR-012` |
| Internal note leakage | MOD-Comment memfilter `type=internal` dari response jika role=PELAPOR | `BR-013`, `REQ-018`, `NFR-003` |
| Secret prevention | Tidak ada secret/credential/password di repository; seed users memakai display name saja | `NFR-004`, `CONSTRAINT-010` |
| Audit immutability | Tidak ada UPDATE/DELETE endpoint untuk audit_events | `NFR-010`, `REQ-019` |
| D1 direct access | D1 hanya bisa diakses dari Worker, tidak dari browser | `NFR-003` |
| Data minimization | Seed users hanya menyimpan nama, peran, dan email dummy; tidak ada data pribadi nyata | `NFR-004`, `DEC-010` |

---

# 9. Observability & Maintainability

| Concern | Approach | Traceability |
|---|---|---|
| Logging | Cloudflare Workers observability (enabled di wrangler.jsonc); console.log untuk error paths | `NFR-009` |
| Error handling | Worker mengembalikan HTTP error codes yang konsisten dengan pesan yang jelas; UI menampilkan error state | `NFR-007` |
| Build CI | TypeScript check + ESLint + test harus lulus sebelum deploy | `NFR-009`, `GOAL-015` |
| Layer separation | Frontend (src/), Backend (worker/), Database (database/migrations/) — tidak ada cross-layer import | `NFR-009`, `GOAL-011` |

---

# 10. Risks

| ID | Risiko | Komponen | Dampak | Mitigasi |
|---|---|---|---|---|
| ARCH-RISK-001 | Role selector dapat di-bypass jika header dimanipulasi browser | COMP-003 | Akses tidak sah ke data | COMP-003 tetap memvalidasi userId terhadap seed DB; ini adalah tradeoff yang diketahui dari `DEC-002` |
| ARCH-RISK-002 | D1 transaction failure menyebabkan status tanpa audit event | COMP-004 | Inkonsistensi data | Gunakan try/catch rollback di setiap mutasi state; covered oleh `NFR-005` |
| ARCH-RISK-003 | Business logic tersebar keluar dari modul yang ditetapkan | COMP-005 | Sulit ditest dan dipelihara | Code review dan PR checklist memastikan logic tetap di modul yang benar |
| ARCH-RISK-004 | Worker bundle size mendekati limit Cloudflare (1 MB compressed) | COMP-002 | Deploy gagal | Monitor bundle size; hindari dependency besar; gunakan tree shaking |
| ARCH-RISK-005 | D1 free tier performance di bawah threshold jika data melebihi dataset baseline | COMP-004 | NFR-001/002 tidak terpenuhi | Dataset dibatasi sesuai `DEC-020`; performance test pada dataset ini |
| ARCH-RISK-006 | Internal note bocor melalui API response yang tidak difilter | MOD-Comment | Privacy violation | Integration test negatif wajib membuktikan response PELAPOR tidak berisi catatan internal |

---

# 11. Handoff Notes untuk Step 7 — Database & API Design

## Component Map yang Dikirimkan

COMP-001 sampai COMP-007 beserta sub-modul MOD-Report, MOD-Workflow, MOD-Assignment, MOD-Comment, MOD-Audit, MOD-Category, MOD-Dashboard, MOD-RoleSelector.

## Data Flow yang Dikirimkan

Happy path SUBMITTED→CLOSED, dashboard aggregation flow, comment/internal note flow (lihat Section 3).

## Design Inputs untuk Step 7

- Tabel yang perlu dirancang: `reports`, `users`, `categories`, `locations`, `assignments`, `comments`, `audit_events`, dan tabel pendukung.
- Satu laporan memiliki tepat satu status aktif (`BR-001`).
- Satu laporan memiliki tepat satu assignment aktif (`BR-004`, `REQ-008`).
- Audit events immutable — tidak ada UPDATE/DELETE (`NFR-010`).
- Kategori hanya soft-delete melalui flag `is_active` (`BR-006`, `REQ-007`).
- Target performa: NFR-001/002 pada dataset DEC-020.

---

# 12. Quality Checklist

- [x] Architecture traceable ke requirement dan NFR.
- [x] Seluruh komponen memiliki responsibility yang jelas dan tidak tumpang tindih.
- [x] Tradeoff dicatat di ADR.
- [x] Security, scalability (dalam batas free tier), maintainability, dan deployment dipertimbangkan.
- [x] Tidak ada keputusan database schema, endpoint detail, atau UI layout — itu untuk Step 7 dan 8.
- [x] Tidak ada implementasi atau kode produksi.
- [x] Traceability ke REQ, NFR, BR, GOAL, STK, DEC dipertahankan.
- [x] Status draft untuk human review.
