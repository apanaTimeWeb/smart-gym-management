// RESPONSIBILITY: TypeScript types for the Trainer Progress Tracking module.

// Types inferred from Zod schemas
export type { ProgressEntry, ProgressSummary, CreateProgressEntryDto, ProgressMemberBasic } from '@/app/trainer/progress-tracking/progress_types/TrainerProgress.schema';


export const PROGRESS_CHART_METRIC_IDS = ['weight', 'bmi', 'bodyFat', 'muscleMass'] as const;
export type ProgressChartMetric = (typeof PROGRESS_CHART_METRIC_IDS)[number];

// --- Comparison types ---

export const PROGRESS_TREND_IDS = ['improving', 'plateau', 'declining', 'insufficient'] as const;
export type ProgressTrend = (typeof PROGRESS_TREND_IDS)[number];

export interface ComparisonMemberSnapshot {
  memberId: string;
  memberName: string;
  latestWeightKg: number | null;
  latestBmi: number | null;
  latestBodyFatPercent: number | null;
  latestMuscleMassKg: number | null;
  weightChangeKg: number | null;   // latest - first
  bodyFatChange: number | null;
  muscleMassChange: number | null;
  totalEntries: number;
  trend: ProgressTrend;
}

export const COMPARISON_METRIC_IDS = ['latestWeightKg', 'latestBmi', 'latestBodyFatPercent', 'latestMuscleMassKg', 'weightChangeKg', 'muscleMassChange'] as const;
export type ComparisonMetric = (typeof COMPARISON_METRIC_IDS)[number];
