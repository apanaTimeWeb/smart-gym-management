import { z } from 'zod';
import { MemberSchema, MemberStatsSchema } from '@/app/manager/members/members_types/ManagerMembers.schema';


export const planSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  price1Month: z.number(),
  price3Month: z.number(),
  price6Month: z.number(),
  price12Month: z.number(),
  priceCustom: z.number().optional(),
});

export const paymentSnapshotSchema = z.object({
  id: z.string(),
  amount: z.number(),
  paidAt: z.string(),
  method: z.string(),
  status: z.enum(['PAID', 'PENDING', 'FAILED', 'REFUNDED']),
  invoiceNumber: z.string(),
});

export const attendanceSnapshotSchema = z.object({
  id: z.string(),
  date: z.string(),
  checkIn: z.string(),
  type: z.enum(['MEMBER', 'STAFF']),
});

export const dietPlanSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  type: z.enum(['WEIGHT_LOSS', 'MUSCLE_GAIN', 'MAINTENANCE', 'KETO', 'VEGAN', 'OTHER']),
  calories: z.number(),
  protein: z.number(),
  carbs: z.number(),
  fats: z.number(),
  meals: z.array(z.object({
    name: z.string(),
    time: z.string(),
    calories: z.number(),
    foods: z.array(z.string()),
  })),
});

export const workoutSnapshotSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  daysPerWeek: z.number(),
  goal: z.string(),
  days: z.array(z.object({
    day: z.union([z.number(), z.string()]),
    focus: z.string(),
    exercises: z.array(z.object({
      name: z.string(),
      sets: z.number(),
      reps: z.number(),
      notes: z.string().optional(),
    })),
  })),
});

export const populatedMemberSchema = MemberSchema.extend({
  plan: planSnapshotSchema.optional(),
  recentPayments: z.array(paymentSnapshotSchema).optional(),
  dietPlan: dietPlanSnapshotSchema.optional(),
  workoutPlan: workoutSnapshotSchema.optional(),
  assignedDiet: dietPlanSnapshotSchema.optional(),
  assignedWorkout: workoutSnapshotSchema.optional(),
});

export const memberStatsSchema = MemberStatsSchema;

export const memberDeleteResponseSchema = z.object({ id: z.string() });
export const trainerListSchema = z.object({ staff: z.array(z.object({ id: z.string(), name: z.string(), role: z.string() })) });
