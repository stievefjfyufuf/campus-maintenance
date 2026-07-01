import { useCallback, useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'
import {
  buildDashboardMetrics,
  canViewDashboardRole,
  normalizeStatusDistribution,
  type DashboardResponse,
} from './dashboard'

type User = { id: string; name: string; role: string }
type Option = { id: string; name: string }
type Report = {
  id: string
  title: string
  description: string
  status: string
  current_priority: string
  category_name: string
  location_name: string
  created_at: string
}
const fallbackUsers: User[] = [
  { id: 'usr-reporter', name: 'Rina Pelapor', role: 'PELAPOR' },
  { id: 'usr-admin', name: 'Adi Administrator', role: 'ADMIN' },
  { id: 'usr-tech', name: 'Tono Teknisi', role: 'TEKNISI' },
  { id: 'usr-manager', name: 'Maya Manajer', role: 'MANAJER' },
]

export default function App() {
  const [users, setUsers] = useState<User[]>(fallbackUsers)
  const [user, setUser] = useState<User>(fallbackUsers[0])
  const [reports, setReports] = useState<Report[]>([])
  const [categories, setCategories] = useState<Option[]>([])
  const [locations, setLocations] = useState<Option[]>([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [dashboard, setDashboard] = useState<DashboardResponse | null>(null)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const [dashboardError, setDashboardError] = useState('')

  const canViewDashboard = canViewDashboardRole(user.role)

  const request = useCallback(
    async (path: string, init?: RequestInit) => {
      const res = await fetch(path, {
        ...init,
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': user.id,
          'X-Role': user.role,
          ...init?.headers,
        },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Permintaan gagal')
      return data
    },
    [user.id, user.role],
  )

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const query = new URLSearchParams({
        ...(search && { search }),
        ...(status && { status }),
      })
      setReports(await request(`/api/reports?${query}`))
    } catch (error) {
      setMessage((error as Error).message)
    } finally {
      setLoading(false)
    }
  }, [request, search, status])

  const loadDashboard = useCallback(async () => {
    if (!canViewDashboard) {
      setDashboard(null)
      setDashboardError('')
      setDashboardLoading(false)
      return
    }
    setDashboardLoading(true)
    setDashboardError('')
    try {
      setDashboard(await request('/api/dashboard'))
    } catch (error) {
      setDashboard(null)
      setDashboardError((error as Error).message)
    } finally {
      setDashboardLoading(false)
    }
  }, [canViewDashboard, request])

  useEffect(() => {
    Promise.all([
      fetch('/api/users').then((response) => response.json()),
      request('/api/categories'),
      request('/api/locations'),
    ])
      .then(([nextUsers, nextCategories, nextLocations]) => {
        setUsers(nextUsers)
        setCategories(nextCategories)
        setLocations(nextLocations)
      })
      .catch(() => setMessage('Jalankan migrasi dan seed D1 terlebih dahulu.'))
  }, [request])

  // The report list and dashboard are synchronized with role and filter changes.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
    void loadDashboard()
  }, [load, loadDashboard])

  async function createReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    try {
      const result = await request('/api/reports', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      setMessage(`Laporan ${result.id} berhasil dibuat.`)
      form.reset()
      await load()
    } catch (error) {
      setMessage((error as Error).message)
    }
  }

  async function action(id: string, path: string, method = 'PATCH', body?: object) {
    try {
      await request(`/api/reports/${id}/${path}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
      })
      setMessage('Status berhasil diperbarui.')
      await Promise.all([load(), loadDashboard()])
    } catch (error) {
      setMessage((error as Error).message)
    }
  }

  const dashboardMetrics = buildDashboardMetrics(dashboard)
  const statusDistribution = normalizeStatusDistribution(dashboard)

  return (
    <div className="app-shell">
      <header>
        <div>
          <span className="eyebrow">CAMPUS CARE</span>
          <h1>Pusat Pemeliharaan Kampus</h1>
          <p>Laporkan, pantau, dan selesaikan gangguan fasilitas dalam satu alur.</p>
        </div>
        <label className="role">
          Masuk sebagai
          <select
            value={user.id}
            onChange={(event) =>
              setUser(users.find((item) => item.id === event.target.value) || fallbackUsers[0])
            }
          >
            {users.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name} · {item.role}
              </option>
            ))}
          </select>
        </label>
      </header>

      {message && (
        <div className="notice" role="status">
          {message}
          <button aria-label="Tutup pemberitahuan" onClick={() => setMessage('')}>
            ×
          </button>
        </div>
      )}

      <main>
        {canViewDashboard && (
          <section className="panel dashboard" aria-labelledby="dashboard-title">
            <div className="section-heading">
              <div>
                <span className="eyebrow dark">RINGKASAN OPERASIONAL</span>
                <h2 id="dashboard-title">Dashboard fasilitas</h2>
                <p>Metrik terkini dihitung dari laporan yang tersimpan di D1.</p>
              </div>
              {dashboardError && (
                <button className="secondary" onClick={() => void loadDashboard()}>
                  Coba lagi
                </button>
              )}
            </div>

            {dashboardLoading ? (
              <p className="dashboard-state" role="status">
                Memuat ringkasan dashboard…
              </p>
            ) : dashboardError ? (
              <p className="dashboard-state error" role="alert">
                Dashboard belum dapat dimuat: {dashboardError}
              </p>
            ) : (
              <>
                <div className="metric-grid">
                  {dashboardMetrics.map((metric) => (
                    <article className="metric" key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </article>
                  ))}
                </div>
                <div className="status-summary">
                  <h3>Distribusi status</h3>
                  {statusDistribution.length ? (
                    <ul>
                      {statusDistribution.map((item) => (
                        <li key={item.status}>
                          <span>{item.label}</span>
                          <strong>{item.count}</strong>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Belum ada laporan untuk diringkas.</p>
                  )}
                </div>
              </>
            )}
          </section>
        )}

        <section className="toolbar">
          <div>
            <h2>Daftar laporan</h2>
            <p>
              {reports.length} laporan terlihat untuk peran {user.role}
            </p>
          </div>
          <div className="filters">
            <input
              aria-label="Cari laporan"
              placeholder="Cari ID atau judul…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              aria-label="Filter status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">Semua status</option>
              {['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].map(
                (item) => (
                  <option key={item}>{item}</option>
                ),
              )}
            </select>
          </div>
        </section>

        {user.role === 'PELAPOR' && (
          <section className="panel">
            <h2>Buat laporan baru</h2>
            <form onSubmit={createReport} className="report-form">
              <label>
                Judul
                <input name="title" required minLength={5} maxLength={100} />
              </label>
              <label>
                Kontak
                <input name="reporter_contact" required placeholder="0812 3456 7890" />
              </label>
              <label className="wide">
                Deskripsi
                <textarea name="description" required minLength={20} maxLength={2000} />
              </label>
              <label>
                Lokasi
                <select name="location_id" required>
                  <option value="">Pilih lokasi</option>
                  {locations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Kategori
                <select name="category_id" required>
                  <option value="">Pilih kategori</option>
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="wide">
                Detail lokasi
                <input
                  name="location_detail"
                  maxLength={255}
                  placeholder="Contoh: Lantai 2, ruang 204"
                />
              </label>
              <button className="primary" type="submit">
                Kirim laporan
              </button>
            </form>
          </section>
        )}

        <section className="cards">
          {loading ? (
            <p className="empty">Memuat laporan…</p>
          ) : reports.length === 0 ? (
            <p className="empty">Belum ada laporan yang sesuai.</p>
          ) : (
            reports.map((report) => (
              <article key={report.id} className="card">
                <div className="card-top">
                  <span className={`status ${report.status.toLowerCase()}`}>
                    {report.status.replaceAll('_', ' ')}
                  </span>
                  <span className="priority">{report.current_priority}</span>
                </div>
                <h3>{report.title}</h3>
                <p>{report.description}</p>
                <dl>
                  <div>
                    <dt>ID</dt>
                    <dd>{report.id}</dd>
                  </div>
                  <div>
                    <dt>Lokasi</dt>
                    <dd>{report.location_name}</dd>
                  </div>
                  <div>
                    <dt>Kategori</dt>
                    <dd>{report.category_name}</dd>
                  </div>
                </dl>
                <div className="actions">
                  {user.role === 'ADMIN' && report.status === 'SUBMITTED' && (
                    <button onClick={() => action(report.id, 'review')}>Mulai review</button>
                  )}
                  {['ADMIN', 'MANAJER'].includes(user.role) &&
                    report.status === 'UNDER_REVIEW' && (
                      <button
                        onClick={() =>
                          action(report.id, 'assign', 'POST', { technician_id: 'usr-tech' })
                        }
                      >
                        Tugaskan teknisi
                      </button>
                    )}
                  {user.role === 'TEKNISI' && report.status === 'ASSIGNED' && (
                    <button onClick={() => action(report.id, 'accept')}>Terima tugas</button>
                  )}
                  {user.role === 'TEKNISI' && report.status === 'IN_PROGRESS' && (
                    <button onClick={() => action(report.id, 'resolve')}>Tandai selesai</button>
                  )}
                  {['PELAPOR', 'ADMIN'].includes(user.role) && report.status === 'RESOLVED' && (
                    <button onClick={() => action(report.id, 'close')}>Tutup laporan</button>
                  )}
                </div>
              </article>
            ))
          )}
        </section>
      </main>
      <footer>Campus Maintenance · React + Cloudflare Workers + D1</footer>
    </div>
  )
}
