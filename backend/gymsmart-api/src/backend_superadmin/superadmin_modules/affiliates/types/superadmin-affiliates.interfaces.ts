// RESPONSIBILITY: Defines domain/data transfer shapes for the affiliates feature without ORM leakage.
// FLOW: DTO -> AffiliatesInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminAffiliatesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminAffiliatesCreateInput {
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
export interface SuperadminAffiliatesUpdateInput extends SuperadminAffiliatesCreateInput {}

export interface SuperadminAffiliatesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
