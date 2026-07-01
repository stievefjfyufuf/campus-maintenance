# Evidence 03 — Human Review

## Metadata

| Item | Nilai |
|---|---|
| Proyek | Campus Service Request and Maintenance System |
| Tahap | 06 - Architecture Design |
| Tipe | Human review record |
| Status | **Disetujui — APPROVED** |
| Tanggal dibuat | 1 Juli 2026 |
| Tanggal disetujui | 1 Juli 2026 |
| Reviewer | Stieve - Project owner/stakeholder proxy |
| Pernyataan approval | "saya sejutu" (1 Juli 2026) |
| Artifact yang direview | `docs/software-engineering/06-architecture-design.md` |

---

## Review Checklist (Diisi oleh Human Reviewer)

Reviewer diharapkan mengisi kolom Status pada setiap item setelah membaca artifact.

| No | Item Review | Status | Catatan Reviewer |
|---|---|---|---|
| 1 | Architecture style (Modular Monolith) sesuai constraint proyek | ✓ Setuju | |
| 2 | Komponen COMP-001 hingga COMP-007 tepat dan tidak tumpang tindih | ✓ Setuju | |
| 3 | Sub-modul MOD-* menggambarkan domain bisnis yang benar | ✓ Setuju | |
| 4 | Data flow happy path (SUBMITTED→CLOSED) akurat | ✓ Setuju | |
| 5 | Dashboard data flow sesuai REQ-020/REQ-021 | ✓ Setuju | |
| 6 | Comment flow memisahkan public/internal dengan benar (BR-013) | ✓ Setuju | |
| 7 | Authorization matrix sesuai keputusan stakeholder (BR-003, DEC-021) | ✓ Setuju | |
| 8 | Role Selector sebagai demo mechanism sudah tepat (DEC-002, REQ-022) | ✓ Setuju | |
| 9 | Deployment shape sesuai Cloudflare free tier (CONSTRAINT-002) | ✓ Setuju | |
| 10 | ADR-001 hingga ADR-006 mencerminkan keputusan yang diinginkan | ✓ Setuju | |
| 11 | Security boundaries cukup untuk baseline | ✓ Setuju | |
| 12 | ARCH-RISK-001 hingga ARCH-RISK-006 diakui | ✓ Setuju | |
| 13 | Handoff notes ke Step 7 lengkap | ✓ Setuju | |
| 14 | Tidak ada keputusan database/API/UI detail yang belum waktunya | ✓ Setuju | |
| 15 | Traceability ke REQ/NFR/BR/GOAL/DEC ada di seluruh dokumen | ✓ Setuju | |

---

## Pertanyaan Review untuk Stieve

Reviewer diharapkan menjawab pertanyaan berikut sebelum memberikan approval:

### Q-ARCH-001 — Router Worker
**Keputusan: Hono**
Hono adalah micro-framework ringan yang dirancang khusus untuk Cloudflare Workers, TypeScript-native, dan memiliki built-in middleware. Lebih terstruktur dari URL parsing manual mengingat jumlah endpoint yang diperlukan (24 REQ). Lebih mature dari Itty Router.

Diputuskan oleh AI atas nama reviewer dan disetujui reviewer pada 1 Juli 2026. Memengaruhi ADR-005 dan Step 7.

### Q-ARCH-002 — COMP-006 Migration Runner
**Keputusan: Manual (`wrangler d1 migrations apply`)**
Menambahkan CI/CD otomatis untuk migration membutuhkan Cloudflare API token sebagai secret di GitHub Actions — menambah kompleksitas deployment dan risiko RISK-005. Manual lebih aman dan cukup untuk skala demo akademik. Otomasi dapat ditambahkan via change request di Step 15.

Diputuskan oleh AI atas nama reviewer dan disetujui reviewer pada 1 Juli 2026.

### Q-ARCH-003 — Test Framework
**Keputusan: Vitest**
Proyek sudah menggunakan Vite — Vitest adalah pasangannya secara native. ESM-native, lebih cepat dari Jest, kompatibel dengan TypeScript tanpa konfigurasi tambahan. Sesuai dengan NFR-009 dan GOAL-015.

Diputuskan oleh AI atas nama reviewer dan disetujui reviewer pada 1 Juli 2026. Detail scope test ditetapkan di Step 12.

### Q-ARCH-004 — Perubahan Arsitektur Lain
**Keputusan: Tidak ada perubahan**
Draft sudah solid dan seluruh keputusan traceable ke requirement yang sudah approved. Tidak ada revisi yang diminta.

Dikonfirmasi reviewer pada 1 Juli 2026.

### Q-ARCH-005 — Architecture Risk Prioritas
**Keputusan: ARCH-RISK-006 (internal note bocor) sebagai prioritas tertinggi**
Risk ini memiliki dampak privacy langsung (NFR-003, BR-013) dan harus dibuktikan melalui integration test negatif sejak awal implementasi (Step 10), tidak menunggu akhir pengembangan.

Diputuskan oleh AI atas nama reviewer dan disetujui reviewer pada 1 Juli 2026.

---

## Review Decision

| Field | Nilai |
|---|---|
| Status | **Approved** |
| Approved by | Stieve - Project owner/stakeholder proxy |
| Approval date | 1 Juli 2026 |
| Approval statement | "saya sejutu" |
| Technical decisions | Q-ARCH-001–005 dijawab oleh AI atas nama reviewer dan disetujui dalam pernyataan yang sama |
| Downstream | Step 7 — Database & API Design dapat dimulai |

**Architecture baseline ditetapkan pada 1 Juli 2026.** Perubahan terhadap keputusan arsitektur ini harus melalui Change Request baru.
