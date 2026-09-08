// RESPONSIBILITY: Centralized constants for the Trainer Progress Tracking module.

import type { ProgressChartMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';

export const PROGRESS_CHART_METRICS: { value: ProgressChartMetric; label: string }[] = [
  { value: 'weight', label: 'Weight (kg)' },
  { value: 'bmi', label: 'BMI' },
  { value: 'bodyFat', label: 'Body Fat (%)' },
  { value: 'muscleMass', label: 'Muscle Mass (kg)' },
];

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
