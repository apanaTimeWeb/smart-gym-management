import { z } from 'zod';

export const TenantStatusSchema = z.enum(['ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED']);
export type TenantStatus = z.infer<typeof TenantStatusSchema>;

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  ownerName: z.string(),
  adminEmail: z.string().email(),
  phone: z.string(),
  status: TenantStatusSchema,
  plan: z.string(),
  createdAt: z.string(),
  memberCount: z.number(),
  monthlyRevenue: z.number(),
  databaseVersion: z.string(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  gstin: z.string().optional(),
  trialEndsAt: z.string().optional(),
  lastLoginAt: z.string().optional(),
  lastActiveAt: z.string().nullable().optional(),
});
export type Tenant = z.infer<typeof TenantSchema>;
