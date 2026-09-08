// RESPONSIBILITY: Centralized constants for the Trainer Progress Tracking module.

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

/** Dev-only seed data — replace with fetchProgressEntries() when backend is ready */
export const MOCK_PROGRESS_ENTRIES = [
  {
    id: '1',
    memberId: 'm1',
    date: '2025-07-01',
    weightKg: 82,
    heightCm: 175,
    bmi: 26.8,
    bodyFatPercent: 22,
    muscleMassKg: 38,
    waistCm: 88,
    notes: 'Initial measurement',
    recordedBy: 'Trainer',
  },
  {
    id: '2',
    memberId: 'm1',
    date: '2025-08-01',
    weightKg: 79,
    heightCm: 175,
    bmi: 25.8,
    bodyFatPercent: 20,
    muscleMassKg: 39.5,
    waistCm: 85,
    notes: 'Good progress this month',
    recordedBy: 'Trainer',
  },
];

/** Dev-only multi-member seed data for comparison view */
export const MOCK_COMPARISON_ENTRIES = [
  // Member m1 — Amit Sharma
  { id: 'c1', memberId: 'm1', memberName: 'Amit Sharma', date: '2025-06-01', weightKg: 84, heightCm: 175, bmi: 27.4, bodyFatPercent: 23, muscleMassKg: 37, recordedBy: 'Trainer' },
  { id: 'c2', memberId: 'm1', memberName: 'Amit Sharma', date: '2025-08-01', weightKg: 79, heightCm: 175, bmi: 25.8, bodyFatPercent: 20, muscleMassKg: 39.5, recordedBy: 'Trainer' },
  // Member m2 — Priya Mehta
  { id: 'c3', memberId: 'm2', memberName: 'Priya Mehta', date: '2025-06-01', weightKg: 62, heightCm: 162, bmi: 23.6, bodyFatPercent: 28, muscleMassKg: 24, recordedBy: 'Trainer' },
  { id: 'c4', memberId: 'm2', memberName: 'Priya Mehta', date: '2025-08-01', weightKg: 59, heightCm: 162, bmi: 22.5, bodyFatPercent: 25, muscleMassKg: 25.5, recordedBy: 'Trainer' },
  // Member m3 — Rahul Verma
  { id: 'c5', memberId: 'm3', memberName: 'Rahul Verma', date: '2025-06-01', weightKg: 90, heightCm: 180, bmi: 27.8, bodyFatPercent: 26, muscleMassKg: 42, recordedBy: 'Trainer' },
  { id: 'c6', memberId: 'm3', memberName: 'Rahul Verma', date: '2025-08-01', weightKg: 90, heightCm: 180, bmi: 27.8, bodyFatPercent: 26, muscleMassKg: 42.2, recordedBy: 'Trainer' },
  // Member m4 — Sneha Kapoor
  { id: 'c7', memberId: 'm4', memberName: 'Sneha Kapoor', date: '2025-06-01', weightKg: 55, heightCm: 158, bmi: 22.0, bodyFatPercent: 30, muscleMassKg: 20, recordedBy: 'Trainer' },
  { id: 'c8', memberId: 'm4', memberName: 'Sneha Kapoor', date: '2025-08-01', weightKg: 53, heightCm: 158, bmi: 21.2, bodyFatPercent: 27, muscleMassKg: 21.5, recordedBy: 'Trainer' },
];
