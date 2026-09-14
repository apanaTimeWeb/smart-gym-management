import { z } from 'zod';
import { TrainerMemberWorkoutSnapshotSchema } from './TrainerMemberWorkoutSnapshot';
import { TrainerMemberDietSnapshotSchema } from './TrainerMemberDietSnapshot';





export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  address: z.string().optional(),
  branch: z.string(),
  planId: z.string(),
  plan: z.object({
    id: z.string(),
    name: z.string(),
    tier: z.string(),
  }).optional(),
  billingCycle: z.string(),
  status: z.string(),
  joinDate: z.string(),
  expiryDate: z.string(),
  photo: z.string().optional(),
  createdAt: z.string(),
  age: z.number().optional(),
  lastWorkout: z.string().optional(),
  progressStatus: z.enum(['Good', 'Average', 'Needs Attention']).optional(),
  assignedTrainerId: z.string().optional(),
  assignedTrainerName: z.string().optional(),
  isPT: z.boolean().optional(),
  assignedDietId: z.string().optional(),
  assignedDiet: TrainerMemberDietSnapshotSchema.optional(),
  assignedWorkoutId: z.string().optional(),
  assignedWorkout: TrainerMemberWorkoutSnapshotSchema.optional(),
  fitnessGoal: z.string().optional(),
  daysSinceLastCheckIn: z.number().optional(),
  trainerNotes: z.array(
    z.object({
      id: z.number(),
      text: z.string(),
      date: z.string(),
    })
  ).optional(),
  emergencyContact: z.string().optional(),
  bloodGroup: z.string().optional(),
  medicalHistory: z.array(z.string()).optional(),
  membershipNumber: z.string().optional(),
});

export const MemberStatsSchema = z.object({
  total: z.number(),
  active: z.number(),
  pending: z.number(),
  expired: z.number(),
});

export const MemberListResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.object({
    members: z.array(MemberSchema),
    total: z.number(),
    page: z.number(),
    limit: z.number(),
  }).optional(),
});

export const MemberDetailResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: MemberSchema.optional(),
});

export const MemberStatsResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: MemberStatsSchema.optional(),
});
