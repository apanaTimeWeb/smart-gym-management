// RESPONSIBILITY: Owns BMI input state and delegates the calculation to the pure Landing BMI utility.
// DATA FLOW: BMI inputs → useLandingBmi → calculateLandingBmi → LandingBmiCalc view.
import { useCallback, useState, type FormEvent } from 'react';
import { calculateLandingBmi } from '@/app/landing/landing_utils/LandingBmiUtils';
import type { LandingBmiResult } from '@/app/landing/landing_types/landing_types';

/** Provides isolated BMI calculator state and a submit handler for the Landing section. */
export function useLandingBmi() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<LandingBmiResult | null>(null);
  const [inputError, setInputError] = useState('');

  const calculateBMI = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = calculateLandingBmi(Number(height), Number(weight));

    if (!result) {
      setBmiResult(null);
      setInputError('Please enter positive height and weight values.');
      return;
    }

    setInputError('');
    setBmiResult(result);
  }, [height, weight]);

  return {
    height,
    setHeight,
    weight,
    setWeight,
    bmiResult,
    inputError,
    calculateBMI,
  };
}
