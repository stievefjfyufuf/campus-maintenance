# Requirements Specification

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 03 - Specification |
| Status | Disetujui untuk Step 4 - Prioritization |
| Tanggal dibuat | 30 Juni 2026 |
| Tanggal disetujui | 1 Juli 2026 |
| Human reviewer | Stieve - Project owner/stakeholder proxy |
| Upstream | `docs/software-engineering/01-inception.md`, `docs/software-engineering/02-elicitation.md` |
| Baseline target | Required baseline akademik |
| Tahap berikutnya | 04 - Prioritization |

Dokumen ini mengubah kebutuhan mentah yang sudah dielisitasi menjadi requirement yang spesifik dan dapat diuji. Prioritas ditetapkan pada Step 4. Item yang semula provisional telah diselesaikan melalui DEC-017 sampai DEC-022 dan CR-001.

## Human Review Record

Pada 1 Juli 2026, Stieve sebagai project owner/stakeholder proxy menyatakan **“saya setujui step 3”**. Pada review Step 5, Q-028 sampai Q-032 kemudian diselesaikan melalui DEC-017 sampai DEC-021; Q-033 tetap terbuka sebagai metadata delivery non-blocking.

## Scope Guardrails

- Baseline mencakup laporan fasilitas, workflow, komentar, audit history, dashboard, role selector demo, Cloudflare Worker, dan D1.
- Upload foto/object storage dan notifikasi email tetap out of scope berdasarkan `SCOPE-OUT-001` dan `SCOPE-OUT-002`.
- Role selector dan pengguna dummy adalah mekanisme demonstrasi, bukan autentikasi produksi.
- Penutupan tanpa respons dilakukan manual oleh administrator setelah 5 hari kerja dengan alasan audit (`DEC-017`).
- Reopen mengembalikan laporan ke `UNDER_REVIEW` dan mencatat event `REOPENED` pada audit history (`DEC-018`).
- Hari kerja baseline adalah Senin–Jumat tanpa kalender libur khusus (`DEC-019`).
- Teknisi hanya dapat membuka detail laporan yang ditugaskan kepadanya (`DEC-021`).

# Actors and Access Boundary

| Actor | Baseline Access |
|---|---|
| Pelapor (`STK-001`) | Membuat laporan; melihat laporan sendiri; berkomentar; mengonfirmasi hasil; meminta reopen |
| Administrator (`STK-002`) | Melihat semua laporan; review; mengelola kategori/prioritas; assign/reassign; komentar internal; close; menyetujui reopen |
| Teknisi (`STK-003`) | Melihat tugas yang ditugaskan; menerima tugas; memperbarui progres; memberi komentar internal; resolve |
| Manajer fasilitas (`STK-004`) | Melihat semua laporan/dashboard; assign; menyetujui reopen; melihat rekap dan audit |

# Functional Requirements

| ID | Requirement | Source | Actor/Goal | Priority | Status | AC |
|---|---|---|---|---|---|---|
| REQ-001 | Sistem harus memungkinkan pelapor membuat laporan dengan judul, deskripsi, lokasi utama, detail lokasi opsional, kategori, prioritas awal, identitas, tanggal, dan kontak. | NEED-001, NEED-026, NEED-027 | STK-001; GOAL-005 | TBD | Ready | AC-001, AC-002 |
| REQ-002 | Sistem harus memberi setiap laporan ID unik, status awal `SUBMITTED`, waktu pembuatan, dan menyimpannya secara persisten. | NEED-001, NEED-007, NEED-012 | STK-001; GOAL-001/005/010 | TBD | Ready | AC-003, AC-004 |
| REQ-003 | Sistem harus menampilkan daftar dan detail laporan sesuai batas akses aktor. | NEED-002, NEED-015 | STK-001–STK-004; GOAL-002 | TBD | Ready | AC-005, AC-006 |
| REQ-004 | Sistem harus menyediakan pencarian dan filter laporan berdasarkan ID/judul, status, kategori, prioritas, lokasi, teknisi, pelapor, dan rentang tanggal sesuai kewenangan aktor. | NEED-003, NEED-029 | STK-002–STK-004; GOAL-002/003/008 | TBD | Ready | AC-007, AC-008 |
| REQ-005 | Administrator harus dapat mengubah laporan `SUBMITTED` menjadi `UNDER_REVIEW` dan sistem harus menolak aktor yang tidak berwenang. | NEED-007, NEED-016, DEC-001 | STK-002; GOAL-001/006 | TBD | Ready | AC-009, AC-010 |
| REQ-006 | Administrator harus dapat menetapkan atau mengubah kategori dan prioritas berdasarkan LOW, MEDIUM, HIGH, atau URGENT. | NEED-004, NEED-019 | STK-002; GOAL-004/006 | TBD | Ready | AC-011, AC-012 |
| REQ-007 | Administrator harus dapat menambah, mengubah, dan menonaktifkan kategori; kategori yang sudah digunakan tidak dapat dihapus permanen. | NEED-020, DEC-008 | STK-002; GOAL-006 | TBD | Ready | AC-013, AC-014 |
| REQ-008 | Administrator atau manajer harus dapat menugaskan tepat satu teknisi aktif yang memiliki keahlian relevan ke laporan `UNDER_REVIEW`, sehingga status menjadi `ASSIGNED`. | NEED-005, NEED-016, NEED-023 | STK-002–STK-004; GOAL-006/007 | TBD | Ready | AC-015, AC-016 |
| REQ-009 | Administrator harus dapat memindahkan assignment ke teknisi lain dengan alasan, waktu, aktor, teknisi lama, dan teknisi baru yang tercatat. | NEED-022, NEED-023 | STK-002/003; GOAL-004/006/007 | TBD | Ready | AC-017, AC-018 |
| REQ-010 | Teknisi yang ditugaskan harus menerima assignment sebelum dapat memulai pekerjaan dan mengubah status menjadi `IN_PROGRESS`. | NEED-006, NEED-016, NEED-023, DEC-005 | STK-003; GOAL-007 | TBD | Ready | AC-019, AC-020 |
| REQ-011 | Teknisi yang ditugaskan harus dapat menambahkan update progres berisi catatan, tindakan, kendala opsional, dan estimasi penyelesaian bila pekerjaan belum selesai. | NEED-006, NEED-024 | STK-003; GOAL-002/007 | TBD | Ready | AC-021, AC-022 |
| REQ-012 | Teknisi yang ditugaskan harus dapat mengubah laporan `IN_PROGRESS` menjadi `RESOLVED` disertai ringkasan tindakan penyelesaian. | NEED-006, NEED-007, DEC-001 | STK-003; GOAL-001/007 | TBD | Ready | AC-023, AC-024 |
| REQ-013 | Pelapor pemilik laporan harus dapat mengonfirmasi laporan `RESOLVED` sebagai selesai sehingga status menjadi `CLOSED`. | NEED-010, DEC-001/003 | STK-001; GOAL-001/005 | TBD | Ready | AC-025, AC-026 |
| REQ-014 | Sistem harus menandai laporan `RESOLVED` yang belum dikonfirmasi selama 3 hari kerja sebagai membutuhkan pengingat di dalam aplikasi. | NEED-017, CONFLICT-002 | STK-001/002; GOAL-004/005/006 | TBD | Ready | AC-027, AC-028 |
| REQ-015 | Administrator harus dapat menutup manual laporan `RESOLVED` tanpa respons setelah 5 hari kerja dengan alasan dan audit event. | NEED-017, DEC-003, DEC-017 | STK-002; GOAL-001/004/006 | TBD | Ready | AC-029, AC-030 |
| REQ-016 | Pelapor harus dapat meminta reopen untuk laporan `RESOLVED` atau `CLOSED` dengan alasan wajib; administrator atau manajer harus dapat menyetujui atau menolak permintaan tersebut. | NEED-010, NEED-018, DEC-001 | STK-001/002/004; GOAL-004/005/006 | TBD | Ready | AC-031, AC-032 |
| REQ-017 | Setelah permintaan reopen disetujui, sistem harus mencatat event `REOPENED` dan mengembalikan laporan ke `UNDER_REVIEW`. | NEED-018, DEC-018 | STK-002/004; GOAL-001/004/006 | TBD | Ready | AC-033, AC-034 |
| REQ-018 | Sistem harus menyediakan komentar publik yang terlihat oleh pelapor dan catatan internal yang hanya terlihat oleh administrator, teknisi terkait, dan manajer. | NEED-008, NEED-021, DEC-006 | STK-001–STK-004; GOAL-002 | TBD | Ready | AC-035, AC-036 |
| REQ-019 | Sistem harus mencatat audit history untuk perubahan status, kategori, prioritas, assignment, reopen, dan close, masing-masing dengan waktu, aktor, nilai lama, nilai baru, serta alasan bila diwajibkan. | NEED-009, NEED-022 | STK-002/004/006; GOAL-002/004/012 | TBD | Ready | AC-037, AC-038 |
| REQ-020 | Sistem harus menyediakan dashboard manajer berisi jumlah laporan masuk, distribusi status/kategori/prioritas, rata-rata waktu penyelesaian, laporan terlambat, beban teknisi, jumlah reopen, dan tren periode. | NEED-011, NEED-028 | STK-004; GOAL-003/008 | TBD | Ready | AC-039, AC-040 |
| REQ-021 | Dashboard harus mendukung filter status, kategori, prioritas, lokasi, teknisi, pelapor, serta periode harian, mingguan, bulanan, semester, dan rentang kustom. | NEED-029, DEC-007 | STK-004; GOAL-003/008 | TBD | Ready | AC-041, AC-042 |
| REQ-022 | Sistem harus menyediakan role selector dengan pengguna dummy untuk berpindah konteks pelapor, administrator, teknisi, dan manajer selama demonstrasi. | NEED-031, DEC-002 | STK-006–STK-008; GOAL-009/016 | TBD | Ready | AC-043, AC-044 |
| REQ-023 | Sistem harus menghitung target waktu review, assignment, mulai kerja, dan penyelesaian berdasarkan tingkat prioritas serta menandai laporan yang melewati target; hari kerja baseline adalah Senin–Jumat tanpa kalender libur khusus. | NEED-030, DEC-019 | STK-002/004; GOAL-003/004 | TBD | Ready | AC-045, AC-046 |
| REQ-024 | Sistem harus menggunakan data laporan yang tersimpan di D1 untuk daftar, detail, audit, dan dashboard; data tidak boleh berupa angka statis. | NEED-012, ASSUMP-008 | STK-001–STK-004; GOAL-010/012 | TBD | Ready | AC-047, AC-048 |

# Business Rules

| ID | Rule | Source | Verification |
|---|---|---|---|
| BR-001 | Setiap laporan memiliki tepat satu status aktif. | ASSUMP-005, NEED-007 | Uji constraint dan transisi status |
| BR-002 | Alur normal adalah `SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`. | SCOPE-IN-007, DEC-001 | Uji transition matrix |
| BR-003 | Hanya admin dapat review; admin/manajer dapat assign; teknisi terkait dapat start/resolve; pelapor atau admin sesuai aturan dapat close. | Q-003, DEC-001 | Uji authorization per transisi |
| BR-004 | Satu laporan hanya memiliki satu teknisi aktif; reassignment harus mengakhiri assignment lama dan diaudit. | NEED-023, DEC-005 | Uji cardinality dan history |
| BR-005 | Teknisi tidak dapat memulai pekerjaan sebelum menerima assignment. | NEED-016, DEC-005 | Uji transisi sebelum/sesudah accept |
| BR-006 | Kategori yang pernah digunakan hanya dapat dinonaktifkan, bukan dihapus permanen. | NEED-020, DEC-008 | Uji referential integrity |
| BR-007 | LOW tidak menghambat aktivitas utama; MEDIUM berdampak sebagian dengan alternatif; HIGH menghambat aktivitas penting; URGENT menyangkut keselamatan, keamanan, kerusakan besar, atau layanan utama. | NEED-019, Q-006 | Uji pilihan dan dokumentasi prioritas |
| BR-008 | Target review adalah 1 hari kerja; assignment 1 hari kerja setelah review; mulai kerja 1 hari kerja setelah assignment diterima. | NEED-030, Q-020 | Uji perhitungan due time |
| BR-009 | Target penyelesaian LOW 7, MEDIUM 5, HIGH 2 hari kerja; URGENT ditangani pada hari yang sama. | NEED-030, Q-020 | Uji due time per prioritas |
| BR-010 | Penutupan tanpa respons hanya dapat dilakukan admin setelah 5 hari kerja dan wajib memiliki alasan audit. | NEED-017, DEC-017/019 | Uji batas waktu dan audit |
| BR-011 | Reopen memerlukan alasan pelapor dan persetujuan admin atau manajer; keputusan harus diaudit. | NEED-018, DEC-001 | Uji validasi dan approval |
| BR-012 | Pelapor hanya melihat laporan sendiri; teknisi hanya melihat detail laporan yang ditugaskan; admin/manajer melihat semua. | NEED-015, DEC-021 | Uji access matrix |
| BR-013 | Catatan internal tidak pernah terlihat dalam konteks pelapor. | NEED-021, DEC-006 | Uji API dan UI visibility |
| BR-014 | Upload file dan email tidak termasuk baseline; pengingat hanya ditampilkan di dalam aplikasi. | CONFLICT-001/002, SCOPE-OUT-001/002 | Uji scope dan dependency |

# Non-Functional Requirements

| ID | Attribute | Requirement | Measurement | Source |
|---|---|---|---|---|
| NFR-001 | Performance | Daftar dan hasil pencarian harus ditampilkan maksimal 2 detik pada dataset baseline. | p95 ≤2 detik pada 1.000 laporan, 50 pengguna, 20 teknisi, dan 20 kategori. | NEED-034, DEC-020 |
| NFR-002 | Performance | Detail laporan harus ditampilkan maksimal 1 detik dan dashboard maksimal 3 detik pada dataset baseline. | p95 detail ≤1 detik; p95 dashboard ≤3 detik pada dataset DEC-020. | NEED-034, DEC-020 |
| NFR-003 | Security/Privacy | Akses data dan aksi harus mengikuti role dan ownership; catatan internal tidak boleh bocor ke response pelapor. | Seluruh negative authorization tests lulus. | NEED-015/021/032, CONSTRAINT-010 |
| NFR-004 | Data Protection | Repository dan data demo tidak boleh memuat secret, credential, password asli/plain text, identitas sensitif, finansial, kesehatan, atau data pribadi nyata. | Secret scan dan checklist data demo menghasilkan 0 temuan kritis. | NEED-014/032, DEC-010 |
| NFR-005 | Reliability/Integrity | Operasi perubahan status, assignment, dan audit event terkait harus atomik sehingga tidak ada state tanpa history atau lebih dari satu teknisi aktif. | Integration tests kegagalan transaksi menunjukkan rollback lengkap. | NEED-009/022/023, GOAL-012 |
| NFR-006 | Persistence | Laporan yang berhasil dibuat atau diperbarui harus tetap tersedia setelah reload dan restart deployment, menggunakan Cloudflare D1. | Persistence smoke test lulus pada local dan production. | NEED-012, GOAL-010 |
| NFR-007 | Usability | UI utama harus berbahasa Indonesia, menampilkan label field, pesan validasi, empty/loading/error state, dan status aksi yang jelas. | Checklist seluruh alur prioritas lulus tanpa pesan kosong/ambigu. | ASSUMP-011, GOAL-005–008 |
| NFR-008 | Accessibility | Form dan aksi utama harus dapat digunakan dengan keyboard dan kontrol memiliki nama yang dapat dikenali assistive technology. | Automated accessibility scan tanpa critical violation dan walkthrough keyboard lulus. | GOAL-005–008 |
| NFR-009 | Maintainability | Frontend React, Worker API, dan akses D1 harus memiliki batas tanggung jawab yang jelas dan build/lint/test otomatis. | Build, lint, dan test lulus; dependency antarlapisan mengikuti desain Step 6. | GOAL-011/012/015 |
| NFR-010 | Auditability | Audit history tidak dapat diubah melalui fungsi aplikasi baseline dan ditampilkan urut waktu. | Tidak ada endpoint update/delete history; integration test urutan dan immutability lulus. | NEED-009/022, GOAL-002/004 |
| NFR-011 | Retention | Data laporan, komentar, dan audit history harus dapat dipertahankan minimal 3 tahun sebelum proses arsip. | Schema tidak menerapkan auto-delete <3 tahun; retention policy direview. | NEED-033, DEC-009 |
| NFR-012 | Deployment | Aplikasi harus dapat diakses melalui URL Cloudflare publik dan beroperasi dalam batas free tier yang dipilih. | Production smoke test lulus; konfigurasi tidak membutuhkan layanan berbayar. | NEED-012, CONSTRAINT-001/002 |

# User Stories and Acceptance Criteria

## US-001 — Membuat laporan

Sebagai pelapor, saya ingin membuat laporan fasilitas dengan data yang jelas agar masalah dapat ditinjau dan ditangani.

- **AC-001** — Given pelapor mengisi seluruh field wajib dengan nilai valid, when formulir dikirim, then sistem membuat laporan dan menampilkan ID unik serta status `SUBMITTED`.
- **AC-002** — Given satu atau lebih field wajib kosong, when formulir dikirim, then sistem tidak membuat laporan dan menampilkan pesan validasi pada field terkait.

## US-002 — Melihat laporan sesuai akses

Sebagai pengguna, saya ingin melihat daftar dan detail laporan yang diizinkan agar informasi laporan tidak terbuka kepada pihak yang tidak berwenang.

- **AC-003** — Given laporan berhasil dibuat, when halaman dimuat ulang, then laporan tetap tersedia dengan data dan status yang sama.
- **AC-004** — Given dua laporan dibuat, when sistem memberi ID, then kedua ID berbeda dan masing-masing menunjuk ke laporan yang benar.
- **AC-005** — Given pelapor A membuka daftar, when data dimuat, then hanya laporan milik pelapor A yang tampil.
- **AC-006** — Given pelapor A mencoba membuka ID laporan pelapor B, when request diproses, then akses ditolak tanpa membocorkan detail laporan B.

## US-003 — Mencari dan memfilter laporan

Sebagai administrator atau manajer, saya ingin mencari dan memfilter laporan agar backlog relevan cepat ditemukan.

- **AC-007** — Given terdapat laporan dari beberapa status dan kategori, when filter status dan kategori diterapkan, then hanya laporan yang memenuhi semua filter tampil.
- **AC-008** — Given kata kunci cocok dengan ID atau judul, when pencarian dilakukan, then hasil yang cocok tampil dan akses tiap hasil tetap mengikuti role.

## US-004 — Review dan triage

Sebagai administrator, saya ingin meninjau, mengategorikan, dan memprioritaskan laporan agar laporan siap ditugaskan.

- **AC-009** — Given laporan `SUBMITTED`, when admin memilih mulai review, then status menjadi `UNDER_REVIEW` dan audit event tercatat.
- **AC-010** — Given aktor selain admin mencoba transisi yang sama, when request diproses, then status tidak berubah dan akses ditolak.
- **AC-011** — Given laporan `UNDER_REVIEW`, when admin memilih kategori aktif dan prioritas valid, then nilai baru tersimpan dan tampil pada detail.
- **AC-012** — Given prioritas diubah, when perubahan berhasil, then audit menyimpan aktor, waktu, nilai lama, dan nilai baru.

## US-005 — Mengelola kategori

Sebagai administrator, saya ingin mengelola kategori tanpa merusak riwayat agar klasifikasi tetap relevan dan konsisten.

- **AC-013** — Given nama kategori baru valid dan unik, when admin menyimpan, then kategori tersedia untuk laporan baru.
- **AC-014** — Given kategori telah digunakan, when admin mencoba menghapus permanen, then sistem menolak dan menyediakan opsi nonaktif.

## US-006 — Assignment dan reassignment

Sebagai administrator atau manajer, saya ingin menugaskan teknisi yang sesuai agar ada penanggung jawab yang jelas.

- **AC-015** — Given laporan `UNDER_REVIEW` dan teknisi dengan keahlian relevan dipilih, when assignment disimpan, then status menjadi `ASSIGNED` dan teknisi menjadi satu-satunya assignee aktif.
- **AC-016** — Given teknisi tidak cocok dengan kategori atau tidak aktif, when assignment diajukan, then sistem menolak dengan alasan yang jelas.
- **AC-017** — Given laporan memiliki teknisi aktif, when admin reassign dengan alasan valid, then teknisi lama nonaktif dan teknisi baru menjadi assignee aktif.
- **AC-018** — Given reassignment berhasil, when history dibuka, then teknisi lama, teknisi baru, alasan, aktor, dan waktu terlihat.

## US-007 — Menerima dan mengerjakan tugas

Sebagai teknisi, saya ingin menerima tugas dan mencatat progres agar pekerjaan dapat dipantau.

- **AC-019** — Given assignment belum diterima, when teknisi mencoba memulai pekerjaan, then status tetap `ASSIGNED` dan sistem meminta acceptance.
- **AC-020** — Given teknisi yang ditugaskan menerima dan memulai tugas, when aksi selesai, then status menjadi `IN_PROGRESS` dan waktunya diaudit.
- **AC-021** — Given laporan `IN_PROGRESS`, when teknisi menyimpan progres valid, then catatan, tindakan, kendala, estimasi, aktor, dan waktu tersimpan.
- **AC-022** — Given pengguna yang bukan teknisi aktif mencoba memperbarui progres, when request diproses, then perubahan ditolak.

## US-008 — Menyelesaikan pekerjaan

Sebagai teknisi, saya ingin menandai pekerjaan selesai dengan ringkasan agar pelapor dapat memeriksa hasilnya.

- **AC-023** — Given laporan `IN_PROGRESS` dan ringkasan penyelesaian diisi, when teknisi aktif memilih resolve, then status menjadi `RESOLVED`.
- **AC-024** — Given ringkasan penyelesaian kosong, when resolve diajukan, then sistem menolak dan status tetap `IN_PROGRESS`.

## US-009 — Konfirmasi dan close

Sebagai pelapor, saya ingin mengonfirmasi hasil agar laporan yang selesai dapat ditutup.

- **AC-025** — Given laporan milik pelapor berstatus `RESOLVED`, when pelapor memilih setuju/tutup, then status menjadi `CLOSED` dan event tercatat.
- **AC-026** — Given laporan bukan milik pelapor atau bukan `RESOLVED`, when close diajukan, then sistem menolak tanpa mengubah status.
- **AC-027** — Given laporan tetap `RESOLVED` selama 3 hari kerja, when admin atau pelapor membuka daftar terkait, then indikator pengingat tampil.
- **AC-028** — Given laporan belum mencapai 3 hari kerja, when daftar dibuka, then indikator pengingat belum tampil.
- **AC-029** — Given laporan `RESOLVED` tanpa respons selama minimal 5 hari kerja, when admin menutup dengan alasan, then status menjadi `CLOSED` dan alasan tercatat.
- **AC-030** — Given batas 5 hari belum tercapai atau alasan kosong, when admin mencoba close tanpa respons, then sistem menolak.

## US-010 — Reopen laporan

Sebagai pelapor, saya ingin meminta reopen dengan alasan agar masalah yang belum selesai dapat ditangani kembali.

- **AC-031** — Given laporan milik pelapor berstatus `RESOLVED` atau `CLOSED`, when pelapor mengirim alasan reopen, then permintaan tercatat untuk review admin/manajer.
- **AC-032** — Given alasan kosong, when permintaan reopen dikirim, then sistem menolak dan status tidak berubah.
- **AC-033** — Given permintaan reopen valid, when admin/manajer menyetujui, then status menjadi `UNDER_REVIEW` dan event reopen tercatat.
- **AC-034** — Given permintaan ditolak, when keputusan disimpan, then status laporan tidak berubah dan alasan keputusan tercatat.

## US-011 — Komentar dan catatan internal

Sebagai tim operasional, saya ingin memisahkan komunikasi publik dan internal agar koordinasi tidak membocorkan catatan internal.

- **AC-035** — Given komentar publik ditambahkan, when pelapor pemilik membuka detail, then komentar, author, dan timestamp terlihat.
- **AC-036** — Given catatan internal ada, when detail dibuka dalam konteks pelapor, then isi dan keberadaan catatan internal tidak dikembalikan.

## US-012 — Audit history

Sebagai administrator atau manajer, saya ingin melihat audit history agar perubahan penting dapat ditelusuri.

- **AC-037** — Given kategori, prioritas, assignment, status, reopen, atau close berubah, when history dibuka, then event menampilkan aktor, waktu, jenis, nilai lama, dan nilai baru.
- **AC-038** — Given beberapa event terjadi, when history dibuka, then event tampil dalam urutan waktu yang konsisten dan tidak dapat diedit lewat UI/API baseline.

## US-013 — Dashboard manajer

Sebagai manajer fasilitas, saya ingin melihat metrik dan filter dashboard agar kondisi layanan dapat dievaluasi.

- **AC-039** — Given data laporan tersimpan, when dashboard dibuka, then seluruh metrik wajib dihitung dari data tersebut dan cocok dengan query verifikasi.
- **AC-040** — Given tidak ada laporan pada periode terpilih, when dashboard dibuka, then nilai nol dan empty state tampil tanpa error.
- **AC-041** — Given manajer memilih beberapa filter dan periode, when filter diterapkan, then seluruh kartu dan tren memakai subset yang sama.
- **AC-042** — Given rentang tanggal tidak valid, when filter diterapkan, then sistem menolak dengan pesan validasi.

## US-014 — Demonstrasi berbasis peran

Sebagai reviewer, saya ingin berpindah pengguna dummy dan peran agar seluruh alur dapat didemonstrasikan tanpa credential nyata.

- **AC-043** — Given role selector dibuka, when pengguna dummy dipilih, then UI menampilkan identitas/peran aktif dan hanya aksi yang diizinkan.
- **AC-044** — Given konteks berganti dari admin ke pelapor, when halaman data dibuka, then data admin tidak tetap terlihat dan akses pelapor diterapkan.

## US-015 — Memantau target layanan

Sebagai administrator atau manajer, saya ingin melihat laporan yang melewati target agar keterlambatan dapat ditindaklanjuti.

- **AC-045** — Given timestamp workflow dan prioritas tersedia, when due time dihitung, then sistem menerapkan BR-008 dan BR-009 secara konsisten.
- **AC-046** — Given waktu saat ini melewati due time pada tahap aktif, when daftar/dashboard dibuka, then laporan ditandai terlambat tepat satu kali.

## US-016 — Persistensi data

Sebagai pengguna, saya ingin perubahan yang berhasil tetap tersimpan agar informasi tidak hilang.

- **AC-047** — Given laporan dibuat atau diperbarui dengan sukses, when aplikasi direload, then nilai terbaru dibaca kembali dari D1.
- **AC-048** — Given dashboard dibuka setelah data laporan berubah, when data dimuat ulang, then metrik merefleksikan perubahan tanpa angka statis.

# Traceability Matrix

| Requirement | Needs | Goals | Stakeholders | Related Rules | Test Link |
|---|---|---|---|---|---|
| REQ-001–REQ-004 | NEED-001/002/003/015/026/027/029 | GOAL-002/003/005/008/010 | STK-001–STK-004 | BR-012 | TBD Step 12 |
| REQ-005–REQ-007 | NEED-004/007/016/019/020 | GOAL-001/004/006 | STK-002/STK-004 | BR-002/003/006/007 | TBD Step 12 |
| REQ-008–REQ-012 | NEED-005/006/016/022/023/024 | GOAL-001/002/004/006/007 | STK-002–STK-004 | BR-002–005 | TBD Step 12 |
| REQ-013–REQ-017 | NEED-010/017/018 | GOAL-001/004/005/006 | STK-001/002/004 | BR-002/003/010/011 | TBD Step 12 |
| REQ-018–REQ-019 | NEED-008/009/021/022 | GOAL-002/004/012 | STK-001–STK-004/STK-006 | BR-013 | TBD Step 12 |
| REQ-020–REQ-021 | NEED-011/028/029 | GOAL-003/008 | STK-004 | BR-008/009 | TBD Step 12 |
| REQ-022 | NEED-031 | GOAL-009/016 | STK-006–STK-008 | BR-012 | TBD Step 12 |
| REQ-023 | NEED-030 | GOAL-003/004 | STK-002/STK-004 | BR-008/009 | TBD Step 12 |
| REQ-024 | NEED-012 | GOAL-010/012 | STK-001–STK-004 | — | TBD Step 12 |
| NFR-001–NFR-012 | NEED-009/012/014/015/021/022/023/032/033/034 | GOAL-002/004/005–016 | STK-001–STK-010 | BR-004/012–014 | TBD Step 12 |

# Resolved Validation Decisions and Open Delivery Question

| ID | Draft Assumption / Question | Affected Requirements | Required Resolution |
|---|---|---|---|
| Q-028 | Close manual oleh admin setelah 5 hari kerja. | REQ-015, BR-010, AC-029/030 | Resolved by DEC-017 |
| Q-029 | Reopen kembali ke `UNDER_REVIEW`, dengan event `REOPENED` di audit history. | REQ-017, BR-002, AC-033/034 | Resolved by DEC-018 |
| Q-030 | Hari kerja adalah Senin–Jumat tanpa kalender libur khusus. | REQ-014/015/023, BR-008–010 | Resolved by DEC-019 |
| Q-031 | Dataset: 1.000 laporan, 50 pengguna, 20 teknisi, 20 kategori. | NFR-001/002 | Resolved by DEC-020 |
| Q-032 | Teknisi hanya melihat laporan yang sudah ditugaskan. | REQ-003, BR-012, NFR-003 | Resolved by DEC-021 |
| Q-033 | Aturan presentasi/demo/deadline tambahan belum tersedia. | NFR-012 dan delivery plan | Perbarui ketika dosen memberi arahan |

# Excluded Requirements

| Candidate | Reason | Reconsideration Path |
|---|---|---|
| Upload foto/dokumen | `SCOPE-OUT-001`, `CONFLICT-001`; memerlukan object storage | Change request setelah baseline wajib selesai |
| Notifikasi email | `SCOPE-OUT-002`, `CONFLICT-002` | Change request; baseline memakai indikator in-app |
| Google login | `SCOPE-OUT-003`, DEC-002 | Pengembangan lanjutan setelah fitur utama stabil |
| QR lokasi, AI kategori, inventory, vendor, integrasi kampus, aplikasi native | `SCOPE-OUT-004`–`SCOPE-OUT-009` | Change request terpisah |

# Handoff to 04 — Prioritization

Requirement set siap diprioritaskan dengan catatan:

1. Step 4 menentukan urutan dan MVP tanpa mengubah arti requirement.
2. REQ-015, REQ-017, dan REQ-023 mengikuti DEC-017 sampai DEC-019.
3. Access boundary teknisi mengikuti least privilege pada DEC-021 dan tidak boleh diperluas diam-diam.
4. Fitur pada Excluded Requirements tidak boleh masuk MVP tanpa change request.
5. Prioritization perlu mempertimbangkan alur end-to-end, risiko authorization, audit integrity, serta constraint Cloudflare free tier.

## Quality Checklist

- [x] Tersedia 24 functional requirements (minimum tugas: 12).
- [x] Tersedia 12 non-functional requirements dengan metode ukur (minimum tugas: 6).
- [x] Tersedia 14 business rules (minimum tugas: 5).
- [x] Tersedia 16 user stories (minimum tugas: 10).
- [x] Setiap user story memiliki minimal dua acceptance criteria.
- [x] Tersedia 48 acceptance criteria yang observable dan testable.
- [x] Setiap requirement memiliki traceability ke NEED/GOAL/stakeholder.
- [x] Ambiguitas, asumsi, konflik scope, dan excluded features tetap terlihat.
- [x] Handoff ke Step 4 didefinisikan.
