import { z } from 'zod';

export const TrainerMemberDietSnapshotSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  goal: z.string().optional(),
  calories: z.number().optional(),
  protein: z.number().optional(),
  carbs: z.number().optional(),
  fats: z.number().optional(),
  description: z.string().optional(),
  meals: z.array(
    z.union([
      z.string(),
      z.object({
        name: z.string().optional(),
        time: z.string().optional(),
        items: z.string().optional(),
        description: z.string().optional(),
      })
    ])
  ).optional(),
  complianceScore: z.number().optional(),
});

export type TrainerMemberDietSnapshot = z.infer<typeof TrainerMemberDietSnapshotSchema>;
