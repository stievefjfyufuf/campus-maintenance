# Campus Maintenance

Repository proyek **Campus Service Request and Maintenance System** untuk mata kuliah Software Engineering.

## Status

Baseline MVP menggunakan React, TypeScript, Vite, Hono, Cloudflare Workers, D1, Wrangler, dan Vitest. Step 1–14 telah dikerjakan; deployment production dicatat pada Step 15.

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

## Struktur Utama

- `skills/`: reusable AI skills 01-15.
- `docs/requirements/`: dokumen requirements engineering.
- `docs/design/`: arsitektur, database, API, UI flow, dan wireframe.
- `docs/testing/`: test plan dan bukti pengujian.
- `docs/deployment/`: deployment guide dan release note.
- `src/`: frontend React.
- `worker/`: backend Cloudflare Worker.
- `database/migrations/`: migration Cloudflare D1.
- `tests/`: unit, integration, dan acceptance tests.
- `evidence/`: invocation AI, output awal, human review, dan hasil final.

## Deployment

Belum dilakukan. URL Cloudflare akan dicantumkan setelah tahap deployment selesai.

## Known Limitations

Autentikasi menggunakan role selector dan pengguna dummy untuk demonstrasi akademik, bukan untuk produksi nyata. Upload, email, QR, inventory, vendor, dan aplikasi native tetap di luar baseline.
