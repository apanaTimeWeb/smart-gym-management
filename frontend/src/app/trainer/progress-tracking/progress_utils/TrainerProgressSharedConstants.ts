// RESPONSIBILITY: Centralized constants for the Trainer Progress Tracking module.
// DATA FLOW: Imported by useTrainerProgressLogic and progress sub-components.

import type { ProgressChartMetric, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export const PROGRESS_CHART_METRICS: { value: ProgressChartMetric; label: string }[] = [
  { value: 'weight', label: 'Weight (kg)' },
  { value: 'bmi', label: 'BMI' },
  { value: 'bodyFat', label: 'Body Fat (%)' },
  { value: 'muscleMass', label: 'Muscle Mass (kg)' },
];

export const COMPARISON_METRICS: { value: ComparisonMetric; label: string; unit: string; lowerIsBetter: boolean }[] = [
  { value: 'latestWeightKg',        label: 'Current Weight',    unit: 'kg',  lowerIsBetter: false },
  { value: 'latestBmi',             label: 'Current BMI',       unit: '',    lowerIsBetter: true  },
  { value: 'latestBodyFatPercent',  label: 'Body Fat %',        unit: '%',   lowerIsBetter: true  },
  { value: 'latestMuscleMassKg',    label: 'Muscle Mass',       unit: 'kg',  lowerIsBetter: false },
  { value: 'weightChangeKg',        label: 'Weight Change',     unit: 'kg',  lowerIsBetter: true  },
  { value: 'muscleMassChange',      label: 'Muscle Gain',       unit: 'kg',  lowerIsBetter: false },
];

// Max members selectable for comparison
export const COMPARISON_MAX_MEMBERS = 4;

export const PROGRESS_TABLE_HEADERS = [
  'Date',
  'Weight (kg)',
  'Height (cm)',
  'BMI',
  'Body Fat %',
  'Muscle Mass (kg)',
  'Waist (cm)',
  'Notes',
  'Actions',
] as const;
