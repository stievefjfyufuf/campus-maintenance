# Architecture Design

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 06 - Architecture Design |
| Status | Draft untuk human review |
| Tanggal | 1 Juli 2026 |
| Input tervalidasi | `03-specification.md`, `05-validation-change.md`, DEC-017–DEC-022, CR-001 |
| Platform | React 19, TypeScript, Vite, Cloudflare Worker, Cloudflare D1 |
| Tahap berikutnya | 07 - Database and API Design setelah human review |

Dokumen ini menetapkan struktur dan keputusan arsitektur. Dokumen ini tidak menetapkan schema tabel, kontrak endpoint terperinci, atau rancangan halaman; detail tersebut diteruskan ke Step 7 dan Step 8.

## Architecture Style

Sistem menggunakan **client-server modular monolith** dengan satu deployment Cloudflare Worker:

- React SPA menangani presentasi, navigasi, form, dan state interaksi.
- Worker menyediakan API JSON, authorization, validasi use case, transaksi, dan query.
- Cloudflare D1 menjadi satu-satunya source of truth untuk data operasional.
- Modul backend dipisahkan berdasarkan domain, tetapi dikompilasi dan dideploy sebagai satu Worker.

Pilihan ini memenuhi GOAL-009–012, CONSTRAINT-002/003, dan NFR-005/006/009/012 tanpa overhead operasional microservices. Boundary modul harus dipertahankan agar pemisahan layanan di masa depan tetap mungkin bila beban atau organisasi berubah.

## System Context

```text
Pelapor / Admin / Teknisi / Manajer
                 |
                 v
        React SPA (browser)
                 |
          HTTPS JSON /api
                 |
                 v
      Cloudflare Worker modular monolith
       | authorization | use cases |
       | workflow      | reporting |
                 |
          D1 binding / transaction
                 |
                 v
           Cloudflare D1
```

Tidak ada email, object storage, Google authentication, sistem kampus, atau layanan berbayar pada baseline (BR-014, SCOPE-OUT-001–008).

## Components

| ID | Component | Responsibility | Depends On | Owner/Boundary | Traceability |
|---|---|---|---|---|---|
| COMP-001 | React Application Shell | Routing, layout, loading/error boundary, role context, dan akses ke API client | COMP-002, COMP-003 | Browser/presentation | REQ-003, REQ-022; NFR-007–009 |
| COMP-002 | Demo Identity and Role Context | Memilih user dummy dan mengirim identitas konteks demo; tidak menyimpan password atau credential nyata | COMP-008 | Browser + trusted server validation | REQ-022; NFR-003/004 |
| COMP-003 | API Client | Serialisasi request, parsing response/error, dan cancellation; tidak memuat business rule | COMP-009 | Browser/integration boundary | REQ-001–024; NFR-007/009 |
| COMP-004 | Report UI Module | Form, list, detail, filter, komentar, progres, dan aksi workflow sesuai capability dari API | COMP-003 | Browser/feature module | REQ-001–018, REQ-023 |
| COMP-005 | Administration UI Module | Triage, kategori, assignment/reassignment, close, dan keputusan reopen | COMP-003 | Browser/feature module | REQ-005–009, REQ-015–017 |
| COMP-006 | Dashboard UI Module | Metrik, distribusi, tren, overdue, dan filter dashboard | COMP-003 | Browser/feature module | REQ-020/021/023; NFR-002 |
| COMP-007 | Worker HTTP Adapter | Routing `/api`, parsing input, response envelope, status code, correlation ID, dan security headers | COMP-008, COMP-009 | Server/transport boundary | Seluruh REQ API; NFR-003/004/009/012 |
| COMP-008 | Identity and Authorization Module | Memvalidasi user dummy aktif, role, ownership, assignment, dan capability setiap aksi/query | COMP-013 | Server/security boundary | REQ-003/018/022; BR-003/012/013; NFR-003 |
| COMP-009 | Application Service Layer | Mengorkestrasi use case dan transaction boundary; UI/transport tidak mengakses repository langsung | COMP-008, COMP-010–014 | Server/application boundary | REQ-001–024; NFR-005/009 |
| COMP-010 | Report and Workflow Module | Laporan, state machine, acceptance assignment, progres, resolve, close, reopen, dan SLA weekday | COMP-012, COMP-013 | Server/domain boundary | REQ-001/002/005/006/010–017/023; BR-001–005/007–11 |
| COMP-011 | Category and Assignment Module | Kategori/keahlian, teknisi aktif, assignment tunggal, dan reassignment | COMP-012, COMP-013 | Server/domain boundary | REQ-007–009; BR-004/006 |
| COMP-012 | Comment and Audit Module | Komentar publik, catatan internal, dan append-only audit event | COMP-013 | Server/domain boundary | REQ-018/019; BR-013; NFR-005/010/011 |
| COMP-013 | D1 Repository Layer | Query terparameterisasi, mapping record, pagination, transaksi, dan akses D1 | Cloudflare D1 | Server/data boundary | REQ-002/024; NFR-001/002/005/006/009/011 |
| COMP-014 | Dashboard Query Module | Query agregat/read model dari data D1; tidak menyimpan angka dashboard statis | COMP-013 | Server/read boundary | REQ-020/021/023/024; NFR-001/002 |
| COMP-015 | Observability and Error Module | Structured log, correlation ID, durasi request, dan sanitasi error tanpa data sensitif | Cloudflare observability | Cross-cutting/server | NFR-001–004/012 |

## Module Boundary Rules

1. Komponen UI hanya berkomunikasi dengan backend melalui COMP-003; tidak ada binding D1 di browser.
2. COMP-007 hanya menangani transport. Business rule berada di COMP-009–012.
3. Setiap query dan mutation memanggil COMP-008 di server; role selector pada browser bukan authorization control.
4. Mutation workflow, assignment, dan audit event terkait berjalan dalam satu transaksi D1 (NFR-005).
5. Audit event hanya dapat ditambahkan oleh application service; tidak tersedia operasi update/delete baseline (NFR-010).
6. Dashboard membaca data operasional melalui COMP-014 dan D1, bukan konstanta UI (REQ-024).
7. Catatan internal difilter di query server sebelum response dibentuk, bukan hanya disembunyikan dengan CSS (BR-013, NFR-003).

## Critical Data Flows

### DF-001 — Membuat dan membaca laporan

1. Pelapor memilih user dummy melalui COMP-002 dan mengisi form COMP-004.
2. COMP-003 mengirim request ke COMP-007 dengan actor context dan payload.
3. COMP-008 memvalidasi actor; COMP-009 memvalidasi use case.
4. COMP-010 membuat laporan berstatus `SUBMITTED`; COMP-012 menambahkan audit event awal dalam transaksi yang sama melalui COMP-013.
5. API mengembalikan ID unik dan representasi laporan.
6. List/detail berikutnya selalu dibaca dari D1 dengan ownership filter server-side.

Traceability: REQ-001–003, REQ-019/022/024, AC-001–006/037–038/043–044/047–048, NFR-003/005/006.

### DF-002 — Triage, assignment, dan pekerjaan teknisi

1. Admin memulai review serta menetapkan kategori/prioritas.
2. Admin/manajer menugaskan satu teknisi aktif dengan keahlian relevan.
3. Transaksi menyimpan assignment, status `ASSIGNED`, dan audit event.
4. Hanya teknisi assigned dapat membaca detail, menerima assignment, memulai pekerjaan, menambah progres, dan resolve.
5. Setiap transisi diperiksa terhadap state machine dan capability sebelum ditulis.

Traceability: REQ-005–012/019, BR-002–005/007/012, AC-009–024/037–038, NFR-003/005/010, DEC-021.

### DF-003 — Konfirmasi, close, dan reopen

1. Pelapor pemilik mengonfirmasi `RESOLVED` menjadi `CLOSED`, atau mengajukan reopen dengan alasan.
2. Admin/manajer menyetujui atau menolak reopen; approval mencatat event `REOPENED` dan mengubah status aktif ke `UNDER_REVIEW`.
3. Admin dapat close tanpa respons hanya setelah lima weekday dan wajib memberi alasan.
4. Perhitungan hari kerja berada di domain service yang sama dan menggunakan Senin–Jumat tanpa kalender libur khusus.

Traceability: REQ-013–017/019/023, BR-008–011, AC-025–034/037–038/045–046, DEC-017–019.

### DF-004 — Komentar dan catatan internal

1. Application service menentukan tipe komentar dan capability actor.
2. Data disimpan dengan visibility eksplisit.
3. Query pelapor mengecualikan seluruh catatan internal sebelum response dibuat; admin/manajer dan teknisi terkait menerima subset sesuai kewenangan.

Traceability: REQ-018, BR-012/013, AC-035–036, NFR-003.

### DF-005 — Dashboard

1. Manajer meminta dashboard melalui COMP-006.
2. COMP-008 memverifikasi role; COMP-014 membangun agregasi D1 sesuai filter.
3. Response memuat jumlah masuk, distribusi status/kategori/prioritas, rata-rata waktu penyelesaian, overdue, beban teknisi, reopen, dan tren.
4. Pengukuran performa menggunakan dataset DEC-020.

Traceability: REQ-020/021/023/024, AC-039–042/045–048, NFR-001/002, DEC-020/022.

## Authentication and Authorization Boundary

Baseline memakai **demo identity**, bukan autentikasi produksi. Request membawa identifier user dummy, tetapi Worker wajib mengambil role/status user dari D1 dan tidak mempercayai role yang dikirim browser. Semua operasi menerapkan capability check berbasis:

- role aktif;
- ownership laporan untuk pelapor;
- assignment aktif untuk teknisi;
- kewenangan admin/manajer;
- status laporan dan transition matrix;
- visibility komentar.

Header atau cookie actor demo harus diperlakukan sebagai mekanisme demonstrasi yang dapat dipalsukan dan diberi label jelas pada UI/deployment. Penggantian dengan autentikasi produksi adalah perubahan arsitektur tersendiri dan memerlukan Change Request.

## Data and Transaction Boundaries

- D1 adalah satu-satunya database baseline dan diakses melalui binding Worker.
- Setiap mutation utama menghasilkan audit event dalam transaksi yang sama.
- Assignment aktif tunggal dijaga oleh validasi domain dan constraint/index database yang akan dirinci pada Step 7.
- Audit event append-only; mekanisme aplikasi tidak menyediakan mutation terhadap history.
- Waktu disimpan dalam UTC dan ditampilkan sesuai kebutuhan UI; perhitungan weekday memakai aturan DEC-019.
- Daftar dan dashboard harus memakai pagination, filter server-side, serta index yang ditentukan pada Step 7 untuk target DEC-020.
- Tidak ada auto-delete sebelum tiga tahun; proses arsip berada di luar runtime MVP.

## Deployment Shape

| Area | Keputusan |
|---|---|
| Compute | Satu Cloudflare Worker menjalankan API dan melayani aset React hasil build |
| Storage | Satu Cloudflare D1 binding per environment |
| Environments | Local development dan production memiliki database/config terpisah |
| Static assets | Vite build dilayani melalui Workers Assets dengan SPA fallback |
| API namespace | Seluruh backend berada di bawah `/api`; fallback SPA tidak menangkap error API |
| Configuration | Non-secret melalui Wrangler config; secret tidak disimpan di repository |
| Observability | Cloudflare observability + structured application logs yang disanitasi |
| Release | Migration D1 dijalankan dan diverifikasi sebelum deployment Worker yang bergantung padanya |

## External Integrations

| Integration | Status | Boundary/Risk |
|---|---|---|
| Cloudflare Workers | Required | Runtime dan public URL; perubahan platform dipantau |
| Cloudflare D1 | Required | Persistensi dan transaksi; binding berbeda per environment |
| Cloudflare Observability | Required minimum | Log tidak boleh memuat deskripsi/kontak sensitif atau secret |
| GitHub | Delivery only | Source control/CI, bukan dependency runtime |
| Email, R2, Google, campus SSO | Excluded | Memerlukan CR dan desain integrasi baru |

## Architecture Decision Records

### ADR-001 — Client-server modular monolith

**Context:** Tim kecil, free tier, satu domain data, dan alur transaksi saling terkait (GOAL-011/012, NFR-005/009/012).

**Decision:** Gunakan React SPA dan satu Cloudflare Worker modular dengan D1. Pisahkan transport, application service, domain, repository, dan query dashboard di dalam codebase.

**Options considered:** Microservices ditolak karena menambah deployment, consistency, latency, dan observability cost tanpa kebutuhan scale; satu file Worker tanpa boundary ditolak karena buruk untuk maintainability dan testing.

**Consequences/tradeoffs:** Deployment dan transaksi lebih sederhana, tetapi disiplin import/module wajib dijaga. Pemisahan service baru dipertimbangkan bila ada tekanan scale atau ownership nyata.

**Rollback/migration:** Boundary modular memungkinkan konsolidasi lebih sederhana atau ekstraksi modul tanpa mengubah kontrak UI sekaligus.

Traceability: REQ-001–024; NFR-005/009/012.

### ADR-002 — D1 sebagai single source of truth

**Context:** Data harus persisten dan dashboard tidak boleh statis (REQ-024, NFR-006).

**Decision:** Semua list, detail, history, dan dashboard membaca D1. Tidak ada in-memory business store atau angka dashboard hardcoded.

**Options considered:** Local storage dan mock-only store ditolak karena gagal persistence/public deployment; database tambahan ditolak karena scope/free tier.

**Consequences/tradeoffs:** Schema, migration, index, dan local/production parity menjadi critical path.

**Rollback/migration:** Migration harus backward-compatible bila memungkinkan; restore/rollback release dibahas pada Step 15.

Traceability: REQ-002/020/024; NFR-001/002/006/012.

### ADR-003 — Server-side authorization dengan demo identity

**Context:** Role selector diwajibkan untuk demo, sementara data dan aksi tetap harus dibatasi (REQ-003/022, NFR-003).

**Decision:** Browser hanya memilih identifier user dummy. Worker mengambil role dan status dari D1 serta menerapkan ownership/assignment/capability pada setiap request.

**Options considered:** Menaruh role sebagai sumber kebenaran di client ditolak; autentikasi Google/SSO ditolak karena out of scope.

**Consequences/tradeoffs:** Cocok untuk demo dan negative authorization tests, tetapi bukan autentikasi production-grade dan harus diberi label eksplisit.

**Rollback/migration:** Identity adapter dapat diganti oleh provider autentikasi tanpa memindahkan business authorization dari server.

Traceability: REQ-003/018/022; BR-003/012/013; NFR-003/004; DEC-021.

### ADR-004 — Mutation dan audit ditulis atomik

**Context:** State tanpa history atau assignment ganda merusak integritas (REQ-019, NFR-005/010).

**Decision:** Application service membungkus perubahan state/assignment dan audit event terkait dalam satu transaksi D1. Audit history append-only.

**Options considered:** Penulisan audit asinkron atau best-effort ditolak karena dapat meninggalkan gap; audit yang dapat diedit ditolak.

**Consequences/tradeoffs:** Mutation lebih kompleks dan harus memiliki integration test rollback, tetapi data dapat dipercaya.

**Rollback/migration:** Kegagalan membatalkan seluruh transaksi. Koreksi historis dilakukan melalui event koreksi baru, bukan edit event lama.

Traceability: REQ-008–019; BR-001–006/010/011; NFR-005/010.

### ADR-005 — State machine dan weekday policy sebagai domain service

**Context:** Transisi dan target waktu dipakai oleh banyak endpoint serta harus konsisten (REQ-005/010/012–017/023).

**Decision:** Simpan transition matrix, actor capability, dan kalkulasi Senin–Jumat dalam pure domain functions yang dipanggil semua mutation/query terkait.

**Options considered:** Logika tersebar di route/UI ditolak karena mudah berbeda; scheduler auto-close ditolak oleh DEC-017.

**Consequences/tradeoffs:** Aturan mudah diuji dan dipakai ulang; perubahan kalender masa depan memerlukan policy baru dan CR.

**Rollback/migration:** Pure functions dapat diganti tanpa migrasi data selama arti timestamp/event tetap kompatibel.

Traceability: REQ-005/008/010/012–017/023; BR-002/003/005/008–011; DEC-017–019.

### ADR-006 — Dashboard memakai read queries terpisah dalam Worker yang sama

**Context:** Dashboard lengkap adalah Must dan memiliki target p95 tersendiri (REQ-020, DEC-022, NFR-002).

**Decision:** Pisahkan COMP-014 sebagai read/query module dengan agregasi SQL dan index terarah, tetapi jangan membuat database atau service kedua.

**Options considered:** Perhitungan di browser ditolak karena privacy/performance; materialized service terpisah ditunda karena dataset baseline kecil.

**Consequences/tradeoffs:** Konsistensi data langsung dan operasi sederhana; query perlu diuji terhadap dataset DEC-020.

**Rollback/migration:** Query dapat disederhanakan atau dioptimalkan tanpa mengubah mutation path; caching baru memerlukan evaluasi freshness.

Traceability: REQ-020/021/023/024; NFR-001/002/009; DEC-020/022.

## Quality Attribute Strategy

| Attribute | Strategy | Verification Direction |
|---|---|---|
| Security/privacy | Server-side capability checks, parameterized SQL, response projection, sanitized errors | Negative authorization dan internal-note leakage tests |
| Integrity | D1 transaction, state machine, active-assignment constraint, append-only audit | Failure injection dan rollback integration tests |
| Performance | Pagination, server filters, indexes, dedicated aggregate queries | p95 pada dataset DEC-020 |
| Persistence | D1 only, migrations, separate environment bindings | Reload/restart smoke tests local dan production |
| Maintainability | Layer/module boundaries, pure domain rules, typed request/response contracts | Lint/build/test dan import-boundary review |
| Usability/accessibility | Bahasa Indonesia, explicit UI states, semantic controls | UI checklist, keyboard walkthrough, automated scan |
| Auditability | Immutable chronological events with actor/before/after/reason | Endpoint inventory dan history ordering tests |
| Deployment | One Worker, free-tier services, reproducible migrations | Production smoke test dan rollback checklist |

## Risks

| ID | Risk | Impact | Mitigation/Owner | Trigger |
|---|---|---|---|---|
| ARCH-RISK-001 | Demo actor identifier dapat dipalsukan | Unauthorized demo access bila dianggap autentikasi nyata | Developer: label demo-only, server lookup, data sintetis | Deployment dipakai di luar evaluasi |
| ARCH-RISK-002 | D1 transaction/constraint design tidak menjaga state dan history | Audit gap atau assignment ganda | Step 7: transaction contract dan unique active assignment strategy | Integration rollback test gagal |
| ARCH-RISK-003 | Query dashboard penuh melewati target 3 detik | NFR-002 gagal | Step 7: index/query plan; Step 12: dataset DEC-020 | p95 melewati threshold |
| ARCH-RISK-004 | Internal note bocor lewat serializer/query generik | Privacy breach | Server-side projections dan negative response tests | Field internal muncul pada reporter API |
| ARCH-RISK-005 | Environment D1 local/production berbeda | Migration/deployment gagal | Binding terpisah, migration ledger, smoke test | Schema version tidak cocok |
| ARCH-RISK-006 | Modul monolith saling mengimpor tanpa aturan | Maintainability turun | Dependency direction dan code review | Route mengakses D1 langsung |
| ARCH-RISK-007 | Cloudflare free-tier/platform limit berubah | Public app terganggu | Pantau konfigurasi dan dokumentasikan fallback lokal | Limit/deprecation notice |
| ARCH-RISK-008 | Log menyimpan data laporan/kontak | Data sensitif terekspos | Allowlist metadata log dan sanitasi error | Log review menemukan payload |

## Assumptions and Open Architecture Items

- Tidak ada scheduler baseline; reminder/eligibility dihitung saat query atau aksi dibuka (DEC-017).
- Exact schema, index, pagination contract, endpoint path, error code, dan D1 transaction technique diputuskan pada Step 7.
- Exact navigation, screen composition, responsive behavior, dan UI state diputuskan pada Step 8.
- Q-033 tetap metadata delivery non-blocking dan tidak mengubah architecture baseline.
- Autentikasi produksi, file upload, email, dan external integration memerlukan CR baru.

## Handoff to Step 7 — Database and API Design

Step 7 harus merinci:

1. Entity dan constraint untuk users/roles, skills, categories, reports, assignments, progress, comments, reopen requests, dan audit events.
2. Transaction boundary untuk seluruh mutation yang disebut DF-001–DF-004.
3. Unique active assignment, immutable audit, inactive category, dan status transition enforcement.
4. Endpoint, request/response, capability matrix, pagination/filter, validation error, dan idempotency bila diperlukan.
5. Index/query strategy untuk ownership/assignment list dan seluruh metrik REQ-020 pada dataset DEC-020.
6. D1 migration order, seed user dummy, environment binding, serta rollback/compatibility notes.

## Human Review Gate

Sebelum diteruskan sebagai baseline Step 7, reviewer perlu menyetujui:

- modular monolith dan one-Worker deployment;
- demo identity sebagai mekanisme non-production dengan authorization server-side;
- D1 single source of truth;
- transaksi mutation + audit append-only;
- boundary komponen dan dependency direction;
- risiko serta item handoff Step 7.

## Quality Checklist

- [x] Input hanya berasal dari requirement yang dinyatakan ready pada Step 5.
- [x] Architecture style paling sederhana yang memenuhi requirement dipilih dan dijustifikasi.
- [x] Component responsibility, dependency, dan boundary dinyatakan.
- [x] Critical data flow ditelusuri ke REQ, AC, BR, NFR, dan DEC.
- [x] Authentication/authorization, data, integration, dan deployment boundary dinyatakan.
- [x] ADR memuat context, decision, option, consequence, tradeoff, dan rollback/migration impact.
- [x] Security, integrity, observability, performance, maintainability, dan deployment risk dicatat.
- [x] Handoff ke Step 7 dibatasi pada database dan API design.
- [ ] Human review selesai.
