# UI Design

## Metadata

| Item | Value |
|---|---|
| Baseline | REL-001 |
| Change | CR-006 |
| Status | Approved design; UI-005 selected for implementation |
| Inputs | REQ-001–024, AC-001–048, API-001–022, ADR-001–006 |
| Platform | Responsive web, Bahasa Indonesia |

CR-006 memperinci desain yang sebelumnya diringkas di CR-005. Requirement, acceptance criteria, kontrak API, role boundary, serta scope REL-001 tidak diubah.

## Design Principles

- Aksi hanya terlihat ketika role dan status mengizinkan; API tetap menjadi enforcement boundary.
- Status, prioritas, identitas laporan, dan feedback aksi selalu terbaca sebagai teks, bukan warna saja.
- Data operasional berasal dari D1 melalui API; UI tidak memakai angka dashboard statis.
- Layout desktop dan mobile mempertahankan urutan informasi serta akses keyboard.
- Pesan error tidak membocorkan laporan atau komentar yang tidak boleh diakses.

## Screen List

| ID | Screen/area | User goal | Main actions | Data/API | Traceability |
|---|---|---|---|---|---|
| UI-001 | Header dan role selector | Berpindah identitas demo | Memilih seeded user | API-001 | REQ-022, AC-043/044 |
| UI-002 | Daftar laporan | Menemukan dan memantau laporan sesuai akses | Search, filter status, membuka aksi yang diizinkan | API-003 | REQ-003/004/024, AC-005/007/008/047 |
| UI-003 | Form laporan baru | Mengirim masalah fasilitas | Mengisi, memvalidasi, mengirim, reset setelah sukses | API-002, API-019, API-022 | REQ-001/002, AC-001–004 |
| UI-004 | Aksi lifecycle pada kartu | Memindahkan laporan melalui workflow | Review, assign, accept, resolve, close | API-005, API-007, API-009, API-011, API-012 | REQ-005/008/010/012/013, AC-009/015/020/023/025 |
| UI-005 | Dashboard operasional | Melihat kondisi layanan dari data nyata | Membaca total, aktif, selesai, terlambat, distribusi status | API-018 | REQ-020/024, AC-039/040/047 |
| UI-006 | Detail laporan | Memeriksa seluruh data satu laporan | Membaca detail dan kembali ke daftar | API-004 | REQ-003, AC-006 |
| UI-007 | Triage dan assignment | Menetapkan kategori, prioritas, dan teknisi | Triage, assign, reassign | API-006–008 | REQ-006/008/009/023, AC-011/015/017/045 |
| UI-008 | Progress dan resolution | Mendokumentasikan pekerjaan | Tambah progres dan ringkasan penyelesaian | API-010/011 | REQ-011/012, AC-021–024 |
| UI-009 | Comments dan audit | Berkomunikasi tanpa membocorkan catatan internal | Tambah/baca komentar, baca history | API-015–017 | REQ-018/019, AC-035–038 |
| UI-010 | Reopen dan konfirmasi | Menutup atau mengembalikan laporan bermasalah | Close, request reopen, decide reopen | API-012–014 | REQ-013/016/017, AC-025/031–034 |

## Role and Permission Matrix

| Area | Pelapor | Admin | Teknisi | Manajer |
|---|---|---|---|---|
| Role selector | Yes | Yes | Yes | Yes |
| Create report | Yes | No | No | No |
| Visible reports | Own | All | Assigned | All |
| Review/triage | No | Yes | No | No |
| Assign | No | Yes | No | Yes |
| Accept/resolve | No | No | Assigned only | No |
| Close resolved | Own | Policy-based | No | No |
| Dashboard | No | Yes | No | Yes |
| Internal comments/history | No | Yes | Related only | Yes |

## Navigation and Primary Flows

### FLOW-001 — Create and monitor

`UI-001 Pelapor → UI-003 Create → success notice with report ID → UI-002 refreshed list`.

### FLOW-002 — Normal lifecycle

`UI-001 Admin → UI-002/UI-004 review → UI-007 assign → UI-001 Teknisi → UI-004 accept → UI-008 resolve → UI-001 Pelapor → UI-010 close`.

### FLOW-003 — Operational dashboard

`UI-001 Admin/Manajer → UI-005 loading → metrics from API-018 → status distribution`; changing to Pelapor/Teknisi removes the dashboard immediately.

### FLOW-004 — Failure recovery

Failed requests retain the current role and filters, announce a concise error in the global status notice, and offer a retry through the original action or dashboard retry button.

## Form Specifications

| UI/Form | Field | Control | Validation | Message |
|---|---|---|---|---|
| UI-003 Create | title | text | Required, 5–100 chars | `Judul harus 5–100 karakter.` |
| UI-003 Create | reporter_contact | tel/text | Required, permitted phone chars, min 8 | `Kontak pelapor tidak valid.` |
| UI-003 Create | description | textarea | Required, 20–2000 chars | `Deskripsi harus 20–2000 karakter.` |
| UI-003 Create | location_id | select | Active location required | `Lokasi wajib dipilih.` |
| UI-003 Create | category_id | select | Active category required | `Kategori wajib dipilih.` |
| UI-003 Create | location_detail | text | Optional, max 255 chars | `Detail lokasi maksimal 255 karakter.` |
| UI-007 Triage | category_id | select | Active category | `Kategori tidak valid.` |
| UI-007 Triage | priority | select | LOW/MEDIUM/HIGH/URGENT | `Prioritas tidak valid.` |
| UI-008 Resolve | completion_summary | textarea | Required, min 15 chars | `Ringkasan penyelesaian minimal 15 karakter.` |
| UI-009 Comment | content | textarea | Required, non-blank | `Komentar wajib diisi.` |
| UI-010 Reopen | reason | textarea | Required, min 15 chars | `Alasan reopen minimal 15 karakter.` |

## UI States

| State | Required behavior |
|---|---|
| Loading | Show contextual text or skeleton; do not show stale metrics under a new role. |
| Empty | Report list says no matching reports; dashboard distribution says no status data without treating zero as an error. |
| Error | Global notice uses `role=status`; dashboard additionally offers `Coba lagi`. |
| Success | Announce created ID or successful status update, refresh affected data, and preserve role. |
| Unauthorized | Hide disallowed actions and safely render API 401/403 without protected data. |
| Disabled | Submit/action is disabled while its request is in flight to prevent duplicate mutation. |
| Partial data | Dashboard renders available numeric values with zero fallback and never invents trends. |

## UI-005 Dashboard Specification

- Visible only for `ADMIN` and `MANAJER`.
- Heading and helper copy explain that metrics come from operational D1 data.
- Summary cards: total, active (`total - closed`), closed, overdue.
- Status distribution uses API status/count pairs and works with zero rows.
- Fetches again whenever the selected authorized user changes and after lifecycle updates.
- Errors are isolated from the report list so one failed dashboard request does not remove reports.
- No charting library is introduced; text and numeric cards remain responsive and accessible.

## Responsive and Accessibility Requirements

- At widths below 700px, header, toolbar, form, summary cards, and status distribution become one-column flows.
- Every input has a visible label; interactive controls have accessible names and keyboard focus.
- Notices use live-region semantics; headings follow a logical hierarchy.
- Summary values include visible labels, and status distribution remains readable without color.
- Touch targets retain adequate padding and actions do not rely on hover.

## Text Wireframes

### Desktop

```text
+ Header: product identity                         [Role selector] +
+-----------------------------------------------------------------+
| Dashboard (Admin/Manager only)                                   |
| [Total] [Aktif] [Selesai] [Terlambat]                            |
| Distribusi: SUBMITTED 2 | IN_PROGRESS 1 | CLOSED 4               |
+-----------------------------------------------------------------+
| Daftar laporan                         [Search] [Status filter]   |
| [Report card] [Report card] [Report card]                        |
+-----------------------------------------------------------------+
```

### Mobile

```text
[Product]
[Role selector]
[Dashboard cards stacked]
[Status distribution wrapped]
[Search]
[Status filter]
[Report card]
```

## Assumptions, Gaps, and Handoff

- API-018 currently returns total, closed, in-progress, overdue, and `byStatus`; richer category, priority, trend, and workload metrics remain a known API gap and are not invented in UI.
- UI-006–010 remain design-ready backlog areas; CR-006 selects only UI-005 implementation.
- Handoff to Step 9: create a reviewable issue for UI-005 with no database/API scope expansion.
# CR-009 UI Addendum — REL-003

`UI-006` adds a split login landing page with Google OAuth availability state and explicit academic demo fallback. `UI-007` adds a persistent light/dark theme control. `UI-008` adds role-oriented workspace headings and KPI cards for PELAPOR, ADMIN, TEKNISI, and MANAJER while preserving the existing workflow actions. The layout is responsive and keeps labeled controls, focus indicators, loading, empty, error, and success states.
