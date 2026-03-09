import { describe, it, expect } from 'vitest'
import { getDayNumber, getDayPartitionId } from '../../model/timeSlotMapping'

describe('timeSlotMapping', () => {
  it('maps russian day names to numbers', () => {
    expect(getDayNumber('Понедельник')).toBe(1)
    expect(getDayNumber('Вторник')).toBe(2)
    expect(getDayNumber('Среда')).toBe(3)
    expect(getDayNumber('Четверг')).toBe(4)
    expect(getDayNumber('Пятница')).toBe(5)
    expect(getDayNumber('Суббота')).toBe(6)
    expect(getDayNumber('Воскресенье')).toBe(7)
  })

  it('falls back to 1 for unknown day', () => {
    expect(getDayNumber('Неизвестный')).toBe(1)
  })

  it('maps time to day partition id', () => {
    expect(getDayPartitionId('08:30–10:00')).toBe(1)
    expect(getDayPartitionId('10:10–11:40')).toBe(2)
    expect(getDayPartitionId('12:00–13:30')).toBe(3)
    expect(getDayPartitionId('13:40–15:10')).toBe(4)
    expect(getDayPartitionId('15:20–16:50')).toBe(5)
    expect(getDayPartitionId('17:00–18:30')).toBe(6)
  })

  it('falls back to 1 for unknown time', () => {
    expect(getDayPartitionId('00:00–01:00')).toBe(1)
  })
})

