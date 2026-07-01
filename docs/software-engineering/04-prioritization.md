# Prioritization Matrix

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 04 - Prioritization |
| Status | Disetujui untuk Step 5 - Validation and Change |
| Tanggal | 1 Juli 2026 |
| Human reviewer | Stieve - Project owner/stakeholder proxy |
| Upstream | `docs/software-engineering/01-inception.md`, `docs/software-engineering/03-specification.md` |
| Metode | MoSCoW dengan supporting score |
| Tahap berikutnya | 05 - Validation and Change |

Dokumen ini menentukan urutan dan batas MVP tanpa mengubah requirement yang telah disetujui. `Should` dan `Could` bukan requirement yang dibatalkan; keduanya hanya dikeluarkan dari MVP pertama dan tetap menjadi bagian required baseline bila dinyatakan in-scope pada Step 1–3.

## Human Review Record

Pada 1 Juli 2026, Stieve sebagai project owner/stakeholder proxy menyetujui Step 4 dan meminta hasilnya dipush langsung ke `main`. Persetujuan mencakup metode, MoSCoW, MVP boundary, Baseline+, dependency sequence, prioritization decisions, conflict log, dan handoff ke Step 5.

## Prioritization Method

Setiap item dinilai pada skala 1–5:

- **V (Value):** kontribusi terhadap tujuan pengguna/bisnis.
- **R (Risk Reduction):** kemampuan mengurangi risiko workflow, data, security, atau delivery.
- **U (Urgency):** kebutuhan agar alur end-to-end atau dependency berikutnya dapat berjalan.
- **C (Compliance/Constraint):** dampak terhadap brief, privacy, audit, atau constraint tugas.
- **E (Effort):** estimasi relatif implementasi dan pengujian; 1 paling kecil, 5 paling besar.
- **Score:** `V + R + U + C - E`. Angka membantu konsistensi; MoSCoW final juga mempertimbangkan dependency dan kelengkapan alur.

Aturan klasifikasi:

- **Must:** tanpa item ini MVP tidak dapat menyelesaikan alur utama, tidak aman, tidak persisten, atau tidak dapat dikumpulkan.
- **Should:** penting untuk baseline lengkap, tetapi MVP pertama masih usable tanpa item tersebut.
- **Could:** peningkatan bernilai yang dapat ditunda tanpa merusak baseline inti.
- **Won't (this baseline):** sengaja tidak dikerjakan pada baseline; hanya dapat masuk melalui change request.

# Functional Requirement Priorities

| Requirement | V | R | U | C | E | Score | Dependency | MoSCoW | Release | Rationale |
|---|---:|---:|---:|---:|---:|---:|---|---|---|---|
| REQ-001 | 5 | 3 | 5 | 5 | 3 | 15 | Master location/category/user | Must | MVP | Entry point laporan dan SUCCESS-001 |
| REQ-002 | 5 | 5 | 5 | 5 | 3 | 17 | REQ-001, D1 | Must | MVP | Identitas, status awal, dan persistensi dasar |
| REQ-003 | 5 | 5 | 5 | 5 | 4 | 16 | REQ-002, REQ-022 | Must | MVP | Visibility dan privacy boundary |
| REQ-004 | 4 | 2 | 2 | 3 | 3 | 8 | REQ-003 | Should | Baseline+ | Efisiensi operasional; daftar tetap usable tanpa filter lengkap |
| REQ-005 | 5 | 4 | 5 | 5 | 2 | 17 | REQ-002/003 | Must | MVP | Memulai workflow terkontrol |
| REQ-006 | 5 | 4 | 5 | 5 | 3 | 16 | REQ-005 | Must | MVP | Triage diperlukan sebelum assignment |
| REQ-007 | 3 | 3 | 2 | 2 | 3 | 7 | Kategori dasar | Should | Baseline+ | Governance kategori penting, tetapi seed category cukup untuk MVP |
| REQ-008 | 5 | 5 | 5 | 5 | 4 | 16 | REQ-005/006, teknisi/keahlian | Must | MVP | Ownership kerja dan transisi ke teknisi |
| REQ-009 | 4 | 4 | 2 | 3 | 4 | 9 | REQ-008/019 | Should | Baseline+ | Exception operasional; tidak dibutuhkan happy path pertama |
| REQ-010 | 5 | 5 | 5 | 5 | 3 | 17 | REQ-008 | Must | MVP | Mencegah pekerjaan tanpa acceptance |
| REQ-011 | 5 | 3 | 4 | 4 | 3 | 13 | REQ-010 | Must | MVP | Visibility progres dan bukti pekerjaan |
| REQ-012 | 5 | 5 | 5 | 5 | 2 | 18 | REQ-010/011 | Must | MVP | Menyelesaikan tahap teknisi |
| REQ-013 | 5 | 5 | 5 | 5 | 2 | 18 | REQ-012 | Must | MVP | Menutup alur end-to-end normal |
| REQ-014 | 3 | 3 | 2 | 2 | 3 | 7 | REQ-012, kalkulasi hari kerja | Should | Baseline+ | Mengurangi laporan menggantung; bukan blocker happy path |
| REQ-015 | 3 | 4 | 2 | 3 | 3 | 9 | REQ-014, DEC-017/019 | Should | Baseline+ | Manual timeout close tervalidasi |
| REQ-016 | 4 | 4 | 3 | 4 | 4 | 11 | REQ-013/019 | Should | Baseline+ | Menangani hasil tidak memuaskan |
| REQ-017 | 4 | 4 | 2 | 3 | 3 | 10 | REQ-016, DEC-018 | Should | Baseline+ | Reopen ke `UNDER_REVIEW` tervalidasi |
| REQ-018 | 4 | 5 | 4 | 4 | 4 | 13 | REQ-003/022 | Must | MVP | Komunikasi wajib dan pemisahan catatan internal |
| REQ-019 | 5 | 5 | 5 | 5 | 4 | 16 | Seluruh perubahan state | Must | MVP | Auditability dan konsistensi workflow |
| REQ-020 | 5 | 2 | 3 | 5 | 5 | 10 | REQ-002/019/024 | Must | MVP | Dashboard data nyata diwajibkan brief/SUCCESS-004; MVP memakai metrik inti |
| REQ-021 | 3 | 1 | 1 | 2 | 4 | 3 | REQ-020/004 | Should | Baseline+ | Filter lengkap dapat ditambahkan setelah kartu inti |
| REQ-022 | 5 | 5 | 5 | 5 | 2 | 18 | Seed users | Must | MVP | Mekanisme akses demonstrasi untuk semua aktor |
| REQ-023 | 4 | 3 | 2 | 3 | 4 | 8 | REQ-019/020, DEC-019 | Should | Baseline+ | SLA memakai kalender baseline tervalidasi |
| REQ-024 | 5 | 5 | 5 | 5 | 4 | 16 | D1 schema/API | Must | MVP | Sumber data persisten bagi seluruh fungsi |

# Non-Functional Requirement Priorities

| Requirement | V | R | U | C | E | Score | Dependency | MoSCoW | Release | Rationale |
|---|---:|---:|---:|---:|---:|---:|---|---|---|---|
| NFR-001 | 3 | 2 | 1 | 3 | 4 | 5 | REQ-003/004, DEC-020 | Should | Baseline+ | Target diuji pada dataset tervalidasi |
| NFR-002 | 4 | 2 | 2 | 3 | 4 | 7 | REQ-003/020, DEC-020 | Should | Baseline+ | Target detail/dashboard diuji pada dataset tervalidasi |
| NFR-003 | 5 | 5 | 5 | 5 | 4 | 16 | REQ-003/018/022 | Must | MVP | Privacy dan authorization tidak boleh ditunda |
| NFR-004 | 5 | 5 | 5 | 5 | 2 | 18 | Data demo/repository | Must | MVP | Constraint publik dan pencegahan kebocoran secret |
| NFR-005 | 5 | 5 | 5 | 5 | 5 | 15 | REQ-008–019 | Must | MVP | Mencegah status/history/assignment inkonsisten |
| NFR-006 | 5 | 5 | 5 | 5 | 4 | 16 | REQ-024, D1 | Must | MVP | SUCCESS-001 dan persistence wajib |
| NFR-007 | 4 | 2 | 4 | 3 | 3 | 10 | Seluruh UI | Must | MVP | Alur utama harus dapat dipahami dan didemonstrasikan |
| NFR-008 | 3 | 3 | 2 | 3 | 3 | 8 | Seluruh UI | Should | Baseline+ | Accessibility wajib divalidasi, penyempurnaan mengikuti UI stabil |
| NFR-009 | 4 | 4 | 5 | 5 | 3 | 15 | Arsitektur/build | Must | MVP | Menjaga frontend, Worker, D1, test, dan delivery dapat dipelihara |
| NFR-010 | 5 | 5 | 4 | 5 | 3 | 16 | REQ-019 | Must | MVP | History harus immutable dan dapat dipercaya |
| NFR-011 | 3 | 3 | 1 | 3 | 2 | 8 | D1 schema | Should | Baseline+ | Policy retensi penting; proses arsip bukan kebutuhan MVP runtime |
| NFR-012 | 5 | 5 | 5 | 5 | 4 | 16 | Seluruh Must, Cloudflare | Must | MVP | URL publik dan free tier adalah constraint pengumpulan |

# MVP Boundary

## MVP Goal

MVP harus mendemonstrasikan satu laporan dengan data persisten melalui alur:

`SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`

Alur tersebut harus memakai role selector, membatasi akses, mencatat komentar dan audit history, serta menghasilkan dashboard inti dari data D1 pada URL Cloudflare publik.

## MVP Functional Scope (Must)

- **Intake and persistence:** REQ-001, REQ-002, REQ-024.
- **Access and demonstration:** REQ-003, REQ-022.
- **Triage and assignment:** REQ-005, REQ-006, REQ-008.
- **Technician execution:** REQ-010, REQ-011, REQ-012.
- **Confirmation and closure:** REQ-013.
- **Communication and audit:** REQ-018, REQ-019.
- **Management visibility:** seluruh metrik REQ-020: jumlah masuk, distribusi status/kategori/prioritas, rata-rata waktu penyelesaian, laporan terlambat, beban teknisi, reopen, dan tren. Filter lengkap REQ-021 tetap pada Baseline+.

## MVP Quality Scope (Must)

NFR-003 sampai NFR-007, NFR-009, NFR-010, dan NFR-012.

## MVP Exit Criteria

MVP dianggap selesai hanya jika:

1. AC Must berikut lulus: AC-001–006, AC-009–012, AC-015–016, AC-019–026, AC-035–040, AC-043–044, dan AC-047–048.
2. Negative authorization tests membuktikan pelapor tidak dapat melihat laporan pengguna lain dan catatan internal.
3. Setiap transisi workflow menghasilkan audit event dan tidak membuat lebih dari satu teknisi aktif.
4. Data tetap tersedia setelah reload dan deployment menggunakan D1.
5. Dashboard inti cocok dengan data sumber.
6. Build, lint, automated tests, secret scan, dan smoke test URL Cloudflare lulus.

# Baseline+ / Next Release (Should)

| Sequence | Items | Outcome | Entry Dependency |
|---:|---|---|---|
| 1 | REQ-004, REQ-007, REQ-009 | Operasi daftar, kategori, dan reassignment lebih lengkap | MVP access, list, assignment, audit stabil |
| 2 | REQ-016, REQ-017 | Reopen end-to-end | DEC-018; workflow dan audit stabil |
| 3 | REQ-014, REQ-015 | Reminder in-app dan manual timeout close | DEC-017/019 |
| 4 | REQ-021, REQ-023 | Dashboard filter lengkap dan SLA/overdue | Dashboard penuh; DEC-019 |
| 5 | NFR-001, NFR-002, NFR-008, NFR-011 | Performance, accessibility, dan retention validation lengkap | Dataset DEC-020 tersedia |

# Could and Won't

## Could After Required Baseline

Tidak ada `REQ-###` approved yang diklasifikasikan Could karena semua requirement Step 3 berasal dari scope baseline. Penyempurnaan visual, variasi metrik tambahan, dan optimasi di luar threshold dapat dipertimbangkan setelah Must dan Should tervalidasi.

## Won't in This Baseline

| Item | Source | Decision |
|---|---|---|
| Upload foto/dokumen dan object storage | SCOPE-OUT-001, CONFLICT-001 | Won't; change request setelah baseline |
| Notifikasi email | SCOPE-OUT-002, CONFLICT-002 | Won't; gunakan indikator in-app |
| Google login/autentikasi penuh | SCOPE-OUT-003, DEC-002 | Won't; role selector demo dipertahankan |
| QR lokasi | SCOPE-OUT-004 | Won't |
| AI kategorisasi | SCOPE-OUT-005 | Won't |
| Inventory spare part | SCOPE-OUT-006 | Won't |
| Vendor management | SCOPE-OUT-007 | Won't |
| Integrasi sistem kampus | SCOPE-OUT-008 | Won't tanpa requirement baru |
| Aplikasi mobile native | SCOPE-OUT-009 | Won't |

# Dependency and Delivery Sequence

| Order | Capability | Requirements/NFRs | Depends On | Risk Controlled |
|---:|---|---|---|---|
| 1 | Project quality gate dan data protection | NFR-004, NFR-009 | Repository | RISK-005/006/007 |
| 2 | D1 schema, seed users/master data, persistence | REQ-024, NFR-006 | Architecture/database design | RISK-008 |
| 3 | Role context dan access boundary | REQ-022, REQ-003, NFR-003 | Seed users, API boundary | RISK-001/005 |
| 4 | Report intake/list/detail | REQ-001, REQ-002 | Orders 2–3 | RISK-004 |
| 5 | Audit foundation | REQ-019, NFR-005/010 | D1 transaction model | RISK-003/004 |
| 6 | Review, priority, assignment | REQ-005/006/008 | Orders 3–5 | RISK-003 |
| 7 | Acceptance, progress, resolve | REQ-010/011/012 | Order 6 | RISK-003 |
| 8 | Comments and confirmation/close | REQ-018/013 | Orders 3–7 | RISK-001/004 |
| 9 | Dashboard lengkap | REQ-020 | Orders 2, 4–8 | RISK-004 |
| 10 | Public deployment and MVP verification | NFR-007/012 | Seluruh Must | RISK-008/009 |
| 11 | Baseline+ exception flows | Should requirements | MVP accepted; open questions resolved | RISK-002/003 |

# Prioritization Decisions

| ID | Decision | Rationale | Owner | Impact |
|---|---|---|---|---|
| DEC-011 | MVP memprioritaskan happy path `SUBMITTED` sampai `CLOSED`. | Memberikan demonstrasi end-to-end dan memenuhi SUCCESS-002 sebelum exception flow. | Project owner | Reopen/reminder/reassignment masuk Baseline+ |
| DEC-012 | Security, privacy, integrity, audit, persistence, dan public deployment adalah Must walau tidak selalu terlihat sebagai fitur UI. | Risiko dan constraint tugas tidak dapat dipulihkan dengan aman jika ditunda. | Project owner/developer | NFR-003–006/009/010/012 masuk MVP |
| DEC-013 | Seluruh metrik REQ-020 adalah Must; filter REQ-021 diselesaikan pada Baseline+. | DEC-022 mempertahankan arti requirement approved dan menyelesaikan VAL-002. | Project owner | REQ-020 penuh Must; REQ-021 Should |
| DEC-014 | Upload, email, dan autentikasi penuh tidak dimasukkan meskipun bernilai bagi stakeholder. | Sudah dikeluarkan dari baseline dan menambah dependency/cost/risk. | Project owner | Scope creep dicegah |
| DEC-015 | REQ-015/017/023 tetap Should setelah keputusan perilakunya divalidasi. | Item merupakan exception/Baseline+ walau tidak lagi provisional. | Project owner + stakeholder terkait | DEC-017–019 mengunci perilaku |
| DEC-016 | Project-local reusable skill disimpan terpisah dari artefak hasil. | Memenuhi CONSTRAINT-005 dan menjaga workflow dapat digunakan ulang. | Project team | `skills/04-prioritization/SKILL.md` dibuat |

# Conflict Log

| Conflict | Stakeholders/Requirements | Decision | Rationale | Follow-up |
|---|---|---|---|---|
| Keinginan upload bukti vs scope/cost | STK-001/003; SCOPE-OUT-001 | Won't baseline | Object storage menambah desain, security, dan deployment risk | Change request setelah baseline |
| Keinginan notifikasi vs email out of scope | STK-001; REQ-014; SCOPE-OUT-002 | In-app indicator Should; email Won't | Menjaga value reminder tanpa dependency email | Validasi REQ-014 di Step 5 |
| Dashboard lengkap vs waktu delivery | STK-004; REQ-020/021 | Seluruh REQ-020 Must; filter REQ-021 Should | Menjaga requirement approved sesuai DEC-022 | Monitor effort pada issue planning |
| Exception flow vs kepastian state | STK-001/002/004; REQ-015/017/023 | Should dengan perilaku tervalidasi | DEC-017–019 menyelesaikan state, close, dan kalender | Tidak ada konflik terbuka |
| Visibility teknisi berdasarkan keahlian vs privacy | STK-002/003/006; REQ-003 | Hanya laporan assigned | DEC-021 menerapkan least privilege | Tidak ada perluasan pra-assignment |
| Retensi 3 tahun vs kebutuhan demo | STK-005/006; NFR-011 | Policy/schema Should; tidak membangun proses arsip MVP | Tidak ada data berumur 3 tahun pada demo | Review schema dan dokumentasi |

# Risk and Constraint Coverage

| Risk/Constraint | Priority Response |
|---|---|
| RISK-001 authorization | REQ-003/022 dan NFR-003 Must sebelum workflow UI |
| RISK-002 scope growth | Won't list eksplisit dan change request wajib |
| RISK-003 invalid transition | REQ-005/008/010/012/013, NFR-005, audit foundation Must |
| RISK-004 incomplete history | REQ-019/NFR-010 Must sebelum seluruh mutation flow |
| RISK-005 private data/secrets | NFR-004 Must dan quality gate pertama |
| RISK-006 late AI evidence | Skill dan artefak/evidence dicatat per tahap |
| RISK-007 test count without value | MVP exit criteria berbasis AC dan negative tests |
| RISK-008 local/production D1 mismatch | Persistence smoke test dan deployment Must |
| RISK-009 external limits | Free-tier deployment dan dataset baseline dibatasi |
| RISK-010 delayed review | Human review wajib sebelum Step 5 ditutup |

# Handoff to 05 - Validation and Change

Step 5 harus:

1. Memvalidasi bahwa Must benar-benar cukup untuk alur end-to-end dan tidak ada dependency tersembunyi.
2. Memeriksa konsistensi prioritas terhadap 24 REQ, 12 NFR, 14 BR, dan 48 AC.
3. Memvalidasi Q-028 sampai Q-032; Q-033 boleh tetap sebagai delivery metadata non-blocking.
4. Memvalidasi subset dashboard inti dan access matrix teknisi.
5. Memastikan `Should` tetap masuk required baseline plan dan tidak diam-diam dianggap dibatalkan.
6. Mencatat perubahan terhadap specification sebagai change request, bukan mengedit baseline tanpa jejak.

## Quality Checklist

- [x] Seluruh 24 REQ dinilai dan diberi MoSCoW, release, dependency, serta rationale.
- [x] Seluruh 12 NFR dinilai dan diberi MoSCoW, release, dependency, serta rationale.
- [x] MVP boundary dan exit criteria dinyatakan eksplisit.
- [x] Baseline+, Could, dan Won't dipisahkan.
- [x] Dependency order mendahulukan security, data, audit, dan workflow foundations.
- [x] Konflik stakeholder/requirement memiliki keputusan, alasan, dan follow-up.
- [x] Requirement yang semula provisional dan pertanyaan terbuka ditelusuri hingga keputusan Step 5.
- [x] Handoff ke Step 5 tersedia.
