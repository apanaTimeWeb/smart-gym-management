import { z } from 'zod';

export const ProgressEntrySchema = z.object({
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

export const ProgressSummarySchema = z.object({
  memberId: z.string(),
  memberName: z.string(),
  totalEntries: z.number(),
  latestEntry: ProgressEntrySchema.nullable(),
  firstEntry: ProgressEntrySchema.nullable(),
  weightChangeKg: z.number(),
  bmiChange: z.number(),
  targetWeightKg: z.number().optional(),
  targetBodyFatPercent: z.number().optional(),
  targetDate: z.string().optional(),
  goalStatus: z.enum(['On Track', 'Off Track', 'Achieved']).optional(),
});

export const CreateProgressEntrySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  weightKg: z.number().min(30, 'Weight must be at least 30kg').max(300, 'Weight must be less than 300kg'),
  heightCm: z.number().min(100, 'Height must be at least 100cm').max(300, 'Height must be less than 300cm'),
  bodyFatPercent: z.union([z.number().min(3, 'Body fat % too low').max(60, 'Body fat % too high'), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  muscleMassKg: z.union([z.number().min(10).max(150), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  chestCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  waistCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  hipCm: z.union([z.number(), z.literal('')]).optional().transform(e => e === '' ? undefined : e),
  notes: z.string().optional(),
});

export const ProgressMemberBasicSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ProgressEntry = z.infer<typeof ProgressEntrySchema>;
export type ProgressSummary = z.infer<typeof ProgressSummarySchema>;
export type CreateProgressEntryDto = z.infer<typeof CreateProgressEntrySchema>;
export type CreateProgressEntryFormValues = z.input<typeof CreateProgressEntrySchema>;
export type ProgressMemberBasic = z.infer<typeof ProgressMemberBasicSchema>;
