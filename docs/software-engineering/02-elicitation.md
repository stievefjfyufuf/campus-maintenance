# Elicitation Notes

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 02 - Elicitation |
| Status | Selesai dengan tindak lanjut terbuka |
| Tanggal | 30 Juni 2026 |
| Upstream | `docs/software-engineering/01-inception.md` |
| Responden | Stieve — Project owner/stakeholder proxy |
| Teknik | Document analysis dan kuesioner terstruktur |
| Tahap berikutnya | 03 - Specification |

Dokumen ini menangkap kebutuhan mentah dan keputusan stakeholder. Isinya belum merupakan functional requirement atau desain teknis. Jawaban asli Q-001 sampai Q-027 digunakan sebagai evidence elicitation dan diringkas tanpa mengubah maksud responden.

## Elicitation Objectives

1. Memvalidasi ownership, aktor, dan hak akses dari `STK-001` sampai `STK-006`.
2. Menjelaskan alur status, konfirmasi, close, reopen, assignment, kategori, dan prioritas.
3. Menentukan data minimum, visibility komentar, audit trail, privasi, retensi, dan target performa.
4. Menentukan isi dashboard dan target layanan.
5. Memastikan constraint tugas serta bukti delivery dipahami oleh `STK-007` dan `STK-008`.

## Source Register

| ID | Sumber | Jenis | Reliability | Catatan |
|---|---|---|---|---|
| SRC-001 | Brief/rubrik tugas Software Engineering | Dokumen otoritatif | Tinggi | Menentukan studi kasus, fitur wajib, minimum, dan deployment |
| SRC-002 | `CASE.md` | Ringkasan studi kasus | Tinggi | Diturunkan dari brief tugas |
| SRC-003 | `docs/software-engineering/01-inception.md` | Artefak upstream | Sedang-Tinggi | Menjadi sumber ID goal, stakeholder, scope, asumsi, dan constraint |
| SRC-004 | Percakapan pengguna 30 Juni 2026 | Keputusan project owner | Tinggi | Repository dan dokumen proyek boleh public dengan pembatasan data |
| SRC-005 | `kuesioner-elicitation-step-2-terjawab.md` | Kuesioner stakeholder proxy | Tinggi | Q-001–Q-027 diisi dan disahkan Stieve pada 30 Juni 2026 |

## Stakeholders and Techniques

| Stakeholder | Teknik | Fokus |
|---|---|---|
| STK-001 Pelapor | Kuesioner + scenario walkthrough | Data laporan, visibility, komentar, dan konfirmasi hasil |
| STK-002 Administrator | Kuesioner + workflow analysis | Ownership, triage, kategori, prioritas, assignment, close, dan reopen |
| STK-003 Teknisi | Kuesioner + task walkthrough | Keahlian, penerimaan tugas, progres, resolve, dan reassignment |
| STK-004 Manajer fasilitas | Kuesioner + dashboard analysis | Metrik, filter, periode, target layanan, dan authority |
| STK-005 Unit fasilitas | Stakeholder proxy | Ownership proses dan kebijakan operasional |
| STK-006 TI/keamanan | Kuesioner + document analysis | Akses baseline, data pribadi, retensi, dan performa |
| STK-007/STK-008 Delivery/reviewer | Kuesioner + document analysis | Human review, publication evidence, dan aturan pengumpulan |

# Stakeholder Responses

## STK-002 — Administrator and Ownership

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-001 | OQ-001 | Unit Manajemen Fasilitas Kampus memiliki proses; staf administrasi fasilitas yang ditunjuk manajer menjadi administrator. | Answered |
| Q-002 | OQ-004 | Administrator dan manajer melihat semua laporan; pelapor hanya miliknya; teknisi melihat assignment-nya dan laporan yang relevan dengan keahliannya. | Answered |
| Q-003 | OQ-005 | Admin: review; admin/manajer: assign; teknisi: mulai dan resolve; pelapor atau admin sesuai kebijakan timeout: close; admin: reopen setelah permintaan valid. | Answered |
| Q-004 | OQ-007, OQ-008 | Konfirmasi pelapor diutamakan; pengingat setelah 3 hari kerja; admin boleh menutup dengan audit setelah 5 hari kerja tanpa respons. | Answered, detail automation terbuka |
| Q-005 | OQ-009 | Reopen jika masalah berulang, hasil tidak memuaskan, salah penanganan, atau bukti tidak sesuai; pelapor mengajukan, admin/manajer menyetujui. | Answered |
| Q-006 | OQ-011 | LOW–URGENT ditentukan berdasarkan dampak, alternatif, urgensi operasional, keselamatan, keamanan, dan risiko kerusakan. | Answered |
| Q-007 | OQ-012 | Admin dapat menambah, mengubah, dan menonaktifkan kategori; kategori terpakai tidak boleh dihapus permanen. | Answered |
| Q-008 | OQ-019, OQ-020 | Komentar internal diperlukan; perubahan kategori, prioritas, assignment, status, reopen, dan close harus diaudit. | Answered |

## STK-003 — Teknisi

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-009 | OQ-003 | Teknisi dikelompokkan menurut keahlian: jaringan, listrik, AC, kebersihan, kelas, laboratorium, bangunan, dan fasilitas umum. | Answered |
| Q-010 | OQ-006 | Teknisi wajib menerima assignment sebelum pekerjaan dan status `IN_PROGRESS` dimulai. | Answered |
| Q-011 | OQ-010 | Baseline memakai satu teknisi aktif; admin dapat reassign karena ketersediaan, keahlian, atau kebutuhan pengalihan. | Answered |
| Q-012 | OQ-015 | Update mencatat waktu, teknisi, status, progres, tindakan, kendala, estimasi bila belum selesai, dan bukti bila relevan. | Answered dengan konflik scope lampiran |

## STK-001 — Pelapor

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-013 | OQ-002 | Mahasiswa dan dosen memiliki hak yang sama sebagai pelapor. | Answered |
| Q-014 | OQ-004 | Pelapor hanya melihat laporannya sendiri pada baseline. | Answered |
| Q-015 | OQ-013 | Wajib: judul, deskripsi, lokasi, kategori, prioritas awal, identitas, tanggal, dan kontak; lampiran opsional. | Answered dengan konflik scope lampiran |
| Q-016 | OQ-014 | Lokasi utama dipilih dari master; detail lokasi dapat ditulis bebas. | Answered |
| Q-017 | OQ-007, OQ-008 | Setelah `RESOLVED`, pelapor memilih setuju/tutup atau belum selesai/reopen; alasan reopen wajib dan bukti baru dapat ditambahkan. | Answered dengan konflik scope/notifikasi |

## STK-004 — Manajer Fasilitas

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-018 | OQ-021 | Dashboard: jumlah masuk, status, kategori, prioritas, rata-rata penyelesaian, keterlambatan, beban teknisi, reopen, dan tren. | Answered |
| Q-019 | OQ-022 | Filter: status, kategori, prioritas, lokasi, teknisi, pelapor, tanggal; periode harian, mingguan, bulanan, semester, dan kustom. | Answered |
| Q-020 | OQ-023 | Review ≤1 hari kerja; assignment ≤1 hari setelah review; mulai ≤1 hari setelah diterima; LOW 7, MEDIUM 5, HIGH 2 hari kerja; URGENT hari yang sama. | Answered |

## STK-006 — Access, Security, Data, and Performance

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-021 | OQ-017 | Baseline memakai role selector dan pengguna dummy; autentikasi penuh ditunda. | Answered |
| Q-022 | OQ-018 | Boleh: nama, peran, email kampus, kontak opsional, unit/jurusan bila perlu. Dilarang: password asli/plain text, identitas sensitif, finansial, kesehatan, dan data tidak relevan. | Answered |
| Q-023 | OQ-016 | Laporan, komentar, dan history disimpan minimal 3 tahun, lalu dapat diarsipkan dan tidak langsung dihapus. | Answered |
| Q-024 | OQ-024 | Daftar dan pencarian ≤2 detik, detail ≤1 detik, dashboard ≤3 detik pada data baseline. | Answered |

## STK-007/STK-008 — Delivery and Review

| Q ID | Inception Link | Ringkasan Jawaban | Status |
|---|---|---|---|
| Q-025 | OQ-025 | Project owner/developer utama melakukan human review; anggota tim ikut bila ada; dosen/asisten dapat menjadi reviewer eksternal. | Answered |
| Q-026 | OQ-026 | Dokumen dan evidence boleh public; secret, credential, data pribadi asli, dan informasi kampus terbatas harus disembunyikan; demo memakai data dummy. | Answered |
| Q-027 | OQ-027 | Format presentasi, durasi, deadline, dan aturan tambahan belum diputuskan; sementara mengikuti GitHub dan URL Cloudflare. | Open |

# Raw Needs

## Needs from Document Analysis

| ID | Raw Need | Type | Source | Traceability |
|---|---|---|---|---|
| NEED-001 | Pelapor perlu membuat laporan fasilitas baru. | Explicit | SRC-001, SRC-002 | STK-001, GOAL-005, SCOPE-IN-001 |
| NEED-002 | Pengguna perlu melihat daftar dan detail laporan sesuai kewenangannya. | Explicit | SRC-001, SRC-005 | STK-001–STK-004, GOAL-002, SCOPE-IN-002 |
| NEED-003 | Pengguna operasional perlu mencari dan menyaring laporan. | Explicit | SRC-001 | STK-002–STK-004, SCOPE-IN-002 |
| NEED-004 | Administrator perlu memeriksa laporan serta menentukan kategori dan prioritas. | Explicit | SRC-001, SRC-002 | STK-002, GOAL-006, SCOPE-IN-003/004 |
| NEED-005 | Administrator atau manajer perlu menugaskan teknisi yang sesuai. | Explicit | SRC-001, SRC-005 | STK-002–STK-004, SCOPE-IN-005 |
| NEED-006 | Teknisi perlu menerima tugas, memperbarui progres, dan menyelesaikan pekerjaan. | Explicit | SRC-001, SRC-005 | STK-003, GOAL-007, SCOPE-IN-006 |
| NEED-007 | Sistem perlu mengontrol alur status dan pihak yang berwenang melakukan transisi. | Policy/rule candidate | SRC-001, SRC-005 | STK-001–STK-004, GOAL-001, SCOPE-IN-007 |
| NEED-008 | Pengguna perlu menambahkan komentar publik atau catatan internal sesuai peran. | Explicit | SRC-001, SRC-005 | STK-001–STK-004, SCOPE-IN-008 |
| NEED-009 | Sistem perlu menyimpan riwayat perubahan yang dapat diaudit. | Explicit | SRC-001, SRC-005 | GOAL-002, GOAL-004, SCOPE-IN-009 |
| NEED-010 | Pelapor perlu mengonfirmasi hasil atau meminta reopen. | Explicit | SRC-001, SRC-005 | STK-001, GOAL-005, SCOPE-IN-010/011 |
| NEED-011 | Manajer perlu melihat dashboard dan laporan ringkas dari data nyata. | Explicit | SRC-001, SRC-005 | STK-004, GOAL-003/008, SCOPE-IN-012 |
| NEED-012 | Data perlu persisten di D1 dan aplikasi tersedia melalui URL Cloudflare publik. | Constraint | SRC-001 | GOAL-009/010, CONSTRAINT-001/002 |
| NEED-013 | Proyek perlu menjaga traceability, evidence AI/human review, GitHub workflow, testing, dan deployment. | Constraint | SRC-001 | STK-007/008, GOAL-013–016 |
| NEED-014 | Repository public tidak boleh memuat secret atau data pribadi nyata. | Constraint | SRC-003–SRC-005 | STK-006/007, CONSTRAINT-010 |

## Needs Elicited from Stakeholder

| ID | Raw Need | Type | Source | Traceability |
|---|---|---|---|---|
| NEED-015 | Akses laporan harus dibatasi berdasarkan peran dan kepemilikan laporan. | Policy/rule candidate | SRC-005 Q-002/Q-014 | STK-001–STK-004, GOAL-002/005/006/007/008 |
| NEED-016 | Manajer dapat melakukan assignment; teknisi hanya dapat memulai dan resolve tugas yang diterimanya. | Policy/rule candidate | SRC-005 Q-003/Q-010 | STK-002–STK-004, GOAL-006/007 |
| NEED-017 | Pelapor diingatkan setelah 3 hari kerja; setelah 5 hari tanpa respons, admin dapat menutup dengan audit. | Policy/rule candidate | SRC-005 Q-004 | STK-001/002, GOAL-001/004/006 |
| NEED-018 | Reopen memerlukan alasan valid, permintaan pelapor, dan persetujuan admin atau manajer. | Policy/rule candidate | SRC-005 Q-005/Q-017 | STK-001/002/004, GOAL-004/005/006 |
| NEED-019 | Prioritas dibedakan menjadi LOW, MEDIUM, HIGH, dan URGENT berdasarkan dampak serta urgensi. | Policy/rule candidate | SRC-005 Q-006 | STK-002/004, GOAL-004/006/008 |
| NEED-020 | Kategori dapat dikelola admin, tetapi kategori yang sudah dipakai hanya boleh dinonaktifkan. | Policy/rule candidate | SRC-005 Q-007 | STK-002, GOAL-006 |
| NEED-021 | Sistem perlu memisahkan komentar yang terlihat pelapor dan catatan internal. | Explicit | SRC-005 Q-008 | STK-001–STK-004, GOAL-002 |
| NEED-022 | Audit history mencakup kategori, prioritas, assignment, status, reopen, dan close. | Explicit | SRC-005 Q-008 | STK-002/004/006, GOAL-002/004/012 |
| NEED-023 | Teknisi memiliki kategori keahlian dan baseline memakai satu teknisi aktif per laporan dengan reassignment yang diaudit. | Policy/rule candidate | SRC-005 Q-009/Q-011 | STK-002/003, GOAL-006/007 |
| NEED-024 | Update progres mencatat waktu, aktor, status, catatan, tindakan, kendala, dan estimasi penyelesaian. | Explicit | SRC-005 Q-012 | STK-003, GOAL-002/007 |
| NEED-025 | Mahasiswa dan dosen memiliki hak yang sama sebagai pelapor. | Policy/rule candidate | SRC-005 Q-013 | STK-001, GOAL-005 |
| NEED-026 | Form laporan membutuhkan judul, deskripsi, lokasi, kategori, prioritas awal, identitas, tanggal, dan kontak pelapor. | Explicit | SRC-005 Q-015 | STK-001/002, GOAL-005 |
| NEED-027 | Lokasi utama berasal dari master lokasi dan dapat dilengkapi detail bebas. | Explicit | SRC-005 Q-016 | STK-001/002/004, GOAL-005/008 |
| NEED-028 | Dashboard perlu metrik operasional, tren, keterlambatan, reopen, dan beban kerja teknisi. | Explicit | SRC-005 Q-018 | STK-004, GOAL-003/008 |
| NEED-029 | Dashboard perlu filter status, kategori, prioritas, lokasi, teknisi, pelapor, dan periode. | Explicit | SRC-005 Q-019 | STK-004, GOAL-003/008 |
| NEED-030 | Target layanan berbeda menurut tahap workflow dan tingkat prioritas. | Constraint/policy candidate | SRC-005 Q-020 | STK-001–STK-004, GOAL-001/003/004 |
| NEED-031 | Baseline harus dapat didemonstrasikan dengan role selector dan pengguna dummy tanpa autentikasi penuh. | Constraint | SRC-005 Q-021 | STK-006/007/008, GOAL-009/016, ASSUMP-003 |
| NEED-032 | Penyimpanan data pribadi harus dibatasi pada data relevan; data sensitif dan password asli dilarang. | Constraint | SRC-005 Q-022/Q-026 | STK-006/007, CONSTRAINT-010 |
| NEED-033 | Laporan, komentar, dan audit history perlu disimpan minimal 3 tahun lalu dapat diarsipkan. | Constraint | SRC-005 Q-023 | STK-005/006, GOAL-004/012 |
| NEED-034 | Daftar/pencarian perlu selesai ≤2 detik, detail ≤1 detik, dan dashboard ≤3 detik pada data baseline. | Constraint | SRC-005 Q-024 | STK-001–STK-004, GOAL-012 |
| NEED-035 | Human review work product dilakukan project owner/developer dan dicatat sebagai evidence. | Constraint | SRC-005 Q-025 | STK-007/008, GOAL-014 |

# Decision Register

| ID | Decision | Source | Status |
|---|---|---|---|
| DEC-001 | Authority transisi mengikuti Q-003; reopen membutuhkan permintaan pelapor dan validasi admin. | Q-003/Q-005 | Confirmed |
| DEC-002 | Baseline memakai role selector dan data pengguna dummy. | Q-021 | Confirmed |
| DEC-003 | Konfirmasi pelapor diutamakan; admin dapat close setelah 5 hari kerja tanpa respons dengan audit. | Q-004/Q-017 | Confirmed, implementation detail open |
| DEC-004 | Model prioritas LOW, MEDIUM, HIGH, URGENT memakai dampak dan urgensi serta target Q-020. | Q-006/Q-020 | Confirmed |
| DEC-005 | Satu teknisi aktif; acceptance wajib; admin dapat reassign dengan audit. | Q-010/Q-011 | Confirmed |
| DEC-006 | Komentar publik dipisahkan dari catatan internal; perubahan penting diaudit. | Q-008 | Confirmed |
| DEC-007 | Dashboard berisi metrik Q-018 dan filter/periode Q-019. | Q-018/Q-019 | Confirmed |
| DEC-008 | Kategori dikelola admin dan memakai nonaktif, bukan hard delete, setelah digunakan. | Q-007 | Confirmed |
| DEC-009 | Data operasional disimpan minimal 3 tahun sebelum arsip. | Q-023 | Confirmed |
| DEC-010 | Evidence boleh public hanya dengan data dummy dan tanpa secret/data pribadi asli. | Q-026 | Confirmed |

# Pain Points

| ID | Pain Point | Evidence | Status |
|---|---|---|---|
| PAIN-001 | Pelapor membutuhkan visibility dan mekanisme menyatakan hasil belum selesai. | Q-014/Q-017, GOAL-002/005 | Validated |
| PAIN-002 | Administrator perlu mencegah laporan terlewat dan menjaga assignment sesuai keahlian. | Q-009–Q-011, Q-020 | Validated |
| PAIN-003 | Teknisi perlu membedakan tugas yang belum diterima, aktif, dan selesai serta mencatat kendala. | Q-010/Q-012 | Validated |
| PAIN-004 | Manajer membutuhkan ringkasan konsisten tentang backlog, keterlambatan, beban teknisi, dan tren. | Q-018/Q-019 | Validated |

# Constraints Found

- **EL-CONSTRAINT-001**: Baseline menggunakan role selector dan pengguna dummy; ini adalah simulasi akses, bukan autentikasi produksi (`Q-021`, `ASSUMP-003`).
- **EL-CONSTRAINT-002**: Data sensitif, secret, credential, dan data pribadi asli tidak boleh dipublikasikan (`Q-022`, `Q-026`, `CONSTRAINT-010`).
- **EL-CONSTRAINT-003**: Retensi minimum data operasional adalah 3 tahun sebelum arsip (`Q-023`).
- **EL-CONSTRAINT-004**: Target performa berlaku pada volume data baseline yang akan didefinisikan di specification/test planning (`Q-024`).
- **EL-CONSTRAINT-005**: Target waktu layanan dihitung dalam hari kerja, kecuali `URGENT` yang harus ditangani pada hari yang sama (`Q-020`).
- **EL-CONSTRAINT-006**: Upload foto/lampiran tetap di luar required baseline berdasarkan `SCOPE-OUT-001`, walaupun diinginkan dalam Q-012, Q-013, Q-015, dan Q-017.

# Ambiguities, Conflicts, and Follow-up

## Ambiguities

- **AMB-001**: Q-004 menyebut penutupan “otomatis/manual”, tetapi juga menyatakan administrator yang boleh menutup. Baseline perlu memilih manual oleh admin atau automation terjadwal.
- **AMB-002**: Setelah reopen, status tujuan belum tegas antara status baru `REOPENED` atau kembali langsung ke `UNDER_REVIEW`.
- **AMB-003**: “Hari kerja” dan hari libur kampus belum memiliki kalender atau aturan perhitungan.
- **AMB-004**: Ukuran dataset “baseline” untuk menguji target performa Q-024 belum ditentukan.
- **AMB-005**: Q-002 mengizinkan teknisi melihat laporan relevan dengan keahliannya, sementara Q-014 memperketat akses pelapor saja; batas data yang terlihat teknisi sebelum assignment perlu dirinci saat specification.
- **AMB-006**: Format presentasi, durasi demo, deadline, dan aturan pengumpulan tambahan masih menunggu arahan dosen (`Q-027`).

## Conflicts

- **CONFLICT-001 — Upload evidence vs baseline scope**: Q-012, Q-013, Q-015, dan Q-017 menginginkan foto/dokumen, tetapi `SCOPE-OUT-001` mengecualikan upload foto/object storage. Keputusan sementara: pertahankan metadata/catatan evidence pada baseline tanpa upload file; fitur upload memerlukan change request setelah baseline wajib selesai.
- **CONFLICT-002 — Notifikasi vs baseline scope**: Q-017 menyebut pelapor menerima notifikasi, sedangkan `SCOPE-OUT-002` mengecualikan email. Keputusan sementara: gunakan notifikasi/inbox di dalam aplikasi jika disyaratkan; email tetap out of scope.

## Follow-up Questions

| Q ID | Pertanyaan | Dampak | Owner | Blocking Step 03? |
|---|---|---|---|---|
| Q-028 | Setelah 5 hari kerja tanpa respons, apakah admin menutup manual dari daftar overdue atau sistem menutup otomatis? | Business rule, scheduler, audit | STK-002/STK-004 | Tidak; gunakan manual sebagai baseline sementara |
| Q-029 | Apakah reopen memakai status `REOPENED` tersendiri atau langsung `UNDER_REVIEW` dengan event reopen di audit? | State model dan reporting | STK-002/STK-004 | Ya untuk final state model |
| Q-030 | Apa definisi hari kerja dan bagaimana hari libur dihitung? | SLA dan overdue | STK-005 | Tidak; catat asumsi kalender Senin–Jumat |
| Q-031 | Berapa jumlah laporan/pengguna yang mewakili data baseline untuk uji performa? | NFR dan test data | STK-007/STK-008 | Tidak; tentukan pada specification/test planning |
| Q-032 | Informasi apa dari laporan belum ditugaskan yang boleh dilihat teknisi berdasarkan keahlian? | Privacy dan authorization | STK-002/STK-006 | Ya untuk access matrix final |
| Q-033 | Adakah aturan presentasi, demo, deadline, atau pengumpulan tambahan dari dosen? | Delivery planning | STK-008 | Tidak |

# Traceability to Inception Open Questions

| OQ | Resolution |
|---|---|
| OQ-001–OQ-024 | Dijawab melalui Q-001–Q-024; detail residual dicatat sebagai Q-028–Q-032. |
| OQ-025 | Dijawab melalui Q-025. |
| OQ-026 | Dijawab dan dikonfirmasi melalui Q-026 serta DEC-010. |
| OQ-027 | Belum diputuskan; dilanjutkan sebagai Q-033. |

# Handoff Readiness for 03 — Specification

**Ready with noted assumptions.** Seluruh keputusan prioritas `DEC-001` sampai `DEC-007` telah dijawab. Raw needs, constraint, target layanan, target performa, access boundary, dan conflict notes cukup untuk menyusun draft functional requirement, non-functional requirement, business rule, user story, serta acceptance criteria.

Specification harus:

1. Menjaga traceability dari setiap requirement ke `NEED-###`, `GOAL-###`, dan stakeholder terkait.
2. Tidak memasukkan upload foto/object storage atau email ke required baseline tanpa change request.
3. Memakai penutupan manual oleh administrator sebagai asumsi baseline sampai Q-028 dijawab.
4. Menandai keputusan state reopen dan visibility pra-assignment sebagai unresolved sampai Q-029 dan Q-032 dijawab.
5. Menyatakan role selector sebagai mekanisme demonstrasi, bukan kontrol keamanan produksi.
6. Membawa Q-030, Q-031, dan Q-033 ke requirement validation dan test planning tanpa menghambat draft awal.

## Quality Checklist

- [x] Pertanyaan dikelompokkan berdasarkan stakeholder dan ditautkan ke open question Inception.
- [x] Semua Q-001 sampai Q-027 memiliki jawaban atau status terbuka yang eksplisit.
- [x] Raw needs memiliki ID, type, source, stakeholder/goal traceability.
- [x] Pain point, constraint, ambiguity, dan conflict dicatat terpisah.
- [x] Konflik terhadap scope baseline tidak diselesaikan diam-diam.
- [x] Follow-up memiliki owner dan dampak terhadap Step 03.
- [x] Handoff ke Step 03 dinyatakan secara eksplisit.
