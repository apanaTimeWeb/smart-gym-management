import { describe, expect, it } from 'vitest';
import { calculateLandingBmi } from '@/app/landing/landing_utils/LandingBmiUtils';

describe('calculateLandingBmi', () => {
  it.each([
    ['18.4', 'Underweight'],
    ['18.5', 'Normal Weight'],
    ['24.9', 'Normal Weight'],
    ['25.0', 'Overweight'],
    ['29.9', 'Overweight'],
    ['30.0', 'Obese'],
  ])('maps BMI %s to %s', (bmi, expectedStatus) => {
    const result = calculateLandingBmi(100, Number(bmi));
    expect(result?.status).toBe(expectedStatus);
  });

  it('returns null for invalid values', () => {
    expect(calculateLandingBmi(0, 70)).toBeNull();
    expect(calculateLandingBmi(170, Number.NaN)).toBeNull();
  });
});
