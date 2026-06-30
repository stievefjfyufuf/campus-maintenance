# Elicitation Notes

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 02 - Elicitation |
| Status | In progress - menunggu jawaban stakeholder round 1 |
| Tanggal mulai | 30 Juni 2026 |
| Upstream | `docs/software-engineering/01-inception.md` |
| Teknik yang sudah dilakukan | Document analysis |
| Teknik berikutnya | Interview stakeholder proxy dan validation workshop |

## Elicitation Objectives

1. Memvalidasi ownership, aktor, dan hak akses dari `STK-001` sampai `STK-006`.
2. Menjelaskan alur status, konfirmasi, close, reopen, assignment, kategori, dan prioritas.
3. Menentukan data minimum, visibility komentar, audit trail, dan kebutuhan privasi.
4. Menentukan isi dashboard dan kualitas layanan yang diharapkan.
5. Memastikan constraint tugas dan bukti delivery dipahami oleh `STK-007` dan `STK-008`.

## Source Register

| ID | Sumber | Jenis | Reliability | Catatan |
|---|---|---|---|---|
| SRC-001 | Brief/rubrik tugas Software Engineering | Dokumen otoritatif | Tinggi | Menentukan studi kasus, fitur wajib, minimum, dan deployment |
| SRC-002 | `CASE.md` | Ringkasan studi kasus | Tinggi | Diturunkan dari brief tugas |
| SRC-003 | `docs/software-engineering/01-inception.md` | Artefak upstream | Sedang-Tinggi | Baseline awal; sebagian asumsi belum direview |
| SRC-004 | Percakapan pengguna 30 Juni 2026 | Stakeholder proxy | Tinggi untuk keputusan proyek | Pengguna meminta repository GitHub dibuat public |

## Technique Plan

| Stakeholder | Teknik | Alasan | Output yang Diharapkan |
|---|---|---|---|
| STK-001 Pelapor | Interview + scenario walkthrough | Menggali data laporan, visibility, dan konfirmasi | Raw needs pelapor dan pain points |
| STK-002 Administrator | Semi-structured interview + workflow workshop | Memiliki pengaruh terbesar pada aturan workflow | Status authority, priority, category, assignment, close/reopen |
| STK-003 Teknisi | Interview + task walkthrough | Menggali aktivitas operasional dan exception | Assignment, acceptance, progress, resolve, reassignment |
| STK-004 Manajer fasilitas | Interview + dashboard card sorting | Menentukan informasi ringkas yang berguna | Metrik, filter, periode, dan drill-down |
| STK-005 Unit fasilitas | Workshop | Menyelesaikan konflik antarperan dan ownership | Business policy dan escalation |
| STK-006 TI/keamanan | Interview + document review | Menentukan keamanan, privasi, dan retensi | Access, data sensitivity, retention, performance |
| STK-008 Dosen/reviewer | Document analysis + clarification | Memastikan bukti tugas dan presentasi | Format review dan acceptance delivery |

# Document Analysis Results

## Explicit Raw Needs

| ID | Raw Need | Type | Source | Traceability |
|---|---|---|---|---|
| NEED-001 | Pelapor perlu membuat laporan fasilitas baru. | Explicit | SRC-001, SRC-002 | STK-001, GOAL-005, SCOPE-IN-001 |
| NEED-002 | Pengguna perlu melihat daftar dan detail laporan. | Explicit | SRC-001 | STK-001, STK-002, STK-003, GOAL-002, SCOPE-IN-002 |
| NEED-003 | Pengguna perlu mencari dan menyaring laporan. | Explicit | SRC-001 | STK-001, STK-002, STK-003, SCOPE-IN-002 |
| NEED-004 | Administrator perlu memeriksa laporan. | Explicit | SRC-001, SRC-002 | STK-002, GOAL-006, SCOPE-IN-003 |
| NEED-005 | Administrator perlu menentukan kategori dan prioritas. | Explicit | SRC-001 | STK-002, GOAL-006, SCOPE-IN-004 |
| NEED-006 | Administrator perlu menugaskan teknisi. | Explicit | SRC-001, SRC-002 | STK-002, STK-003, SCOPE-IN-005 |
| NEED-007 | Teknisi perlu melihat dan menerima tugas. | Explicit | SRC-001 | STK-003, GOAL-007, SCOPE-IN-006 |
| NEED-008 | Teknisi perlu memperbarui progres dan menandai pekerjaan selesai. | Explicit | SRC-001, SRC-002 | STK-003, GOAL-007, SCOPE-IN-006 |
| NEED-009 | Sistem perlu mendukung alur `SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`. | Policy/rule candidate | SRC-001 | STK-001, STK-002, STK-003, GOAL-001, SCOPE-IN-007 |
| NEED-010 | Pengguna perlu menambahkan komentar atau catatan pada laporan. | Explicit | SRC-001 | STK-001, STK-002, STK-003, SCOPE-IN-008 |
| NEED-011 | Sistem perlu menyimpan riwayat perubahan status. | Explicit | SRC-001 | GOAL-002, GOAL-004, SCOPE-IN-009 |
| NEED-012 | Pelapor perlu memberikan konfirmasi hasil. | Explicit | SRC-001, SRC-002 | STK-001, GOAL-005, SCOPE-IN-010 |
| NEED-013 | Administrator perlu menutup atau membuka kembali laporan. | Explicit | SRC-001, SRC-002 | STK-002, GOAL-006, SCOPE-IN-011 |
| NEED-014 | Manajer fasilitas perlu melihat dashboard dan laporan ringkas. | Explicit | SRC-001 | STK-004, GOAL-003, GOAL-008, SCOPE-IN-012 |
| NEED-015 | Data laporan perlu disimpan secara persisten di Cloudflare D1. | Constraint | SRC-001 | GOAL-010, CONSTRAINT-002 |
| NEED-016 | Aplikasi perlu tersedia melalui URL Cloudflare publik. | Constraint | SRC-001 | GOAL-009, CONSTRAINT-001, CONSTRAINT-002 |
| NEED-017 | Proyek perlu menunjukkan traceability requirement sampai test. | Constraint | SRC-001 | STK-008, GOAL-013 |
| NEED-018 | Penggunaan AI perlu menyimpan output awal, koreksi manusia, dan hasil final. | Constraint | SRC-001 | STK-007, STK-008, GOAL-014, CONSTRAINT-004, CONSTRAINT-009 |
| NEED-019 | Pekerjaan perlu dikelola melalui GitHub issue, branch, commit, pull request, dan review. | Constraint | SRC-001 | STK-007, STK-008, GOAL-015, CONSTRAINT-007 |
| NEED-020 | Proyek perlu memiliki automated testing dan deployment yang dapat diverifikasi. | Constraint | SRC-001 | GOAL-012, GOAL-016, CONSTRAINT-008 |
| NEED-021 | Repository public tidak boleh berisi token, credential, secret, atau data pribadi nyata. | Constraint | SRC-003, SRC-004 | STK-006, STK-007, CONSTRAINT-010, OQ-026 |

## Confirmed Stakeholder Responses

| Response ID | Question | Answer | Source | Result |
|---|---|---|---|---|
| RESP-001 | OQ-026: Apakah repository public diperbolehkan memuat dokumen proyek? | Pengguna meminta repository dibuat public. Dokumen proyek boleh disimpan public, tetapi secret dan data pribadi tetap dilarang. | SRC-004 | OQ-026 terjawab; NEED-021 dikonfirmasi |

## Pain Points to Validate

| ID | Candidate Pain Point | Status | Source/Reason |
|---|---|---|---|
| PAIN-001 | Pelapor mungkin kesulitan mengetahui apakah laporan sudah ditangani. | Inferred - perlu validasi | GOAL-002 dan alur kasus |
| PAIN-002 | Administrator mungkin kesulitan menjaga laporan tidak terlewat dan menugaskan teknisi yang tepat. | Inferred - perlu validasi | GOAL-004 dan OQ-003/OQ-010 |
| PAIN-003 | Teknisi mungkin kesulitan membedakan tugas baru, aktif, dan selesai. | Inferred - perlu validasi | NEED-007/008 |
| PAIN-004 | Manajer mungkin tidak memiliki ringkasan konsisten untuk memantau backlog dan penyelesaian. | Inferred - perlu validasi | GOAL-003 dan OQ-021 |

# Question Bank

## STK-002 - Administrator

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-001 | OQ-001 | Siapa pemilik proses bisnis dan siapa yang menjalankan peran administrator? | Menentukan ownership dan authority | Pending |
| Q-002 | OQ-004 | Laporan mana yang boleh dilihat administrator dan pelapor? | Menentukan visibility | Pending |
| Q-003 | OQ-005 | Siapa yang boleh melakukan setiap transisi status? | Menentukan status authority | Priority round 1 |
| Q-004 | OQ-007, OQ-008 | Apakah konfirmasi pelapor wajib sebelum close dan apa yang terjadi jika tidak ada respons? | Menentukan closure policy | Priority round 1 |
| Q-005 | OQ-009 | Kondisi apa yang mengizinkan reopen dan siapa yang menyetujuinya? | Menentukan reopen policy | Pending |
| Q-006 | OQ-011 | Apa arti prioritas rendah, sedang, tinggi, dan darurat? | Menentukan priority policy | Priority round 1 |
| Q-007 | OQ-012 | Apakah kategori tetap atau dapat dikelola administrator? | Menentukan category governance | Pending |
| Q-008 | OQ-019, OQ-020 | Apakah perlu komentar internal dan audit perubahan selain status? | Menentukan visibility dan audit | Priority round 1 |

## STK-003 - Teknisi

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-009 | OQ-003 | Apakah teknisi dibagi berdasarkan kategori keahlian? | Menentukan assignment criteria | Pending |
| Q-010 | OQ-006 | Apakah teknisi wajib menerima assignment sebelum mulai bekerja? | Menentukan acceptance flow | Priority round 1 |
| Q-011 | OQ-010 | Apakah satu laporan hanya memiliki satu teknisi aktif dan boleh dipindahkan? | Menentukan cardinality/reassignment need | Priority round 1 |
| Q-012 | OQ-015 | Data apa yang perlu dicatat ketika progres atau status berubah? | Menentukan audit data | Pending |

## STK-001 - Pelapor

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-013 | OQ-002 | Apakah mahasiswa dan dosen memiliki hak akses berbeda? | Menentukan actor variation | Pending |
| Q-014 | OQ-004 | Apakah pelapor hanya melihat laporan sendiri? | Menentukan privacy boundary | Pending |
| Q-015 | OQ-013 | Field apa saja yang wajib ketika laporan dibuat? | Menentukan data minimum | Pending |
| Q-016 | OQ-014 | Apakah lokasi dipilih dari daftar atau ditulis bebas? | Menentukan raw data need | Pending |
| Q-017 | OQ-007, OQ-008 | Bagaimana pelapor mengonfirmasi hasil dan apa yang terjadi jika tidak merespons? | Menentukan confirmation need | Priority round 1 |

## STK-004 - Manajer Fasilitas

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-018 | OQ-021 | Metrik apa yang paling penting pada dashboard? | Menentukan decision information | Priority round 1 |
| Q-019 | OQ-022 | Filter dan periode waktu apa yang diperlukan? | Menentukan reporting need | Pending |
| Q-020 | OQ-023 | Apakah ada target waktu review, assignment, dan penyelesaian? | Menentukan service target | Pending |

## STK-006 - TI/Keamanan

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-021 | OQ-017 | Apakah baseline membutuhkan autentikasi atau role cukup disimulasikan? | Menentukan access constraint | Priority round 1 |
| Q-022 | OQ-018 | Data pribadi apa yang boleh disimpan? | Menentukan privacy boundary | Pending |
| Q-023 | OQ-016 | Berapa lama data laporan perlu disimpan? | Menentukan retention need | Pending |
| Q-024 | OQ-024 | Berapa target performa yang diharapkan? | Menentukan measurable quality need | Pending |

## STK-008 - Dosen/Reviewer dan Delivery

| Q ID | Inception Link | Question | Purpose | Status |
|---|---|---|---|---|
| Q-025 | OQ-025 | Siapa yang melakukan human review pada setiap work product? | Menentukan evidence owner | Pending |
| Q-026 | OQ-026 | Apakah evidence boleh berada pada repository public? | Menentukan publication constraint | Answered by RESP-001 |
| Q-027 | OQ-027 | Adakah format presentasi, durasi demo, atau deadline tambahan? | Menentukan delivery constraint | Pending |

# Round 1 Decision Interview

Pengguna bertindak sebagai stakeholder proxy/project owner untuk keputusan awal berikut. Rekomendasi hanya kandidat dan belum menjadi jawaban sebelum disetujui pengguna.

| Decision | Related Questions | Recommended Candidate | Stakeholder Answer | Status |
|---|---|---|---|---|
| DEC-001 Status authority | Q-003 | Pelapor submit/confirm; administrator review/assign/close/reopen; teknisi accept/start/resolve | Belum dijawab | Pending |
| DEC-002 Authentication baseline | Q-021 | Role selector dengan data pengguna demo; tanpa Google login dan tanpa credential nyata | Belum dijawab | Pending |
| DEC-003 Confirmation and close | Q-004, Q-017 | Pelapor mengonfirmasi hasil; administrator menutup setelah konfirmasi; tidak ada auto-close pada baseline | Belum dijawab | Pending |
| DEC-004 Priority model | Q-006 | LOW, MEDIUM, HIGH, URGENT berdasarkan dampak dan urgensi; SLA numerik ditunda sampai disepakati | Belum dijawab | Pending |
| DEC-005 Assignment | Q-010, Q-011 | Satu teknisi aktif per laporan; teknisi menerima tugas; administrator dapat reassign dengan audit trail | Belum dijawab | Pending |
| DEC-006 Comment visibility | Q-008 | Pisahkan komentar publik dan catatan internal; keduanya memiliki author dan timestamp | Belum dijawab | Pending |
| DEC-007 Dashboard | Q-018 | Total laporan, count per status/category/priority, open vs resolved, dan recent activity | Belum dijawab | Pending |

# Ambiguities and Conflicts

## Ambiguities

- **AMB-001**: Authentication dan role enforcement belum diputuskan (`OQ-017`).
- **AMB-002**: Authority transisi status belum diputuskan (`OQ-005`).
- **AMB-003**: Confirmation, timeout, close, dan reopen belum memiliki policy final (`OQ-007` sampai `OQ-009`).
- **AMB-004**: Priority belum memiliki definisi dan SLA (`OQ-011`, `OQ-023`).
- **AMB-005**: Assignment satu atau banyak teknisi belum diputuskan (`OQ-010`).
- **AMB-006**: Visibility komentar dan audit event belum diputuskan (`OQ-019`, `OQ-020`).
- **AMB-007**: Metrik dashboard dan periode laporan belum diputuskan (`OQ-021`, `OQ-022`).

## Conflicts

Belum ada konflik stakeholder yang terobservasi. Potensi konflik antara kemudahan demonstrasi dan keamanan role akan dievaluasi setelah DEC-002 dijawab.

# Handoff Readiness for 03 - Specification

Belum siap. Raw needs dari document analysis sudah tersedia, tetapi `DEC-001` sampai `DEC-007` perlu dijawab dan ambiguitas utama perlu dikurangi sebelum functional requirements dan business rules ditetapkan.
