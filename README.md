# Campus Maintenance

Repository proyek **Campus Service Request and Maintenance System** untuk mata kuliah Software Engineering.

## Status

Baseline aktif adalah **REL-002**. MVP menggunakan React, TypeScript, Vite, Hono, Cloudflare Workers, D1, Wrangler, dan Vitest. Workflow Software Engineering Step 1–16 telah dijalankan sampai deployment production Step 15 dan change-control Step 16.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

## Pemeriksaan Awal

```bash
npm run lint
npm run build
npm test
```

Pada PowerShell Windows, jika `npm.ps1` diblokir execution policy, gunakan bentuk berikut:

```bash
npm.cmd test
npm.cmd run lint
npm.cmd run build
```

## Struktur Utama

- `skills/`: reusable AI skills lokal Step 1–15.
- `docs/software-engineering/`: artefak utama Step 1–16 dan change request.
- `docs/requirements/`: index requirements engineering.
- `docs/design/`: index artefak desain yang menunjuk Step 6–8.
- `docs/testing/`: index artefak testing yang menunjuk Step 12–14.
- `docs/deployment/`: index deployment/release yang menunjuk Step 15.
- `src/`: frontend React.
- `worker/`: backend Cloudflare Worker.
- `database/migrations/`: migration Cloudflare D1.
- `tests/`: unit dan regression tests.
- `evidence/`: invocation AI, output awal, dan human review evidence.

## Deployment

[Aplikasi publik](https://campus-maintenance.stievefjfyufuf.workers.dev) berjalan di Cloudflare Workers dengan database D1 region APAC.

Release aktif:

- REL-001: baseline MVP awal.
- REL-002: dashboard metrics UI untuk admin/manajer, automated dashboard tests, dan production smoke test.

## Known Limitations

Autentikasi menggunakan role selector dan pengguna dummy untuk demonstrasi akademik, bukan untuk produksi nyata. Upload, email, QR, inventory, vendor, aplikasi native, dan autentikasi produksi tetap di luar baseline.
