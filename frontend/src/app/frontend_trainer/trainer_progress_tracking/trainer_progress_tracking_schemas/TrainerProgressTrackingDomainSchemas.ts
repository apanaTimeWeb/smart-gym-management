import { z } from 'zod';

import { TRAINER_PROGRESS_TRACKING_GOAL_STATUS_VALUES } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_constants/TrainerProgressTrackingConstants';




export const TrainerProgressTrackingProgressEntrySchema = z.object({
  id: z.string(),
  memberId: z.string(),
  date: z.string(),
  weightKg: z.number(),
  heightCm: z.number(),
  bmi: z.number(),
  bodyFatPercent: z.number().optional().nullable(),
  muscleMassKg: z.number().optional().nullable(),
  chestCm: z.number().optional().nullable(),
  waistCm: z.number().optional().nullable(),
  hipCm: z.number().optional().nullable(),
  notes: z.string().optional().nullable(),
  recordedBy: z.string(),
  bloodPressure: z.string().optional().nullable(),
  restingHeartRate: z.number().optional().nullable(),
  vo2Max: z.number().optional().nullable(),
  progressPhotos: z.array(z.string()).optional(),
});

export const TrainerProgressTrackingProgressSummarySchema = z.object({
  memberId: z.string(),
  memberName: z.string(),
  totalEntries: z.number(),
  latestEntry: TrainerProgressTrackingProgressEntrySchema.nullable(),
  firstEntry: TrainerProgressTrackingProgressEntrySchema.nullable(),
  weightChangeKg: z.number(),
  bmiChange: z.number(),
  targetWeightKg: z.number().optional(),
  targetBodyFatPercent: z.number().optional(),
  targetDate: z.string().optional(),
  goalStatus: z.enum(TRAINER_PROGRESS_TRACKING_GOAL_STATUS_VALUES).optional(),
});

export const TrainerProgressTrackingCreateProgressEntrySchema = z.object({
  date: z.string().min(1, 'ERR_DATE_REQUIRED'),
  weightKg: z.number().min(30, 'ERR_WEIGHT_MIN').max(300, 'ERR_WEIGHT_MAX'),
  heightCm: z.number().min(100, 'ERR_HEIGHT_MIN').max(300, 'ERR_HEIGHT_MAX'),
  bodyFatPercent: z.union([z.number().min(3, 'ERR_BODY_FAT_MIN').max(60, 'ERR_BODY_FAT_MAX'), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  muscleMassKg: z.union([z.number().min(10).max(150), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  chestCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  waistCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  hipCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  notes: z.string().optional(),
});

export const TrainerProgressTrackingProgressMemberBasicSchema = z.object({
  id: z.string(),
  name: z.string(),
});
