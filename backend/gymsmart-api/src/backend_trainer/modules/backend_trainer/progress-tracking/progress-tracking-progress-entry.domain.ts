// RESPONSIBILITY: Defines the progress-tracking business object independent from TypeORM persistence.
// FLOW: progress-tracking repository → mapper → domain object → service.

export interface ProgressTrackingProgressEntryDomain {
  id: string;
  memberId: string;
  date: string;
  weightKg: number;
  heightCm: number;
  bmi: number;
  bodyFatPercent: number | null;
  muscleMassKg: number | null;
  chestCm: number | null;
  waistCm: number | null;
  hipCm: number | null;
  notes: string | null;
  recordedBy: string;
  bloodPressure: string | null;
  restingHeartRate: number | null;
  vo2Max: number | null;
  progressPhotos: string[] | null;
}
