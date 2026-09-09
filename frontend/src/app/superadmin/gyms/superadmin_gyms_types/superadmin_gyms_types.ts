// RESPONSIBILITY: Defines all TypeScript types and interfaces for the Gyms module.
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
