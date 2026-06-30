# Campus Service Request and Maintenance System

## Ringkasan Kasus

Aplikasi digunakan oleh mahasiswa atau dosen untuk melaporkan masalah fasilitas kampus, seperti proyektor rusak, internet bermasalah, AC tidak dingin, kursi rusak, alat laboratorium bermasalah, atau ruangan kotor.

Laporan diperiksa administrator dan kemudian ditugaskan kepada teknisi. Teknisi memperbarui progres hingga pekerjaan selesai. Pelapor dapat melihat perkembangan dan memberikan konfirmasi. Administrator kemudian menutup laporan.

## Aktor Awal

- Pelapor: membuat laporan, melihat status, menambahkan komentar, dan mengonfirmasi hasil.
- Administrator: memeriksa laporan, menentukan kategori dan prioritas, menugaskan teknisi, serta menutup laporan.
- Teknisi: melihat dan menerima tugas, memperbarui progres, dan menandai pekerjaan selesai.
- Manajer fasilitas: melihat dashboard dan laporan ringkas.

## Fitur Wajib dari Tugas

- Membuat laporan baru.
- Melihat daftar laporan.
- Mencari dan menyaring laporan.
- Melihat detail laporan.
- Memeriksa laporan.
- Menentukan prioritas.
- Menugaskan teknisi.
- Mengubah status pekerjaan.
- Menambahkan komentar atau catatan.
- Menyimpan riwayat status.
- Menutup atau membuka kembali laporan.
- Menampilkan dashboard sederhana.

## Alur Status Awal

`SUBMITTED -> UNDER_REVIEW -> ASSIGNED -> IN_PROGRESS -> RESOLVED -> CLOSED`

Dokumen ini menjadi input awal Skill 01. Scope, asumsi, business rule, dan keputusan akhir harus divalidasi pada tahap requirements engineering.
