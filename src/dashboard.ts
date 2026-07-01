export type DashboardResponse = {
  totals: {
    total: number | string | null
    closed: number | string | null
    in_progress: number | string | null
    overdue: number | string | null
  } | null
  byStatus: Array<{ status: string; count: number | string | null }>
}

export type DashboardMetric = {
  label: string
  value: number
}

const dashboardRoles = new Set(['ADMIN', 'MANAJER'])

function toSafeNumber(value: number | string | null | undefined) {
  const number = Number(value ?? 0)
  return Number.isFinite(number) ? number : 0
}

export function canViewDashboardRole(role: string) {
  return dashboardRoles.has(role)
}

export function buildDashboardMetrics(dashboard: DashboardResponse | null): DashboardMetric[] {
  const total = toSafeNumber(dashboard?.totals?.total)
  const closed = toSafeNumber(dashboard?.totals?.closed)

  return [
    { label: 'Total laporan', value: total },
    { label: 'Laporan aktif', value: Math.max(total - closed, 0) },
    { label: 'Sedang dikerjakan', value: toSafeNumber(dashboard?.totals?.in_progress) },
    { label: 'Selesai ditutup', value: closed },
    { label: 'Melewati target', value: toSafeNumber(dashboard?.totals?.overdue) },
  ]
}

export function normalizeStatusDistribution(dashboard: DashboardResponse | null) {
  return (
    dashboard?.byStatus.map((item) => ({
      status: item.status,
      label: item.status.replaceAll('_', ' '),
      count: toSafeNumber(item.count),
    })) ?? []
  )
}
