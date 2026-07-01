export const roles = ['PELAPOR', 'ADMIN', 'TEKNISI', 'MANAJER'] as const
export type Role = (typeof roles)[number]

export const statuses = ['SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const
export type ReportStatus = (typeof statuses)[number]

export function canTransition(from: ReportStatus, to: ReportStatus, role: Role) {
  const allowed: Record<string, Role[]> = {
    'SUBMITTED:UNDER_REVIEW': ['ADMIN'],
    'UNDER_REVIEW:ASSIGNED': ['ADMIN', 'MANAJER'],
    'ASSIGNED:IN_PROGRESS': ['TEKNISI'],
    'IN_PROGRESS:RESOLVED': ['TEKNISI'],
    'RESOLVED:CLOSED': ['PELAPOR', 'ADMIN'],
    'RESOLVED:UNDER_REVIEW': ['ADMIN', 'MANAJER'],
    'CLOSED:UNDER_REVIEW': ['ADMIN', 'MANAJER'],
  }
  return allowed[`${from}:${to}`]?.includes(role) ?? false
}

export function validateReport(input: Record<string, unknown>) {
  const errors: string[] = []
  if (typeof input.title !== 'string' || input.title.trim().length < 5 || input.title.length > 100) errors.push('Judul harus 5–100 karakter.')
  if (typeof input.description !== 'string' || input.description.trim().length < 20 || input.description.length > 2000) errors.push('Deskripsi harus 20–2000 karakter.')
  if (typeof input.location_id !== 'string' || !input.location_id) errors.push('Lokasi wajib dipilih.')
  if (typeof input.category_id !== 'string' || !input.category_id) errors.push('Kategori wajib dipilih.')
  if (typeof input.reporter_contact !== 'string' || !/^[-\d +]{8,}$/.test(input.reporter_contact)) errors.push('Kontak pelapor tidak valid.')
  return errors
}

export function newId(prefix = 'REP', now = new Date()) {
  const date = now.toISOString().slice(0, 10).replaceAll('-', '')
  return `${prefix}-${date}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`
}

export function addBusinessDays(input: Date, days: number) {
  const result = new Date(input)
  let remaining = days
  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() + 1)
    if (result.getUTCDay() !== 0 && result.getUTCDay() !== 6) remaining--
  }
  return result
}
