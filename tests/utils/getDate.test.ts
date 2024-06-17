import { describe, it, expect } from 'vitest'
import { getDateFromString } from '../../src/utils/getDate';

describe('getDateFromString', () => {
  it('should convert date string to the correct format', () => {
    const input = 'Jun 17 2023'
    const expectedOutput = 'Samstag 17 Juni 2023'
    expect(getDateFromString(input)).toBe(expectedOutput)
  })

  it('should handle different months correctly', () => {
    const input = 'Dec 25 2023'
    const expectedOutput = 'Montag 25 Dezember 2023'
    expect(getDateFromString(input)).toBe(expectedOutput)
  })

 it('should handle different years correctly', () => {
    const input = 'Jan 01 2000'
    const expectedOutput = 'Samstag 1 Januar 2000'
    expect(getDateFromString(input)).toBe(expectedOutput)
  })

  it('should handle different days correctly', () => {
    const input = 'Feb 29 2024'
    const expectedOutput = 'Donnerstag 29 Februar 2024'
    expect(getDateFromString(input)).toBe(expectedOutput)
  })

  it('should handle invalid date strings', () => {
    const input = 'invalid-date'
    const expectedOutput = 'Invalid Date'
    expect(getDateFromString(input)).toBe(expectedOutput)
  })
})