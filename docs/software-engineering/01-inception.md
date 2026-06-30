# Inception dan Stakeholder

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 01 - Inception dan Stakeholder |
| Status | Draft untuk human review |
| Tanggal | 30 Juni 2026 |
| Sumber utama | `CASE.md`, `README.md`, dan brief tugas Software Engineering |
| Tahap berikutnya | 02 - Elicitation |

Dokumen ini merupakan scope awal, bukan requirement baseline. Informasi yang belum dikonfirmasi dicatat sebagai asumsi atau pertanyaan terbuka.

# Problem Statement

## Background

Mahasiswa dan dosen dapat menemukan masalah fasilitas kampus seperti proyektor rusak, gangguan internet, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, atau ruangan kotor. Penanganan masalah tersebut melibatkan pelapor, administrator, teknisi, dan manajer fasilitas.

Brief tugas menetapkan kebutuhan akan satu alur terstruktur dari laporan dibuat, diperiksa, ditugaskan, dikerjakan, diselesaikan, dikonfirmasi, hingga ditutup. Proyek juga harus menunjukkan proses software engineering yang dapat ditelusuri, penggunaan AI yang direview manusia, testing, GitHub workflow, dan deployment publik ke Cloudflare.

## Primary Problem

Belum tersedia mekanisme terpusat dalam scope proyek yang menjamin laporan fasilitas dapat dicatat, ditindaklanjuti oleh pihak yang tepat, dipantau progresnya, dan ditutup dengan riwayat status yang dapat ditelusuri. Akibatnya, visibilitas pelapor, koordinasi administrator-teknisi, dan informasi ringkas untuk manajemen berisiko tidak konsisten.

## Problem Boundaries

- Tahap ini tidak menyimpulkan bahwa kampus saat ini memakai proses manual tertentu karena informasi tersebut belum diberikan.
- Tahap ini tidak menentukan detail autentikasi, struktur organisasi, target waktu layanan, kategori final, atau aturan eskalasi.
- Detail tersebut harus ditemukan dan divalidasi pada tahap elicitation.

# Goals

## Business Goals

- **GOAL-001**: Menyediakan satu alur penanganan laporan fasilitas yang dapat dipantau dari pengajuan sampai penutupan.
- **GOAL-002**: Meningkatkan keterlihatan status, penanggung jawab, komentar, dan riwayat penanganan setiap laporan.
- **GOAL-003**: Menyediakan informasi ringkas yang membantu manajer fasilitas melihat kondisi dan progres laporan.
- **GOAL-004**: Mengurangi risiko laporan terlewat atau berpindah status tanpa jejak yang jelas.

## User Goals

- **GOAL-005**: Pelapor dapat menyampaikan masalah fasilitas dan melihat perkembangan penanganannya.
- **GOAL-006**: Administrator dapat memeriksa, memprioritaskan, menugaskan, menutup, dan membuka kembali laporan secara terkontrol.
- **GOAL-007**: Teknisi dapat melihat tugas, menerima tugas, memperbarui progres, dan menandai pekerjaan selesai.
- **GOAL-008**: Manajer fasilitas dapat melihat dashboard dan laporan ringkas.

## Technical Goals

- **GOAL-009**: Menyediakan aplikasi web yang dapat diakses melalui URL publik Cloudflare.
- **GOAL-010**: Menyimpan data secara persisten menggunakan Cloudflare D1 dalam batas layanan gratis.
- **GOAL-011**: Memisahkan frontend React, backend Cloudflare Worker, dan database agar tanggung jawab komponen jelas.
- **GOAL-012**: Menjaga data dan perubahan status konsisten serta dapat diuji.

## Software Engineering and Delivery Goals

- **GOAL-013**: Menjaga traceability dari stakeholder dan requirement sampai design, issue, code, test, dan deployment.
- **GOAL-014**: Menggunakan AI melalui reusable skills dengan output awal, koreksi manusia, dan hasil final yang terdokumentasi.
- **GOAL-015**: Menggunakan GitHub untuk branch, commit, issue, pull request, review, dan pemeriksaan otomatis.
- **GOAL-016**: Menghasilkan artefak tugas minimum tanpa mengorbankan konsistensi atau kualitas isi.

# Stakeholders

## Stakeholder Map

| ID | Stakeholder | Kategori | Peran/Hubungan | Kebutuhan Awal | Pengaruh | Catatan |
|---|---|---|---|---|---|---|
| STK-001 | Pelapor (mahasiswa atau dosen) | Primer | Membuat dan memantau laporan | Form yang jelas, nomor laporan, status, komentar, dan konfirmasi hasil | Tinggi | Identitas dan cara akses belum ditentukan |
| STK-002 | Administrator | Primer/operasional | Mengendalikan intake dan workflow laporan | Review, kategori, prioritas, assignment, close, dan reopen | Sangat tinggi | Kemungkinan menjadi penjaga kualitas data; perlu validasi |
| STK-003 | Teknisi | Primer/operasional | Menangani pekerjaan fasilitas | Daftar tugas, penerimaan tugas, update progres, catatan, dan resolve | Tinggi | Aturan assignment dan beban kerja belum diketahui |
| STK-004 | Manajer fasilitas | Primer/pengambil keputusan | Memantau layanan fasilitas | Dashboard, ringkasan, filter, dan indikator yang bermakna | Tinggi | Isi dashboard dan periode laporan belum ditentukan |
| STK-005 | Unit fasilitas kampus | Sekunder/pemilik proses | Memiliki proses penanganan fasilitas | Workflow konsisten, data yang dapat diaudit, dan ownership jelas | Tinggi | Keberadaan dan bentuk organisasinya merupakan ASSUMP-001 |
| STK-006 | Pengelola TI/keamanan kampus | Sekunder | Menilai aspek akses, keamanan, dan data | Tidak ada secret di repo, akses terkendali, data sensitif diminimalkan | Sedang | Keterlibatan formal belum dinyatakan |
| STK-007 | Tim proyek/mahasiswa | Delivery | Menganalisis, membangun, menguji, dan mendokumentasikan sistem | Scope terkendali, keputusan jelas, dan artefak dapat ditelusuri | Tinggi | Individu atau tim kecil sesuai brief |
| STK-008 | Dosen/reviewer | Delivery/quality | Menilai proses dan hasil proyek | Bukti requirement, design, AI review, GitHub, testing, dan deployment | Sangat tinggi | Bukan aktor bisnis aplikasi |
| STK-009 | GitHub | Dependency eksternal | Repository dan workflow kolaborasi | Repository tersedia dan tidak mengandung secret | Sedang | Availability di luar kendali tim |
| STK-010 | Cloudflare | Dependency eksternal | Hosting Worker dan database D1 | Konfigurasi valid dan penggunaan sesuai free tier | Tinggi | Limit dan perubahan layanan perlu dipantau |

## Stakeholder Relationships

1. STK-001 menyerahkan laporan yang diperiksa STK-002.
2. STK-002 menentukan prioritas dan menugaskan laporan kepada STK-003.
3. STK-003 memperbarui progres hingga laporan dinyatakan selesai.
4. STK-001 memberikan konfirmasi hasil; aturan jika konfirmasi tidak diberikan masih terbuka.
5. STK-002 menutup atau membuka kembali laporan.
6. STK-004 menggunakan data agregat untuk pemantauan.
7. STK-007 menghasilkan sistem dan bukti proses untuk diperiksa STK-008.

# Scope

## In Scope

- **SCOPE-IN-001**: Pembuatan laporan fasilitas baru.
- **SCOPE-IN-002**: Daftar, pencarian, filter, dan detail laporan.
- **SCOPE-IN-003**: Pemeriksaan laporan oleh administrator.
- **SCOPE-IN-004**: Penentuan kategori dan prioritas laporan.
- **SCOPE-IN-005**: Penugasan laporan kepada teknisi.
- **SCOPE-IN-006**: Penerimaan tugas dan pembaruan progres teknisi.
- **SCOPE-IN-007**: Perubahan status mengikuti alur awal `SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`.
- **SCOPE-IN-008**: Komentar atau catatan pada laporan.
- **SCOPE-IN-009**: Penyimpanan riwayat perubahan status.
- **SCOPE-IN-010**: Konfirmasi hasil oleh pelapor.
- **SCOPE-IN-011**: Penutupan dan pembukaan kembali laporan.
- **SCOPE-IN-012**: Dashboard dan laporan ringkas bagi manajer fasilitas.
- **SCOPE-IN-013**: Frontend, backend API, database, testing, dan deployment publik.
- **SCOPE-IN-014**: Dokumentasi software engineering, reusable AI skills, AI evidence, human review, dan traceability.

## Out of Scope for the Required Baseline

- **SCOPE-OUT-001**: Upload foto atau object storage.
- **SCOPE-OUT-002**: Notifikasi email.
- **SCOPE-OUT-003**: Login menggunakan akun Google.
- **SCOPE-OUT-004**: QR code ruangan.
- **SCOPE-OUT-005**: AI untuk menentukan kategori laporan.
- **SCOPE-OUT-006**: Inventory spare part.
- **SCOPE-OUT-007**: Vendor management.
- **SCOPE-OUT-008**: Integrasi dengan sistem kampus yang belum disebutkan.
- **SCOPE-OUT-009**: Aplikasi mobile native.

Fitur out-of-scope hanya dapat dipertimbangkan setelah seluruh baseline wajib selesai, disetujui melalui change request, dan tidak mengancam waktu, kualitas, atau free tier.

# Assumptions

- **ASSUMP-001**: Terdapat unit atau fungsi fasilitas kampus yang menjadi pemilik operasional proses; nama dan struktur resminya perlu divalidasi.
- **ASSUMP-002**: Satu orang dapat direpresentasikan oleh satu identitas pengguna, tetapi model autentikasi belum diputuskan.
- **ASSUMP-003**: Karena login Google tidak wajib, demonstrasi peran mungkin menggunakan data pengguna sederhana atau role selector; keputusan ini belum disetujui.
- **ASSUMP-004**: Laporan hanya berkaitan dengan fasilitas kampus, bukan pengaduan akademik, keuangan, atau disiplin.
- **ASSUMP-005**: Setiap laporan memiliki tepat satu status aktif pada satu waktu.
- **ASSUMP-006**: Setiap perubahan status harus memiliki waktu perubahan dan pihak yang melakukan perubahan.
- **ASSUMP-007**: Satu laporan ditugaskan kepada satu teknisi aktif pada satu waktu; kebutuhan multi-teknisi perlu ditanyakan.
- **ASSUMP-008**: Dashboard menggunakan data dari laporan yang tersimpan, bukan angka statis.
- **ASSUMP-009**: Data contoh untuk demonstrasi tidak akan menggunakan informasi pribadi atau sensitif yang nyata.
- **ASSUMP-010**: Cloudflare Workers dan D1 free tier cukup untuk kebutuhan demonstrasi akademik.
- **ASSUMP-011**: Bahasa antarmuka utama adalah Bahasa Indonesia; kebutuhan bahasa lain belum dinyatakan.
- **ASSUMP-012**: Administrator memiliki kewenangan final untuk menutup dan membuka kembali laporan sesuai brief.

# Constraints

- **CONSTRAINT-001**: Media pengumpulan adalah repository GitHub dan URL Cloudflare publik.
- **CONSTRAINT-002**: Deployment menggunakan Cloudflare Workers dan D1 tanpa layanan berbayar.
- **CONSTRAINT-003**: Proyek dikerjakan individu atau tim kecil.
- **CONSTRAINT-004**: AI wajib digunakan tetapi keputusan akhir dan tanggung jawab tetap pada manusia.
- **CONSTRAINT-005**: Harus tersedia 15 reusable AI skills dengan satu tanggung jawab per skill.
- **CONSTRAINT-006**: Minimum artefak: 12 functional requirements, 6 non-functional requirements, 5 business rules, 10 user stories, dan 2 acceptance criteria per user story.
- **CONSTRAINT-007**: Minimum workflow: 10 GitHub Issues dan 6 Pull Requests.
- **CONSTRAINT-008**: Minimum 20 automated tests, 1 change request, dan 1 deployment publik.
- **CONSTRAINT-009**: Output awal AI, human review, koreksi, dan hasil final harus dapat dibuktikan.
- **CONSTRAINT-010**: Secret, token, credential, dan data pribadi tidak boleh dimasukkan ke repository publik.

# Success Signals

- **SUCCESS-001**: Pelapor dapat membuat laporan valid dan data tetap ada setelah halaman dimuat ulang.
- **SUCCESS-002**: Satu laporan dapat didemonstrasikan melalui alur end-to-end dari `SUBMITTED` sampai `CLOSED`.
- **SUCCESS-003**: Assignment, komentar, konfirmasi, dan status history dapat ditelusuri pada laporan terkait.
- **SUCCESS-004**: Dashboard menampilkan ringkasan berdasarkan data nyata di database.
- **SUCCESS-005**: Aplikasi, API, dan D1 bekerja pada URL publik Cloudflare.
- **SUCCESS-006**: Semua automated test dan build lulus pada pemeriksaan akhir.
- **SUCCESS-007**: Setiap requirement final memiliki hubungan ke design, issue, code, dan test.
- **SUCCESS-008**: Seluruh minimum tugas dan bukti AI/human review dapat ditemukan dengan mudah oleh reviewer.

Target numerik layanan seperti waktu respons, waktu penyelesaian, dan SLA belum ditetapkan dan harus dibawa ke elicitation.

# Early Risks

| ID | Risiko | Dampak | Kemungkinan Awal | Respons Awal |
|---|---|---|---|---|
| RISK-001 | Model identitas dan otorisasi peran belum jelas | Pengguna dapat melakukan aksi di luar kewenangan | Tinggi | Prioritaskan pertanyaan akses pada elicitation |
| RISK-002 | Scope bertambah karena fitur opsional | Fitur wajib, test, dan dokumentasi tidak selesai | Tinggi | Pertahankan out-of-scope dan gunakan change request |
| RISK-003 | Transisi status tidak dikontrol | Data dan dashboard tidak dapat dipercaya | Sedang | Definisikan business rules dan transition matrix |
| RISK-004 | Status history tidak lengkap | Audit trail dan traceability operasional hilang | Sedang | Tentukan event dan data history pada design |
| RISK-005 | Data pribadi masuk ke repository atau demo | Risiko privasi dan keamanan | Sedang | Gunakan data sintetis dan secret scanning/checklist |
| RISK-006 | Bukti AI dibuat terlambat | Komponen Skills AI dan human review sulit diverifikasi | Tinggi | Simpan invocation, output, review, dan hasil final per tahap |
| RISK-007 | Test hanya mengejar jumlah | Bug alur utama tidak terdeteksi | Sedang | Buat test plan berbasis risiko dan acceptance criteria |
| RISK-008 | Konfigurasi D1 lokal dan production berbeda | Aplikasi publik gagal atau kehilangan data | Sedang | Pisahkan migration dan lakukan smoke test deployment |
| RISK-009 | Limit atau perubahan layanan eksternal | Build/deployment terhambat | Rendah-Sedang | Dokumentasikan versi, konfigurasi, dan fallback lokal |
| RISK-010 | Reviewer manusia tidak tersedia tepat waktu | Approval dan bukti review tertunda | Sedang | Jadwalkan review per work product, bukan di akhir proyek |

# Open Questions

## Stakeholder and Ownership

- **OQ-001**: Siapa pemilik proses bisnis dan siapa yang bertindak sebagai administrator pada konteks kampus?
- **OQ-002**: Apakah mahasiswa dan dosen mempunyai kebutuhan atau hak akses yang berbeda sebagai pelapor?
- **OQ-003**: Apakah teknisi hanya satu jenis, atau dibagi berdasarkan kategori seperti jaringan, AC, kebersihan, dan laboratorium?
- **OQ-004**: Siapa yang dapat melihat seluruh laporan dan siapa yang hanya dapat melihat laporan miliknya?

## Workflow and Business Rules

- **OQ-005**: Siapa yang boleh melakukan setiap transisi status?
- **OQ-006**: Apakah teknisi harus menerima assignment sebelum status berubah menjadi `IN_PROGRESS`?
- **OQ-007**: Apakah pelapor wajib mengonfirmasi hasil sebelum laporan ditutup?
- **OQ-008**: Apa yang terjadi jika pelapor tidak memberikan konfirmasi dalam waktu tertentu?
- **OQ-009**: Kondisi apa yang mengizinkan laporan dibuka kembali dan siapa yang menyetujuinya?
- **OQ-010**: Apakah assignment dapat dipindahkan atau melibatkan lebih dari satu teknisi?
- **OQ-011**: Apa definisi serta aturan prioritas rendah, sedang, tinggi, atau darurat?
- **OQ-012**: Apakah kategori laporan sudah ditetapkan atau dikelola administrator?

## Data and Validation

- **OQ-013**: Field apa saja yang wajib saat membuat laporan selain judul, deskripsi, lokasi, dan kategori?
- **OQ-014**: Apakah lokasi dipilih dari master data atau ditulis bebas?
- **OQ-015**: Data apa yang harus dicatat untuk komentar dan status history?
- **OQ-016**: Berapa lama data laporan perlu disimpan?

## Access, Security, and Privacy

- **OQ-017**: Apakah autentikasi wajib untuk baseline atau role dapat disimulasikan untuk demonstrasi?
- **OQ-018**: Data pribadi apa yang diperbolehkan disimpan?
- **OQ-019**: Apakah komentar administrator/teknisi semuanya terlihat oleh pelapor, atau ada catatan internal?
- **OQ-020**: Apakah diperlukan audit terhadap perubahan prioritas, assignment, dan reopen selain status history?

## Dashboard and Service Quality

- **OQ-021**: Metrik apa yang paling penting bagi manajer fasilitas?
- **OQ-022**: Periode waktu dan filter apa yang diperlukan pada dashboard?
- **OQ-023**: Apakah ada target waktu review, assignment, pengerjaan, dan penyelesaian?
- **OQ-024**: Berapa target performa yang realistis untuk daftar, pencarian, dan dashboard?

## Delivery and Review

- **OQ-025**: Siapa yang akan melakukan human review pada requirement, design, code, dan acceptance test?
- **OQ-026**: Apakah repository public diperbolehkan memuat seluruh dokumen evidence AI dan human review?
- **OQ-027**: Apakah dosen menetapkan format presentasi, durasi demo, atau batas waktu yang belum tercantum pada brief?

# Handoff to 02 - Elicitation

## Priority Stakeholders for Elicitation

1. **STK-002 Administrator** - ownership, triage, kategori, prioritas, assignment, close, dan reopen.
2. **STK-003 Teknisi** - penerimaan tugas, progres, status, catatan, dan reassignment.
3. **STK-001 Pelapor** - data laporan, visibility, komentar, dan konfirmasi hasil.
4. **STK-004 Manajer fasilitas** - dashboard, metrik, filter, dan keputusan.
5. **STK-008 Dosen/reviewer** - bukti tugas, format review, dan ekspektasi presentasi.

## Highest-Priority Questions

Elicitation harus memprioritaskan `OQ-005`, `OQ-007`, `OQ-011`, `OQ-017`, `OQ-019`, `OQ-021`, dan `OQ-025` karena jawabannya memengaruhi authorization, workflow, data model, UI, testing, serta bukti human review.

## Readiness Decision

Artefak cukup lengkap sebagai draft inception dan siap untuk human review. Tahap elicitation belum boleh dianggap selesai atau requirement baseline belum boleh ditetapkan sebelum pertanyaan terbuka dibahas.
