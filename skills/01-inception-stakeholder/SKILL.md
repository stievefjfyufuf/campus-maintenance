---
name: 01-inception-stakeholder
description: Define the Campus Maintenance problem, goals, stakeholders, scope, assumptions, constraints, risks, success signals, and open questions before detailed requirements. Use when starting or revisiting Step 1 discovery and preparing an approved handoff to elicitation.
---

# Inception dan Stakeholder

## Tujuan

Memahami masalah, tujuan, stakeholder, scope awal, asumsi, constraint, risiko, indikator keberhasilan, dan pertanyaan terbuka sebelum requirement detail dibuat.

## Kapan Digunakan

- Ketika proyek baru dimulai.
- Ketika masalah dan batas proyek belum disepakati.
- Sebelum elicitation, specification, design, issue planning, atau implementation.

## Input

- `CASE.md`
- `README.md`
- Brief dan rubrik tugas Software Engineering.
- Catatan atau keputusan proyek yang telah disetujui.

## Langkah Kerja

1. Baca seluruh input dan pisahkan fakta, constraint, dan informasi yang belum diketahui.
2. Nyatakan masalah utama tanpa langsung mengusulkan detail solusi.
3. Identifikasi stakeholder primer, sekunder, operasional, dan stakeholder delivery.
4. Berikan ID stabil `STK-###` pada setiap stakeholder.
5. Pisahkan tujuan bisnis, pengguna, teknis, dan delivery dengan ID `GOAL-###`.
6. Tetapkan in-scope, out-of-scope, asumsi `ASSUMP-###`, constraint, risiko, dan indikator keberhasilan.
7. Catat semua informasi yang belum diketahui sebagai pertanyaan terbuka `OQ-###`.
8. Lakukan quality check dan tandai output sebagai draft sampai human review selesai.
9. Serahkan stakeholder map dan open questions kepada Skill 02 - Elicitation.

## Output

- `docs/software-engineering/01-inception.md`
- Bukti invocation dan output AI di `evidence/01-inception-stakeholder/`
- Human review yang belum dicentang sampai benar-benar diperiksa manusia.

## Aturan

- Jangan membuat fakta baru.
- Tandai informasi yang belum dikonfirmasi sebagai asumsi atau pertanyaan terbuka.
- Jangan menulis functional requirement atau desain detail pada tahap ini.
- Jangan mengubah baseline yang telah disetujui tanpa change request.
- Gunakan ID traceability secara konsisten.
- Jangan menyatakan human review selesai jika belum dilakukan manusia.

## Quality Check

- [ ] Masalah utama jelas dan tidak langsung melompat ke solusi.
- [ ] Stakeholder primer, sekunder, operasional, dan delivery tercatat.
- [ ] Tujuan bisnis, pengguna, teknis, dan delivery dipisahkan.
- [ ] In-scope dan out-of-scope tidak bertentangan dengan brief tugas.
- [ ] Asumsi, constraint, risiko, dan pertanyaan terbuka terlihat jelas.
- [ ] Tidak ada requirement atau keputusan desain yang dibuat terlalu dini.
- [ ] Handoff ke elicitation tersedia.

## Kondisi Gagal

Berhenti dan minta klarifikasi apabila studi kasus tidak tersedia, tujuan proyek tidak dapat dikenali, scope saling bertentangan, atau perubahan diminta terhadap baseline yang sudah disetujui tanpa change request.

## Human Review

Manusia harus memeriksa kebenaran stakeholder, scope, asumsi, constraint, risiko, prioritas pertanyaan terbuka, dan keputusan apakah artefak siap diteruskan ke elicitation.
