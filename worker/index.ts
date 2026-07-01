import { Hono } from 'hono'
import type { Context } from 'hono'
import { addBusinessDays, canTransition, newId, normalizeRole, roles, validateReport, type ReportStatus, type Role } from './domain'

type Bindings = { DB: D1Database; GOOGLE_CLIENT_ID?: string; GOOGLE_CLIENT_SECRET?: string }
type Variables = { userId: string; role: Role }
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>()

app.onError((error, c) => {
  console.error(error)
  return c.json({ error: 'Terjadi kesalahan pada server.' }, 500)
})

app.use('/api/*', async (c, next) => {
  if (c.req.path === '/api/health' || c.req.path === '/api/users' || c.req.path.startsWith('/api/auth/')) return next()
  const userId = c.req.header('X-User-Id')
  const role = c.req.header('X-Role') as Role | undefined
  if (!userId || !role || !roles.includes(role)) return c.json({ error: 'Identitas atau peran tidak valid.' }, 401)
  const user = await c.env.DB.prepare('SELECT id, role FROM users WHERE id = ? AND is_active = 1').bind(userId).first<{ id: string; role: Role }>()
  if (!user || user.role !== role) return c.json({ error: 'Identitas tidak cocok dengan peran.' }, 401)
  c.set('userId', userId); c.set('role', role)
  await next()
})

app.get('/api/health', (c) => c.json({ ok: true }))
app.get('/api/auth/config', (c) => c.json({ googleEnabled: Boolean(c.env.GOOGLE_CLIENT_ID && c.env.GOOGLE_CLIENT_SECRET) }))
app.get('/api/auth/google', (c) => {
  if (!c.env.GOOGLE_CLIENT_ID || !c.env.GOOGLE_CLIENT_SECRET) {
    return c.json({ error: 'Google Login belum dikonfigurasi. Gunakan mode demo.' }, 503)
  }
  const selectedRole = normalizeRole(c.req.query('role'))
  const state = crypto.randomUUID()
  const callback = `${new URL(c.req.url).origin}/api/auth/google/callback`
  const query = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri: callback,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account',
  })
  c.header('Set-Cookie', `cm_oauth_state=${state}.${selectedRole}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`)
  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${query}`)
})
app.get('/api/auth/google/callback', async (c) => {
  const code = c.req.query('code')
  const state = c.req.query('state')
  const savedState = c.req.header('Cookie')?.match(/(?:^|; )cm_oauth_state=([^;]+)/)?.[1]
  const [expectedState, savedRole] = savedState?.split('.') ?? []
  if (!code || !state || state !== expectedState || !roles.includes(savedRole as Role) || !c.env.GOOGLE_CLIENT_ID || !c.env.GOOGLE_CLIENT_SECRET) {
    return c.redirect('/?auth=failed')
  }
  const callback = `${new URL(c.req.url).origin}/api/auth/google/callback`
  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: c.env.GOOGLE_CLIENT_ID, client_secret: c.env.GOOGLE_CLIENT_SECRET, redirect_uri: callback, grant_type: 'authorization_code' }),
  })
  if (!tokenResponse.ok) return c.redirect('/?auth=failed')
  const token = await tokenResponse.json<{ access_token: string }>()
  const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', { headers: { Authorization: `Bearer ${token.access_token}` } })
  if (!profileResponse.ok) return c.redirect('/?auth=failed')
  const profile = await profileResponse.json<{ email: string; name: string; picture?: string }>()
  const session = btoa(unescape(encodeURIComponent(JSON.stringify({ email: profile.email, name: profile.name, picture: profile.picture, role: savedRole }))))
  c.header('Set-Cookie', `cm_google=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=28800`)
  return c.redirect('/?auth=google')
})
app.get('/api/auth/session', (c) => {
  const raw = c.req.header('Cookie')?.match(/(?:^|; )cm_google=([^;]+)/)?.[1]
  if (!raw) return c.json({ authenticated: false })
  try {
    const profile = JSON.parse(decodeURIComponent(escape(atob(raw))))
    return c.json({ authenticated: true, profile })
  } catch {
    return c.json({ authenticated: false })
  }
})
app.post('/api/auth/logout', (c) => {
  c.header('Set-Cookie', 'cm_google=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0')
  return c.json({ ok: true })
})
app.get('/api/users', async (c) => c.json((await c.env.DB.prepare('SELECT id, name, role FROM users WHERE is_active = 1 ORDER BY role').all()).results))
app.get('/api/categories', async (c) => c.json((await c.env.DB.prepare('SELECT * FROM categories WHERE is_active = 1 ORDER BY name').all()).results))
app.get('/api/locations', async (c) => c.json((await c.env.DB.prepare('SELECT * FROM locations ORDER BY name').all()).results))

app.post('/api/reports', async (c) => {
  if (c.get('role') !== 'PELAPOR') return c.json({ error: 'Hanya pelapor dapat membuat laporan.' }, 403)
  const body = await c.req.json<Record<string, unknown>>()
  const errors = validateReport(body)
  if (errors.length) return c.json({ error: errors.join(' ') }, 422)
  const id = newId(); const now = new Date().toISOString()
  await c.env.DB.batch([
    c.env.DB.prepare(`INSERT INTO reports (id,title,description,location_id,location_detail,category_id,initial_priority,current_priority,status,reporter_id,reporter_contact,created_at,updated_at) VALUES (?,?,?,?,?,?,'MEDIUM','MEDIUM','SUBMITTED',?,?,?,?)`).bind(id, body.title, body.description, body.location_id, body.location_detail ?? null, body.category_id, c.get('userId'), body.reporter_contact, now, now),
    c.env.DB.prepare(`INSERT INTO audit_events (id,report_id,actor_id,event_type,new_value,created_at) VALUES (?,?,?,?,?,?)`).bind(newId('AUD'), id, c.get('userId'), 'REPORT_CREATED', 'SUBMITTED', now),
  ])
  return c.json({ id, status: 'SUBMITTED', created_at: now }, 201)
})

app.get('/api/reports', async (c) => {
  const clauses: string[] = []; const values: unknown[] = []
  if (c.get('role') === 'PELAPOR') { clauses.push('r.reporter_id = ?'); values.push(c.get('userId')) }
  if (c.get('role') === 'TEKNISI') { clauses.push(`EXISTS (SELECT 1 FROM assignments a WHERE a.report_id=r.id AND a.technician_id=? AND a.status!='INACTIVE')`); values.push(c.get('userId')) }
  for (const [key, column] of [['status','r.status'],['category_id','r.category_id'],['priority','r.current_priority']] as const) {
    const value = c.req.query(key); if (value) { clauses.push(`${column} = ?`); values.push(value) }
  }
  const search = c.req.query('search'); if (search) { clauses.push('(r.id LIKE ? OR r.title LIKE ?)'); values.push(`%${search}%`, `%${search}%`) }
  const sql = `SELECT r.*, c.name category_name, l.name location_name FROM reports r JOIN categories c ON c.id=r.category_id JOIN locations l ON l.id=r.location_id ${clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''} ORDER BY r.created_at DESC`
  return c.json((await c.env.DB.prepare(sql).bind(...values).all()).results)
})

app.get('/api/reports/:id', async (c) => {
  const report = await c.env.DB.prepare('SELECT * FROM reports WHERE id=?').bind(c.req.param('id')).first<Record<string, unknown>>()
  if (!report) return c.json({ error: 'Laporan tidak ditemukan.' }, 404)
  if (c.get('role') === 'PELAPOR' && report.reporter_id !== c.get('userId')) return c.json({ error: 'Akses ditolak.' }, 403)
  return c.json(report)
})

async function transition(c: Context<{ Bindings: Bindings; Variables: Variables }>, to: ReportStatus, event: string) {
  const id = c.req.param('id'); const report = await c.env.DB.prepare('SELECT status FROM reports WHERE id=?').bind(id).first<{ status: ReportStatus }>()
  if (!report) return c.json({ error: 'Laporan tidak ditemukan.' }, 404)
  if (!canTransition(report.status, to, c.get('role'))) return c.json({ error: `Transisi ${report.status} ke ${to} tidak diizinkan.` }, 409)
  const now = new Date().toISOString()
  await c.env.DB.batch([
    c.env.DB.prepare('UPDATE reports SET status=?, updated_at=? WHERE id=?').bind(to, now, id),
    c.env.DB.prepare('INSERT INTO audit_events (id,report_id,actor_id,event_type,old_value,new_value,created_at) VALUES (?,?,?,?,?,?,?)').bind(newId('AUD'), id, c.get('userId'), event, report.status, to, now),
  ])
  return c.json({ id, status: to })
}

app.patch('/api/reports/:id/review', (c) => transition(c, 'UNDER_REVIEW', 'REVIEW_STARTED'))
app.patch('/api/reports/:id/accept', (c) => transition(c, 'IN_PROGRESS', 'ASSIGNMENT_ACCEPTED'))
app.patch('/api/reports/:id/resolve', (c) => transition(c, 'RESOLVED', 'REPORT_RESOLVED'))
app.patch('/api/reports/:id/close', (c) => transition(c, 'CLOSED', 'REPORT_CLOSED'))

app.patch('/api/reports/:id/triage', async (c) => {
  if (c.get('role') !== 'ADMIN') return c.json({ error: 'Akses ditolak.' }, 403)
  const body = await c.req.json<{ category_id?: string; priority?: string }>(); const priority = body.priority ?? 'MEDIUM'
  if (!['LOW','MEDIUM','HIGH','URGENT'].includes(priority)) return c.json({ error: 'Prioritas tidak valid.' }, 422)
  const days = { LOW: 7, MEDIUM: 5, HIGH: 3, URGENT: 1 }[priority]!
  const due = addBusinessDays(new Date(), days).toISOString()
  await c.env.DB.prepare('UPDATE reports SET category_id=COALESCE(?,category_id), current_priority=?, due_time=?, updated_at=? WHERE id=?').bind(body.category_id ?? null, priority, due, new Date().toISOString(), c.req.param('id')).run()
  return c.json({ id: c.req.param('id'), priority, due_time: due })
})

app.post('/api/reports/:id/assign', async (c) => {
  if (!['ADMIN','MANAJER'].includes(c.get('role'))) return c.json({ error: 'Akses ditolak.' }, 403)
  const body = await c.req.json<{ technician_id: string }>(); const id = c.req.param('id'); const now = new Date().toISOString()
  const technician = await c.env.DB.prepare("SELECT id FROM users WHERE id=? AND role='TEKNISI' AND is_active=1").bind(body.technician_id).first()
  if (!technician) return c.json({ error: 'Teknisi tidak valid.' }, 422)
  const report = await c.env.DB.prepare('SELECT status FROM reports WHERE id=?').bind(id).first<{ status: ReportStatus }>()
  if (!report || !canTransition(report.status, 'ASSIGNED', c.get('role'))) return c.json({ error: 'Laporan belum siap ditugaskan.' }, 409)
  await c.env.DB.batch([
    c.env.DB.prepare("UPDATE assignments SET status='INACTIVE', ended_at=? WHERE report_id=? AND status!='INACTIVE'").bind(now,id),
    c.env.DB.prepare("INSERT INTO assignments (id,report_id,technician_id,assigned_by,status,created_at) VALUES (?,?,?,?, 'PENDING',?)").bind(newId('ASN'),id,body.technician_id,c.get('userId'),now),
    c.env.DB.prepare("UPDATE reports SET status='ASSIGNED',updated_at=? WHERE id=?").bind(now,id),
    c.env.DB.prepare("INSERT INTO audit_events (id,report_id,actor_id,event_type,old_value,new_value,created_at) VALUES (?,?,?,?,?,?,?)").bind(newId('AUD'),id,c.get('userId'),'ASSIGNED',report.status,'ASSIGNED',now),
  ])
  return c.json({ id, status: 'ASSIGNED', technician_id: body.technician_id }, 201)
})

app.post('/api/reports/:id/comments', async (c) => {
  const body = await c.req.json<{ content: string; type?: 'PUBLIC'|'INTERNAL' }>()
  if (!body.content?.trim()) return c.json({ error: 'Komentar wajib diisi.' }, 422)
  const type = c.get('role') === 'PELAPOR' ? 'PUBLIC' : body.type ?? 'PUBLIC'; const id = newId('COM')
  await c.env.DB.prepare('INSERT INTO comments (id,report_id,author_id,content,type) VALUES (?,?,?,?,?)').bind(id,c.req.param('id'),c.get('userId'),body.content.trim(),type).run()
  return c.json({ id, type }, 201)
})

app.get('/api/reports/:id/comments', async (c) => {
  const filter = c.get('role') === 'PELAPOR' ? " AND type='PUBLIC'" : ''
  return c.json((await c.env.DB.prepare(`SELECT * FROM comments WHERE report_id=?${filter} ORDER BY created_at`).bind(c.req.param('id')).all()).results)
})

app.get('/api/reports/:id/history', async (c) => {
  if (!['ADMIN','MANAJER'].includes(c.get('role'))) return c.json({ error: 'Akses ditolak.' }, 403)
  return c.json((await c.env.DB.prepare('SELECT * FROM audit_events WHERE report_id=? ORDER BY created_at').bind(c.req.param('id')).all()).results)
})

app.get('/api/dashboard', async (c) => {
  if (!['ADMIN','MANAJER'].includes(c.get('role'))) return c.json({ error: 'Akses ditolak.' }, 403)
  const totals = await c.env.DB.prepare('SELECT COUNT(*) total, SUM(status="CLOSED") closed, SUM(status="IN_PROGRESS") in_progress, SUM(due_time < datetime("now") AND status NOT IN ("CLOSED","RESOLVED")) overdue FROM reports').first()
  const byStatus = (await c.env.DB.prepare('SELECT status, COUNT(*) count FROM reports GROUP BY status').all()).results
  return c.json({ totals, byStatus })
})

export default app
