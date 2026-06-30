# Elicitation

## Tujuan

Menggali kebutuhan stakeholder melalui interview, survey, workshop, observation, dan document analysis, lalu mencatat raw needs, jawaban, ambiguitas, konflik, serta tindak lanjut tanpa langsung mengubahnya menjadi solusi teknis.

## Kapan Digunakan

- Setelah Inception dan stakeholder map tersedia.
- Ketika kebutuhan masih ambigu atau memerlukan keputusan stakeholder.
- Sebelum Specification menyusun functional requirement, non-functional requirement, user story, dan acceptance criteria.

## Input

- `docs/software-engineering/01-inception.md`
- `CASE.md`
- Brief dan rubrik tugas.
- Jawaban stakeholder atau stakeholder proxy.
- Dokumen proses, aturan, atau catatan lain yang tersedia.

## Langkah Kerja

1. Baca seluruh `GOAL`, `STK`, `ASSUMP`, scope, constraint, dan `OQ` dari Inception.
2. Pilih teknik elicitation yang sesuai untuk setiap kelompok stakeholder.
3. Kelompokkan pertanyaan berdasarkan `STK`, `GOAL`, dan `OQ`.
4. Catat jawaban apa adanya beserta sumber dan tanggal.
5. Berikan ID `NEED-###` untuk setiap kebutuhan mentah.
6. Klasifikasikan need sebagai explicit, inferred, constraint, pain point, policy/rule, atau unresolved.
7. Catat ambiguitas, konflik, keputusan yang tertunda, dan follow-up `Q-###`.
8. Lakukan human review sebelum menyerahkan raw needs ke Specification.

## Output

- `docs/software-engineering/02-elicitation.md`
- Evidence di `evidence/02-elicitation/`
- Raw needs dan ambiguity list untuk Skill 03.

## Aturan

- Jangan mengarang jawaban stakeholder.
- Bedakan jawaban eksplisit, hasil analisis dokumen, dan inferensi AI.
- Jangan langsung menulis desain database, API, atau UI.
- Pertahankan ID dari Inception.
- Jawaban ambigu harus memiliki follow-up.
- Human review tidak boleh ditandai selesai oleh AI.

## Quality Check

- [ ] Pertanyaan dikelompokkan per stakeholder dan tujuan.
- [ ] Setiap need mempunyai sumber dan traceability.
- [ ] Jawaban mentah tidak diubah diam-diam menjadi keputusan teknis.
- [ ] Ambiguitas dan konflik dicatat.
- [ ] Follow-up tersedia untuk keputusan yang belum jelas.
- [ ] Handoff ke Specification tersedia.

## Kondisi Gagal

Berhenti apabila Inception tidak tersedia, stakeholder tidak dapat diidentifikasi, sumber jawaban tidak dapat dibuktikan, atau stakeholder utama memberikan jawaban yang saling bertentangan tanpa mekanisme resolusi.

## Human Review

Manusia harus memeriksa akurasi jawaban, sumber, klasifikasi need, interpretasi pain point, konflik, ambiguitas, dan keputusan kesiapan menuju Specification.
