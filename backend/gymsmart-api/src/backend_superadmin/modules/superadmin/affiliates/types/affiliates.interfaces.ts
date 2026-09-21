// RESPONSIBILITY: Defines domain/data transfer shapes for the affiliates feature without ORM leakage.
// FLOW: DTO -> AffiliatesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface AffiliatesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface AffiliatesCreateInput {
  name?: string;
  email?: string;
  phone?: string;
  referralCode?: string;
  totalReferred?: number;
  commissionEarned?: number;
  commissionRate?: number;
  pendingPayout?: number;
  bankDetails?: unknown;
  status?: string;
  joinedAt?: Date;
  referralCount?: number;
  conversionRate?: number;
}
export interface AffiliatesUpdateInput extends AffiliatesCreateInput {}

export interface AffiliatesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  email: string;
  phone: string;
  referralCode: string;
  totalReferred: number;
  commissionEarned: number;
  commissionRate: number;
  pendingPayout: number;
  bankDetails: unknown;
  status: string;
  joinedAt: Date;
  referralCount: number;
  conversionRate: number;
}
