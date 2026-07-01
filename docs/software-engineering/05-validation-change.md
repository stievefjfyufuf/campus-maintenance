# Requirement Validation and Early Change Analysis

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 05 - Validation and Change |
| Status | Validated - Ready for Step 6 Architecture Design |
| Tanggal | 1 Juli 2026 |
| Human reviewer | Stieve - Project owner/stakeholder proxy |
| Upstream | `02-elicitation.md`, `03-specification.md`, `04-prioritization.md` |
| Tahap berikutnya | 06 - Architecture Design jika readiness disetujui |

Dokumen ini memvalidasi requirement dan mencatat penyelesaian temuan melalui `CR-001`. `Y` berarti kriteria terpenuhi. Riwayat `VAL-001` sampai `VAL-010` dipertahankan agar alasan perubahan tetap dapat ditelusuri.

## Human Review Record

Pada 1 Juli 2026, Stieve menyatakan telah membaca dan menyetujui seluruh rekomendasi Step 5. Persetujuan mengesahkan DEC-017 sampai DEC-022 serta perubahan terbatas yang dicatat dalam `CR-001`.

# Validation Summary

| Area | Checked | Ready | Provisional | Change Required |
|---|---:|---:|---:|---:|
| Functional requirements | 24 | 24 | 0 | 0 |
| Non-functional requirements | 12 | 12 | 0 | 0 |
| Business rules | 14 | 14 | 0 | 0 |
| Acceptance criteria | 48 | 48 | 0 | 0 |
| Prioritization/MVP boundary | 2 critical checks | 2 | 0 | 0 |

Tidak ditemukan duplicate requirement atau requirement tanpa sumber. Seluruh `REQ` memiliki acceptance criteria dan traceability. Temuan provisional serta konflik Step 3/4 telah diselesaikan melalui DEC-017 sampai DEC-022 dan CR-001.

# Functional Requirement Validation

| Requirement | Clear | Complete | Consistent | Feasible | Testable | Traceable | Disposition | Notes |
|---|---|---|---|---|---|---|---|---|
| REQ-001 | Y | Y | Y | Y | Y | Y | Ready | Priority awal pelapor dapat dikoreksi admin melalui REQ-006 |
| REQ-002 | Y | Y | Y | Y | Y | Y | Ready | ID, initial state, timestamp, persistence terukur |
| REQ-003 | Y | Y | Y | Y | Y | Y | Ready | DEC-021: teknisi hanya melihat laporan assigned |
| REQ-004 | Y | Y | Y | Y | Y | Y | Ready | Filter mengikuti access boundary |
| REQ-005 | Y | Y | Y | Y | Y | Y | Ready | Authority dan state asal jelas |
| REQ-006 | Y | Y | Y | Y | Y | Y | Ready | Enum dan actor jelas |
| REQ-007 | Y | Y | Y | Y | Y | Y | Ready | Nonaktif menggantikan hard delete |
| REQ-008 | Y | Y | Y | Y | Y | Y | Ready | Satu teknisi aktif dan keahlian relevan |
| REQ-009 | Y | Y | Y | Y | Y | Y | Ready | Reassignment dan audit lengkap |
| REQ-010 | Y | Y | Y | Y | Y | Y | Ready | Acceptance gate teruji |
| REQ-011 | Y | Y | Y | Y | Y | Y | Ready | Field progres dan authority jelas |
| REQ-012 | Y | Y | Y | Y | Y | Y | Ready | Ringkasan penyelesaian wajib |
| REQ-013 | Y | Y | Y | Y | Y | Y | Ready | Normal close path jelas |
| REQ-014 | Y | Y | Y | Y | Y | Y | Ready | Kalender Senin–Jumat ditetapkan DEC-019 |
| REQ-015 | Y | Y | Y | Y | Y | Y | Ready | Manual close dan kalender ditetapkan DEC-017/019 |
| REQ-016 | Y | Y | Y | Y | Y | Y | Ready | Request dan approval dapat diuji |
| REQ-017 | Y | Y | Y | Y | Y | Y | Ready | DEC-018: event `REOPENED`, target `UNDER_REVIEW` |
| REQ-018 | Y | Y | Y | Y | Y | Y | Ready | Public/internal boundary jelas |
| REQ-019 | Y | Y | Y | Y | Y | Y | Ready | Event fields dan mutation scope jelas |
| REQ-020 | Y | Y | Y | Y | Y | Y | Ready | DEC-022 mempertahankan seluruh REQ-020 sebagai Must |
| REQ-021 | Y | Y | Y | Y | Y | Y | Ready | Filter dan periode terukur |
| REQ-022 | Y | Y | Y | Y | Y | Y | Ready | Demo-only nature terdokumentasi |
| REQ-023 | Y | Y | Y | Y | Y | Y | Ready | Kalender baseline ditetapkan DEC-019 |
| REQ-024 | Y | Y | Y | Y | Y | Y | Ready | D1 sebagai source of truth |

# Non-Functional Requirement Validation

| Requirement | Clear | Complete | Consistent | Feasible | Testable | Traceable | Disposition | Notes |
|---|---|---|---|---|---|---|---|---|
| NFR-001 | Y | Y | Y | Y | Y | Y | Ready | Dataset performa ditetapkan DEC-020 |
| NFR-002 | Y | Y | Y | Y | Y | Y | Ready | Dataset performa ditetapkan DEC-020 |
| NFR-003 | Y | Y | Y | Y | Y | Y | Ready | Negative authorization tests ditentukan |
| NFR-004 | Y | Y | Y | Y | Y | Y | Ready | Zero critical finding terukur |
| NFR-005 | Y | Y | Y | Y | Y | Y | Ready | Transaction rollback dapat diuji |
| NFR-006 | Y | Y | Y | Y | Y | Y | Ready | Local/production smoke test |
| NFR-007 | Y | Y | Y | Y | Y | Y | Ready | Checklist state UI dapat dibuat |
| NFR-008 | Y | Y | Y | Y | Y | Y | Ready | Automated scan + keyboard walkthrough |
| NFR-009 | Y | Y | Y | Y | Y | Y | Ready | Build/lint/test dan layer boundary |
| NFR-010 | Y | Y | Y | Y | Y | Y | Ready | Tidak ada mutation endpoint history |
| NFR-011 | Y | Y | Y | Y | Y | Y | Ready | Policy/schema dapat diverifikasi tanpa data 3 tahun |
| NFR-012 | Y | Y | Y | Y | Y | Y | Ready | URL publik dan free tier smoke test |

# Business Rule Validation

| Rules | Disposition | Notes |
|---|---|---|
| BR-001–BR-007 | Ready | State, authority, assignment, category, dan priority konsisten |
| BR-008–BR-010 | Ready | Manual close dan kalender hari kerja disahkan DEC-017/019 |
| BR-011–BR-014 | Ready | Reopen target dan access boundary disahkan DEC-018/021 |

# Acceptance Criteria Validation

| AC Range | Result | Notes |
|---|---|---|
| AC-001–AC-026 | Testable | Positive/negative paths tersedia; tidak semuanya termasuk MVP Must |
| AC-027–AC-030 | Testable | Manual close dan kalender ditetapkan DEC-017/019 |
| AC-031–AC-032 | Testable | Request reopen dan reason validation jelas |
| AC-033–AC-034 | Testable | Target `UNDER_REVIEW` ditetapkan DEC-018 |
| AC-035–AC-044 | Testable | Comment privacy, audit, dashboard, role switching dapat diuji |
| AC-045–AC-046 | Testable | Kalender hari kerja ditetapkan DEC-019 |
| AC-047–AC-048 | Testable | Persistence dan dashboard source-of-truth jelas |

# Initial Findings (Resolution Recorded Below)

## Critical Findings

- **VAL-001 — Incorrect MVP AC range:** Step 4 menyatakan AC-001 sampai AC-026 sebagai exit criteria MVP. Rentang tersebut ikut memasukkan AC-007/008 (`REQ-004` Should), AC-013/014 (`REQ-007` Should), dan AC-017/018 (`REQ-009` Should). Exit criteria harus memakai daftar AC Must yang eksplisit, bukan rentang kontigu.
- **VAL-002 — Dashboard scope mismatch:** `REQ-020` mewajibkan seluruh metrik dashboard, sedangkan Step 4 menyatakan hanya total, per status, per priority, dan recent activity sebagai MVP. Prioritization tidak boleh mempersempit arti requirement approved. Pilihan: seluruh REQ-020 tetap Must, atau buat change request untuk memecah core dan advanced dashboard.

## Major Findings

- **VAL-003 — Close mode unresolved:** REQ-015 memakai close manual, tetapi Q-028 belum disahkan sebagai keputusan stakeholder.
- **VAL-004 — Reopen target state unresolved:** REQ-017/AC-033 memakai `UNDER_REVIEW`, tetapi Q-029 masih terbuka.
- **VAL-005 — Business-day calendar unresolved:** REQ-014/015/023, BR-008–010, dan AC-027–030/045–046 membutuhkan definisi Q-030.
- **VAL-006 — Performance dataset unresolved:** NFR-001/002 memiliki threshold tetapi belum memiliki jumlah data/pengguna Q-031.
- **VAL-007 — Technician pre-assignment visibility unresolved:** MVP least-privilege dapat berjalan, tetapi kebutuhan melihat laporan sesuai keahlian dari Q-002 belum diselesaikan oleh Q-032.

## Minor Findings

- **VAL-008 — Delivery metadata open:** Q-033 belum menghambat desain, tetapi dapat mengubah release schedule/demo preparation.
- **VAL-009 — Step 1 status stale:** `01-inception.md` masih berstatus draft walaupun Step 2–4 telah disetujui dan bergantung padanya. Tidak mengubah requirement, tetapi status artefak perlu dirapikan melalui change/baseline record.
- **VAL-010 — Missing project-local Step 3 skill:** Repository memiliki placeholder `skills/03-specification/.gitkeep`, tetapi belum memiliki `SKILL.md`, berbeda dari target reusable skill per tahap.

# Early Change Analysis

| Change Candidate | Trigger | Approved/Deferred Change | Impacted IDs | Impact | Result |
|---|---|---|---|---|---|
| CHG-CAND-001 | VAL-001 | Ganti rentang exit criteria MVP dengan daftar AC Must eksplisit | Step 4 only; AC IDs tetap | Documentation correction; tidak mengubah requirement | Applied via CR-001 |
| CHG-CAND-002 | VAL-002 | Pertahankan seluruh REQ-020 sebagai Must | REQ-020, AC-039/040, Step 4 | Effort MVP bertambah; requirement tidak dipecah | Applied via DEC-022/CR-001 |
| CHG-CAND-003 | VAL-003–007 | Sahkan DEC-017–DEC-021 | REQ-003/014/015/017/023, NFR-001/002 | Menghilangkan provisional status | Applied via CR-001 |
| CHG-CAND-004 | VAL-009 | Sinkronkan status Step 1 melalui change record terpisah | Step 1 metadata | Documentation governance | Applied via CR-002 |
| CHG-CAND-005 | VAL-010 | Tambahkan reusable `skills/03-specification/SKILL.md` pada cleanup terpisah | CONSTRAINT-005 | Evidence/delivery completeness | Applied via CR-002 |

Perubahan approved pada Step 3–4 dicatat melalui `CR-001`. CHG-CAND-004/005 tidak termasuk scope CR-001 dan tetap deferred.

# Approved Stakeholder Decisions

| Decision | Resolution | Impact | Status |
|---|---|---|---|
| DEC-017 / Q-028 | Close manual oleh administrator setelah 5 hari kerja dengan alasan audit. | REQ-015 final; tanpa scheduler auto-close | Approved |
| DEC-018 / Q-029 | Kembali ke `UNDER_REVIEW`, dengan event `REOPENED` di audit history. | State machine final; REQ-017 ready | Approved |
| DEC-019 / Q-030 | Senin–Jumat tanpa kalender libur khusus untuk baseline. | SLA deterministik | Approved |
| DEC-020 / Q-031 | 1.000 laporan, 50 pengguna, 20 teknisi, 20 kategori. | NFR-001/002 repeatable | Approved |
| DEC-021 / Q-032 | Teknisi hanya melihat laporan assigned. | Least privilege; tidak ada pre-assignment visibility | Approved |
| DEC-022 / VAL-002 | Seluruh REQ-020 tetap Must untuk baseline/MVP. | Requirement approved tidak dipersempit | Approved |

Q-033 dapat tetap open sampai dosen memberi aturan tambahan dan tidak menghambat arsitektur.

# Corrected MVP Acceptance Set Proposal

Exit criteria berbasis AC untuk scope Must yang disahkan melalui CR-001 adalah:

- REQ-001–003: AC-001–AC-006.
- REQ-005–006: AC-009–AC-012.
- REQ-008: AC-015–AC-016.
- REQ-010–013: AC-019–AC-026.
- REQ-018–020: AC-035–AC-040.
- REQ-022: AC-043–AC-044.
- REQ-024: AC-047–AC-048.

AC-007/008, AC-013/014, dan AC-017/018 tetap valid untuk Baseline+ dan tidak dihapus.

# Finding Resolution Register

| Finding | Resolution | Status |
|---|---|---|
| VAL-001 | Exit criteria Step 4 diganti dengan daftar AC Must eksplisit melalui CR-001. | Resolved |
| VAL-002 | Seluruh REQ-020 dipertahankan sebagai Must melalui DEC-022. | Resolved |
| VAL-003 | Close manual disahkan DEC-017. | Resolved |
| VAL-004 | Reopen ke `UNDER_REVIEW` disahkan DEC-018. | Resolved |
| VAL-005 | Kalender Senin–Jumat disahkan DEC-019. | Resolved |
| VAL-006 | Dataset performa disahkan DEC-020. | Resolved |
| VAL-007 | Assigned-only visibility disahkan DEC-021. | Resolved |
| VAL-008 | Q-033 tetap open sebagai metadata delivery dan non-blocking. | Accepted open |
| VAL-009 | Status dan human-review evidence Step 1 disinkronkan melalui CR-002. | Resolved |
| VAL-010 | Project-local Step 3 skill ditambahkan dan divalidasi melalui CR-002. | Resolved |

## Post-Validation Governance Cleanup

CR-002 menutup VAL-009/010 serta menyinkronkan evidence dan requirements index yang stale. Cleanup tidak mengubah arti, prioritas, atau acceptance criteria requirement; seluruh ID tetap dipertahankan.

# Readiness Decision

**Ready for design: Yes.**

Alasan:

1. Seluruh 24 REQ, 12 NFR, 14 BR, dan 48 AC clear, complete, consistent, feasible, testable, dan traceable.
2. DEC-017 sampai DEC-022 menyelesaikan state, access, calendar, dataset, close behavior, dan dashboard scope.
3. VAL-001/002 telah dikoreksi dalam batas CR-001 tanpa menghapus atau mengganti ID requirement/AC.
4. Q-033 tetap terbuka hanya sebagai delivery metadata dan tidak memengaruhi arsitektur aplikasi.

# Handoff Routing

| Item | Route |
|---|---|
| Seluruh REQ/NFR/BR/AC | Kirim ke 06-se-architecture-design |
| DEC-017–DEC-022 | Gunakan sebagai constraint desain |
| Q-033 | Pantau sebagai delivery metadata; tidak menghambat desain |
| VAL-009/010 | Resolved via CR-002; tidak mengubah arsitektur |

## Quality Checklist

- [x] Seluruh 24 REQ divalidasi untuk clarity, completeness, consistency, feasibility, testability, dan traceability.
- [x] Seluruh 12 NFR divalidasi dengan measurement concern.
- [x] Seluruh 14 BR dan 48 AC diperiksa.
- [x] Duplicate, vague, provisional, dan conflicting items ditandai.
- [x] Konflik Step 3 vs Step 4 tidak disembunyikan.
- [x] Change candidates memiliki reason, impact, dan recommendation.
- [x] Readiness decision dan routing dinyatakan.
- [x] DEC-017 sampai DEC-022 disetujui dan seluruh blocker desain ditutup.
