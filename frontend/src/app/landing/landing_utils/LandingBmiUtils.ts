// RESPONSIBILITY: Calculates BMI and maps the numeric result to the Landing module's named display states.
import type { LandingBmiResult } from '@/app/landing/landing_types/landing_types';
import { LANDING_BMI_STATUSES } from '@/app/landing/landing_types/landing_types';

export const LANDING_BMI_THRESHOLDS = {
  NORMAL_MAX: 25,
  OVERWEIGHT_MAX: 30,
} as const;

/** Calculates BMI from centimetres and kilograms and returns a complete display contract. */
export function calculateLandingBmi(heightCm: number, weightKg: number): LandingBmiResult | null {
  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg) || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  const heightMeters = heightCm / 100;
  const bmi = weightKg / (heightMeters * heightMeters);
  const roundedValue = bmi.toFixed(1);

  if (bmi < 18.5) {
    return { value: roundedValue, status: LANDING_BMI_STATUSES.UNDERWEIGHT, colorClass: 'bmi-result--underweight' };
  }

  if (bmi < LANDING_BMI_THRESHOLDS.NORMAL_MAX) {
    return { value: roundedValue, status: LANDING_BMI_STATUSES.NORMAL_WEIGHT, colorClass: 'bmi-result--normal' };
  }

  if (bmi < LANDING_BMI_THRESHOLDS.OVERWEIGHT_MAX) {
    return { value: roundedValue, status: LANDING_BMI_STATUSES.OVERWEIGHT, colorClass: 'bmi-result--overweight' };
  }

  return { value: roundedValue, status: LANDING_BMI_STATUSES.OBESE, colorClass: 'bmi-result--obese' };
}
