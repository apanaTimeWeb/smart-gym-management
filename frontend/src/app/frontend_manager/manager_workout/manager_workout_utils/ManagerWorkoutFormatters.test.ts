import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_workout/manager_workout_utils/ManagerWorkoutFormatters';

describe('ManagerWorkoutFormatters behavioral contract', () => {
  it('ManagerWorkoutFormatCurrency formats minor-unit currency through Intl', () => {
    const formatted = moduleUnderTest.ManagerWorkoutFormatCurrency(12345, 'INR', 'en-IN');
    expect(formatted).toContain('123');
    expect(formatted).toContain('45');
  });
  it('ManagerWorkoutFormatNumber formats a metric without decimals', () => {
    expect(moduleUnderTest.ManagerWorkoutFormatNumber(123456, 'en-IN')).toContain('123');
  });
  it('ManagerWorkoutFormatPercent formats percentages', () => {
    expect(moduleUnderTest.ManagerWorkoutFormatPercent(12.5, 'en-IN')).toContain('%');
  });
  it('ManagerWorkoutFormatKpi formats KPI values', () => {
    expect(moduleUnderTest.ManagerWorkoutFormatKpi(1234, 'en-IN')).toBeTruthy();
  });
  it('ManagerWorkoutDisplayValue provides en-dash nullable fallback', () => {
    expect(moduleUnderTest.ManagerWorkoutDisplayValue(null)).toBe('—');
    expect(moduleUnderTest.ManagerWorkoutDisplayValue('Ready')).toBe('Ready');
  });
  it('ManagerWorkoutMaskSensitiveData masks sensitive identifiers by default', () => {
    expect(moduleUnderTest.ManagerWorkoutMaskSensitiveData('9876543210', 'phone')).not.toBe('9876543210');
  });
  it('ManagerWorkoutFormatDate formats a date value', () => {
    expect(moduleUnderTest.ManagerWorkoutFormatDate('2026-01-02', 'en-IN')).not.toBe('—');
  });
  it('ManagerWorkoutFormatDateTime formats a date-time value', () => {
    expect(moduleUnderTest.ManagerWorkoutFormatDateTime('2026-01-02T10:30:00Z', 'en-IN')).not.toBe('—');
  });
});

describe('workout enum display labels', () => {
  it('maps documented workout levels to translation keys', () => {
    expect(moduleUnderTest.ManagerWorkoutGetLevelLabelKey('BEGINNER')).toBe('COPY_BEGINNER');
  });

  it('maps documented exercise difficulties to translation keys', () => {
    expect(moduleUnderTest.ManagerWorkoutGetDifficultyLabelKey('ADVANCED')).toBe('COPY_ADVANCED');
  });

  it('uses the documented fallback for unknown values', () => {
    expect(moduleUnderTest.ManagerWorkoutGetLevelLabelKey('UNKNOWN')).toBe('COPY_N');
  });
});
