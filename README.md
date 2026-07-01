# Campus Maintenance

Repository **Campus Service Request and Maintenance System** untuk mata kuliah Software Engineering.

## Demo Aktif

[Buka aplikasi Campus Maintenance](https://campus-maintenance.stievefjfyufuf.workers.dev)

Baseline aktif adalah **REL-004** dengan React, TypeScript, Vite, Hono, Cloudflare Workers, D1, Wrangler, dan Vitest.

REL-003 mencakup:

- UI responsif dengan light/dark mode.
- Login landing dan Google OAuth routes.
- Fallback demo akademik dengan pemilihan role.
- Workspace khusus Pelapor, Administrator, Teknisi, dan Manajer.
- Workflow laporan `SUBMITTED` sampai `CLOSED`.
- Dashboard operasional berbasis data D1.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

## Pemeriksaan

```bash
npm test
npm run lint
npm run build
```

Pada PowerShell Windows gunakan `npm.cmd` bila `npm.ps1` diblokir execution policy.

## Struktur

- `src/`: frontend React.
- `worker/`: backend Cloudflare Worker/Hono.
- `database/migrations/`: schema Cloudflare D1.
- `tests/`: unit, regression, integration, dan acceptance guidance.
- `docs/software-engineering/`: artefak Step 1–16 dan change request.
- `skills/`: reusable AI skills lokal.

## Release

- REL-001: baseline MVP.
- REL-002: dashboard admin/manajer dan regression coverage.
- REL-003: modern UI, dark mode, login landing, role workspaces, dan OAuth routes.
- REL-004: pemilihan role sebelum login, role-aware OAuth state, logout yang diverifikasi, 29 test, dan pemeriksaan uptime harian.

## Google Login

Google OAuth membutuhkan `GOOGLE_CLIENT_ID` dan `GOOGLE_CLIENT_SECRET` sebagai Cloudflare Worker secrets. Secret tidak boleh disimpan di Git. Selama secret belum dikonfigurasi, aplikasi menampilkan status yang jelas dan menyediakan mode demo akademik.

Role selector demo bukan sistem otorisasi produksi. Data demo harus tetap sintetis dan tidak memuat data pribadi nyata.
