import { describe, expect, it } from 'vitest'
import {
  buildDashboardMetrics,
  canViewDashboardRole,
  normalizeStatusDistribution,
} from '../src/dashboard'

describe('dashboard role access', () => {
  it('TEST-021 lets admin and manager view dashboard metrics', () => {
    expect(canViewDashboardRole('ADMIN')).toBe(true)
    expect(canViewDashboardRole('MANAJER')).toBe(true)
  })

  it('TEST-022 hides dashboard metrics from reporter and technician roles', () => {
    expect(canViewDashboardRole('PELAPOR')).toBe(false)
    expect(canViewDashboardRole('TEKNISI')).toBe(false)
  })
})

describe('dashboard metrics', () => {
  it('TEST-023 derives active count and labels from API totals', () => {
    expect(
      buildDashboardMetrics({
        totals: { total: 8, closed: 3, in_progress: 2, overdue: 1 },
        byStatus: [],
      }),
    ).toEqual([
      { label: 'Total laporan', value: 8 },
      { label: 'Laporan aktif', value: 5 },
      { label: 'Sedang dikerjakan', value: 2 },
      { label: 'Selesai ditutup', value: 3 },
      { label: 'Melewati target', value: 1 },
    ])
  })

  it('TEST-024 renders zero-safe metrics for empty dashboard results', () => {
    expect(buildDashboardMetrics({ totals: null, byStatus: [] }).map((metric) => metric.value)).toEqual([
      0, 0, 0, 0, 0,
    ])
  })

  it('TEST-025 keeps active count from going negative', () => {
    const [, active] = buildDashboardMetrics({
      totals: { total: 2, closed: 5, in_progress: 0, overdue: 0 },
      byStatus: [],
    })

    expect(active.value).toBe(0)
  })

  it('TEST-026 normalizes status labels and numeric counts', () => {
    expect(
      normalizeStatusDistribution({
        totals: null,
        byStatus: [
          { status: 'UNDER_REVIEW', count: '2' },
          { status: 'CLOSED', count: null },
        ],
      }),
    ).toEqual([
      { status: 'UNDER_REVIEW', label: 'UNDER REVIEW', count: 2 },
      { status: 'CLOSED', label: 'CLOSED', count: 0 },
    ])
  })
})
