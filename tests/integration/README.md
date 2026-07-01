# Integration Tests

Integrasi frontend, Worker API, dan Cloudflare D1 diverifikasi melalui build lokal serta smoke test endpoint deployment.

Checklist utama:

1. `npm.cmd run build` menghasilkan bundle frontend dan Worker.
2. `GET /api/health` mengembalikan HTTP 200.
3. `GET /api/users` mengembalikan pengguna demo.
4. Request terautentikasi ke `/api/categories`, `/api/locations`, dan `/api/dashboard` membaca data D1.

Integration suite Worker + D1 lokal yang terisolasi masih menjadi peningkatan lanjutan; jangan menaruh kredensial Cloudflare dalam test.

