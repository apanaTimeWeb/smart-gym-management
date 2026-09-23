// RESPONSIBILITY: Defines domain/data transfer shapes for the gyms feature without ORM leakage.
// FLOW: DTO -> GymsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface GymsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; order?: 'asc' | 'desc'; search?: string; status?: string; }
export interface GymsCreateInput {
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
export interface GymsUpdateInput extends GymsCreateInput { temporaryPassword?: string; }

export interface GymsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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

export interface GymsProvisionInput {
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
