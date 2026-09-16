import { z } from 'zod';

export const MemberEmergencyContactSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

export const MemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  address: z.string().optional(),
  aadhaar: z.string().optional(),
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
  paidAmount: z.number(),
  pendingAmount: z.number(),
  advanceAmount: z.number().optional(),
  photo: z.string().optional(),
  createdAt: z.string(),
  dateOfBirth: z.string().optional(),
  acquisitionSource: z.string().optional(),
  assignedDietId: z.string().optional(),
  assignedDiet: z.unknown().optional(),
  assignedWorkoutId: z.string().optional(),
  assignedWorkout: z.unknown().optional(),
  medicalHistory: z.string().optional(),
  assignedTrainerId: z.string().optional(),
  assignedTrainerName: z.string().optional(),
  isPT: z.boolean().optional(),
  freezeUntil: z.string().optional(),
  emergencyContact: MemberEmergencyContactSchema.optional(),
  referralCode: z.string().optional(),
  bloodGroup: z.string().optional(),
  membershipNumber: z.string().optional(),
});

export const MemberStatsSchema = z.object({
  total: z.number(),
  active: z.number(),
  pending: z.number(),
  expired: z.number(),
});

export const MemberFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  address: z.string().optional(),
  aadhaar: z.string().regex(/^\d{12}$/, "Aadhaar must be exactly 12 digits").optional().or(z.literal('')),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  billingCycle: z.string(),
  customDays: z.number().min(1, "Please enter valid days").optional().or(z.literal(0)),
  planId: z.string().min(1, "Please select a plan"),
  totalAmount: z.number().min(0).optional(),
  paidAmount: z.number().min(0, "Amount must be valid").optional(),
  pendingAmount: z.number().optional(),
  advanceAmount: z.number().optional(),
  joinDate: z.string().optional(),
  expiryDate: z.string().optional(),
  medicalHistory: z.string().optional(),
  status: z.enum(['ACTIVE', 'PENDING', 'EXPIRED', 'FROZEN', 'SUSPENDED', 'BANNED']).optional(),
});

export type MemberType = z.infer<typeof MemberSchema>;
export type MemberStatsType = z.infer<typeof MemberStatsSchema>;
export type MemberFormType = z.infer<typeof MemberFormSchema>;
