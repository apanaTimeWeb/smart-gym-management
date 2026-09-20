// RESPONSIBILITY: Defines the Zod runtime schemas for Manager member API entities and statistics.
import { z } from 'zod';

export const memberEmergencyContactSchema = z.object({ name: z.string(), phone: z.string() });
export const memberSchema = z.object({
  id: z.string(), name: z.string(), email: z.string(), phone: z.string(), gender: z.string(), address: z.string().optional(), aadhaar: z.string().optional(), branch: z.string(), planId: z.string(),
  plan: z.object({ id: z.string(), name: z.string(), tier: z.string() }).optional(), billingCycle: z.string(), status: z.string(), joinDate: z.string(), expiryDate: z.string(),
  paidAmount: z.number(), pendingAmount: z.number(), advanceAmount: z.number().optional(), photo: z.string().optional(), createdAt: z.string(), dateOfBirth: z.string().optional(), acquisitionSource: z.string().optional(),
  assignedDietId: z.string().optional(), assignedDiet: z.unknown().optional(), assignedWorkoutId: z.string().optional(), assignedWorkout: z.unknown().optional(), medicalHistory: z.string().optional(), assignedTrainerId: z.string().optional(),
  assignedTrainerName: z.string().optional(), isPT: z.boolean().optional(), freezeUntil: z.string().optional(), emergencyContact: memberEmergencyContactSchema.optional(), referralCode: z.string().optional(), bloodGroup: z.string().optional(), membershipNumber: z.string().optional(),
});
export const memberStatsSchema = z.object({ total: z.number(), active: z.number(), pending: z.number(), expired: z.number() });
export type MemberEntity = z.infer<typeof memberSchema>;
export type MemberStatsEntity = z.infer<typeof memberStatsSchema>;
