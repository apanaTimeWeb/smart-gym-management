// RESPONSIBILITY: TypeScript types for the Trainer Progress Tracking module.

// Types inferred from Zod schemas
export type { ProgressEntry, ProgressSummary, CreateProgressEntryDto, ProgressMemberBasic } from './progress.schema';

export type ProgressFetchState = 'idle' | 'loading' | 'success' | 'error';

export type ProgressChartMetric = 'weight' | 'bmi' | 'bodyFat' | 'muscleMass';

// --- Comparison types ---

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
  trend: 'improving' | 'plateau' | 'declining' | 'insufficient';
}

export type ComparisonMetric = 'latestWeightKg' | 'latestBmi' | 'latestBodyFatPercent' | 'latestMuscleMassKg' | 'weightChangeKg' | 'muscleMassChange';
