import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useLandingBmi } from '@/app/landing/landing_components/LandingBmiCalc/useLandingBmi';

describe('useLandingBmi', () => {
  it('computes and exposes a BMI result after valid submission', () => {
    const { result } = renderHook(() => useLandingBmi());

    act(() => {
      result.current.setHeight('100');
      result.current.setWeight('25');
    });

    act(() => {
      result.current.calculateBMI({ preventDefault: () => undefined } as never);
    });

    expect(result.current.bmiResult?.value).toBe('25.0');
    expect(result.current.bmiResult?.status).toBe('Overweight');
    expect(result.current.inputError).toBe('');
  });

  it('exposes an error for non-positive input instead of producing invalid output', () => {
    const { result } = renderHook(() => useLandingBmi());

    act(() => {
      result.current.setHeight('0');
      result.current.setWeight('70');
    });

    act(() => {
      result.current.calculateBMI({ preventDefault: () => undefined } as never);
    });

    expect(result.current.bmiResult).toBeNull();
    expect(result.current.inputError).toContain('positive');
  });
});
