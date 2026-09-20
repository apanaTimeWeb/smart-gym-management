// RESPONSIBILITY: Owns domain and UI types for the Trainer Progress Tracking feature.
// DATA FLOW: Progress API schema -> module types -> Query state -> Progress components.

export type { ProgressEntry, ProgressSummary, CreateProgressEntryDto, ProgressMemberBasic } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgress.schema';

export const PROGRESS_CHART_METRIC_IDS = ['weight', 'bmi', 'bodyFat', 'muscleMass'] as const;
export type ProgressChartMetric = (typeof PROGRESS_CHART_METRIC_IDS)[number];
export const PROGRESS_SORT_FIELDS = ['date', 'weightKg', 'heightCm', 'bmi', 'bodyFatPercent', 'muscleMassKg'] as const;
export type ProgressSortField = (typeof PROGRESS_SORT_FIELDS)[number];
export const PROGRESS_SORT_DIRECTIONS = ['asc', 'desc'] as const;
export type ProgressSortDirection = (typeof PROGRESS_SORT_DIRECTIONS)[number];

export interface ComparisonMemberSnapshot {
  memberId: string;
  memberName: string;
  latestWeightKg: number | null;
  latestBmi: number | null;
  latestBodyFatPercent: number | null;
  latestMuscleMassKg: number | null;
  weightChangeKg: number | null;
  bodyFatChange: number | null;
  muscleMassChange: number | null;
  totalEntries: number;
  trend: ProgressTrend;
}

export const PROGRESS_TREND_IDS = ['improving', 'plateau', 'declining', 'insufficient'] as const;
export type ProgressTrend = (typeof PROGRESS_TREND_IDS)[number];
export const COMPARISON_METRIC_IDS = ['latestWeightKg', 'latestBmi', 'latestBodyFatPercent', 'latestMuscleMassKg', 'weightChangeKg', 'muscleMassChange'] as const;
export type ComparisonMetric = (typeof COMPARISON_METRIC_IDS)[number];
