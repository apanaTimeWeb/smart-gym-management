// RESPONSIBILITY: Defines domain/data transfer shapes for the gyms feature without ORM leakage.
// FLOW: DTO -> GymsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminGymsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; order?: 'asc' | 'desc'; search?: string; status?: string; }
export interface SuperadminGymsCreateInput {
  id?: string;
  name?: string;
  ownerName?: string;
  adminEmail?: string;
  phone?: string;
  status?: string;
  plan?: string;
  memberCount?: number;
  monthlyRevenue?: number;
  databaseVersion?: string;
  city?: string;
  state?: string;
  country?: string;
  gstin?: string;
  trialEndsAt?: Date | null;
  lastLoginAt?: Date | null;
  lastActiveAt?: Date | null;
  staffCount?: number;
  databaseName?: string;
  aadharNumberEncrypted?: string;
  subscriptionHistory?: unknown;
  usageStats?: unknown;
  acquisitionSource?: string;
  acquisitionCostMinor?: number;
  taxRateBasisPoints?: number;
}
export interface SuperadminGymsUpdateInput extends SuperadminGymsCreateInput { temporaryPassword?: string; }

export interface SuperadminGymsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: string;
  plan: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
  city: string;
  state: string;
  country: string;
  gstin: string;
  trialEndsAt: Date | null;
  lastLoginAt: Date | null;
  lastActiveAt: Date | null;
  staffCount: number;
  databaseName: string;
  subscriptionHistory: unknown;
  usageStats: unknown;
  acquisitionSource: string;
  acquisitionCostMinor: number;
  taxRateBasisPoints: number;
}

export interface SuperadminGymsProvisionInput {
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  plan: string;
  planId?: string;
  aadharNumber?: string;
  temporaryPassword: string;
  initialStatus?: string;
  acquisitionSource?: string;
  acquisitionCostMinor?: number;
  taxRateBasisPoints?: number;
}
