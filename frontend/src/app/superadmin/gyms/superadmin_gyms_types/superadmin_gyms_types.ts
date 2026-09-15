// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Gyms module.
import { z } from 'zod';

export const TenantStatusSchema = z.enum(['ACTIVE', 'SUSPENDED', 'TRIAL', 'CANCELLED']);
// TenantStatus type defined below via union

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

export type TenantStatus = 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'CANCELLED';

export interface SubscriptionHistoryItem {
  id: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  amount: number;
}

export interface UsageStats {
  storageUsedMb: number;
  apiCallsMonthly: number;
  activeMembers: number;
}

export interface Tenant {
  id: string;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: TenantStatus;
  plan: string;
  createdAt: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
  city?: string;
  state?: string;
  country?: string;
  gstin?: string;
  trialEndsAt?: string;
  lastLoginAt?: string;
  lastActiveAt?: string | null;
  staffCount?: number;
  subscriptionHistory?: SubscriptionHistoryItem[];
  usageStats?: UsageStats;
}

export type FetchState = 'idle' | 'loading' | 'success' | 'error';
