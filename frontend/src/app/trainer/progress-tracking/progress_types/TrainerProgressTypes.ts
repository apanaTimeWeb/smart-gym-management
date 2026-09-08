// RESPONSIBILITY: TypeScript types for the Trainer Progress Tracking module.

export interface ProgressEntry {
  id: string;
  memberId: string;
  date: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  bodyFatPercent?: number;
  muscleMassKg?: number;
  chestCm?: number;
  waistCm?: number;
  hipCm?: number;
  notes?: string;
  recordedBy: string;
}

export interface ProgressSummary {
  memberId: string;
  memberName: string;
  totalEntries: number;
  latestEntry: ProgressEntry | null;
  firstEntry: ProgressEntry | null;
  weightChangeKg: number;
  bmiChange: number;
}

export interface CreateProgressEntryDto {
  date: string;
  weightKg: number;
  heightCm: number;
  bodyFatPercent?: number;
  muscleMassKg?: number;
  chestCm?: number;
  waistCm?: number;
  hipCm?: number;
  notes?: string;
}

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
