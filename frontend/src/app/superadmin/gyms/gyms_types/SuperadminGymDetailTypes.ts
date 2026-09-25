// RESPONSIBILITY: Defines the runtime-validated response contract for the Superadmin Gym 360 detail workspace.
import { z } from 'zod';

export const SuperadminGymDetailStatusSchema = z.enum(['ACTIVE', 'TRIAL', 'SUSPENDED', 'CANCELLED']);
export const SuperadminGymDetailTabSchema = z.enum(['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support']);
export const SuperadminGymDetailUsageItemSchema = z.object({
  label: z.string(),
  used: z.number(),
  limit: z.number(),
  percent: z.number(),
});

export const SuperadminGymDetailDataSchema = z.object({
  gymId: z.string(),
  gymName: z.string(),
  status: SuperadminGymDetailStatusSchema,
  ownerName: z.string(),
  adminEmail: z.string().email(),
  phone: z.string(),
  createdAt: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string().optional(),
  gstin: z.string().optional(),
  trialEndsAt: z.string().optional(),
  memberCount: z.number(),
  monthlyRevenue: z.number(),
  currency: z.string(),
  plan: z.string(),
  databaseVersion: z.string(),
  tabs: z.array(SuperadminGymDetailTabSchema),
  health: z.object({
    score: z.number(),
    loginTrend: z.number(),
    memberTrend: z.number(),
    paymentFailures: z.number(),
    openTickets: z.number(),
  }),
  usage: z.array(SuperadminGymDetailUsageItemSchema),
  billing: z.object({
    monthlyIncome: z.number(),
    nextPayment: z.string(),
    failedPayments: z.number(),
    discount: z.string(),
    currency: z.string(),
  }),
  support: z.object({
    openTickets: z.number(),
    averageResponseHours: z.number(),
    satisfaction: z.number(),
  }),
  activity: z.array(z.object({ date: z.string(), event: z.string() })),
  subscription: z.object({ plan: z.string(), started: z.string(), renewal: z.string(), monthlyIncome: z.number(), currency: z.string() }),
});

export const SuperadminGymDetailResponseSchema = z.object({
  data: SuperadminGymDetailDataSchema,
  message: z.string(),
  success: z.boolean(),
});

export type SuperadminGymDetailStatus = z.infer<typeof SuperadminGymDetailStatusSchema>;
export type SuperadminGymDetailTab = z.infer<typeof SuperadminGymDetailTabSchema>;
export type SuperadminGymDetailUsageItem = z.infer<typeof SuperadminGymDetailUsageItemSchema>;
export type SuperadminGymDetailData = z.infer<typeof SuperadminGymDetailDataSchema>;
export type SuperadminGymDetailResponse = z.infer<typeof SuperadminGymDetailResponseSchema>;
