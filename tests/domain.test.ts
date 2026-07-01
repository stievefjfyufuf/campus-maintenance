import { describe, expect, it } from 'vitest'
import { addBusinessDays, canTransition, newId, normalizeRole, validateReport } from '../worker/domain'

const valid = { title:'Proyektor rusak', description:'Proyektor ruang kelas tidak dapat dinyalakan.', location_id:'loc-a', category_id:'cat-electric', reporter_contact:'0812 3456 7890' }

describe('report validation', () => {
  it('TEST-001 accepts valid input',()=>expect(validateReport(valid)).toEqual([]))
  it('TEST-002 rejects missing title',()=>expect(validateReport({...valid,title:''})).toContain('Judul harus 5–100 karakter.'))
  it('TEST-003 rejects short title',()=>expect(validateReport({...valid,title:'AC'}).length).toBe(1))
  it('TEST-004 rejects title over 100 chars',()=>expect(validateReport({...valid,title:'a'.repeat(101)}).length).toBe(1))
  it('TEST-005 rejects short description',()=>expect(validateReport({...valid,description:'rusak'}).length).toBe(1))
  it('TEST-006 rejects description over 2000 chars',()=>expect(validateReport({...valid,description:'a'.repeat(2001)}).length).toBe(1))
  it('TEST-007 requires a location',()=>expect(validateReport({...valid,location_id:''}).length).toBe(1))
  it('TEST-008 requires a category',()=>expect(validateReport({...valid,category_id:''}).length).toBe(1))
  it('TEST-009 rejects invalid contact',()=>expect(validateReport({...valid,reporter_contact:'abc'}).length).toBe(1))
})

describe('workflow permissions', () => {
  it('TEST-010 lets admin start review',()=>expect(canTransition('SUBMITTED','UNDER_REVIEW','ADMIN')).toBe(true))
  it('TEST-011 denies reporter review',()=>expect(canTransition('SUBMITTED','UNDER_REVIEW','PELAPOR')).toBe(false))
  it('TEST-012 lets manager assign',()=>expect(canTransition('UNDER_REVIEW','ASSIGNED','MANAJER')).toBe(true))
  it('TEST-013 lets technician start work',()=>expect(canTransition('ASSIGNED','IN_PROGRESS','TEKNISI')).toBe(true))
  it('TEST-014 denies admin technician acceptance',()=>expect(canTransition('ASSIGNED','IN_PROGRESS','ADMIN')).toBe(false))
  it('TEST-015 lets technician resolve',()=>expect(canTransition('IN_PROGRESS','RESOLVED','TEKNISI')).toBe(true))
  it('TEST-016 lets reporter close resolved report',()=>expect(canTransition('RESOLVED','CLOSED','PELAPOR')).toBe(true))
  it('TEST-017 lets manager approve reopen',()=>expect(canTransition('CLOSED','UNDER_REVIEW','MANAJER')).toBe(true))
})

describe('dates and identifiers', () => {
  it('TEST-018 creates traceable report IDs',()=>expect(newId('REP',new Date('2026-07-01T00:00:00Z'))).toMatch(/^REP-20260701-[A-F0-9]{8}$/))
  it('TEST-019 skips a weekend',()=>expect(addBusinessDays(new Date('2026-07-03T00:00:00Z'),1).toISOString().slice(0,10)).toBe('2026-07-06'))
  it('TEST-020 adds five weekdays across weekend',()=>expect(addBusinessDays(new Date('2026-07-01T00:00:00Z'),5).toISOString().slice(0,10)).toBe('2026-07-08'))
})

describe('OAuth demo role selection', () => {
  it('TEST-027 preserves a supported role', () => expect(normalizeRole('TEKNISI')).toBe('TEKNISI'))
  it('TEST-028 defaults an unknown role to reporter', () => expect(normalizeRole('SUPER_ADMIN')).toBe('PELAPOR'))
  it('TEST-029 defaults a missing role to reporter', () => expect(normalizeRole(undefined)).toBe('PELAPOR'))
})
