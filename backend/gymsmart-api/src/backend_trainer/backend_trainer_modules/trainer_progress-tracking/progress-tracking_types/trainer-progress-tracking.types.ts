// RESPONSIBILITY: Defines explicit Trainer progress read contracts consumed by controllers and Swagger.
// FLOW: Repository query → TrainerProgressTrackingQueryService → typed response.

export interface ProgressTrackingMemberSummary { id:string; name:string; status:string; plan:string|null; }
export interface ProgressTrackingSummary { latestWeightKg:number|null; latestBmi:number|null; latestBodyFatPercent:number|null; latestMuscleMassKg:number|null; entryCount:number; }

export interface ProgressTrackingProgressEntryUpdateInput {
  date?: string;
  weightKg?: number;
  heightCm?: number;
  bmi: number;
  bodyFatPercent?: number | null;
  muscleMassKg?: number | null;
  chestCm?: number | null;
  waistCm?: number | null;
  hipCm?: number | null;
  notes?: string | null;
  bloodPressure?: string | null;
  restingHeartRate?: number | null;
  vo2Max?: number | null;
  progressPhotos?: string[] | null;
}
