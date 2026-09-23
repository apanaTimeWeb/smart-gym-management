// RESPONSIBILITY: Defines domain/data transfer shapes for the plans feature without ORM leakage.
// FLOW: DTO -> PlansInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminPlansListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
export interface SuperadminPlansCreateInput {
  name?: string;
  priceMonthly?: number;
  priceAnnual?: number;
  maxMembers?: number;
  maxStaff?: number;
  dbLimitGb?: number;
  binaryLimitGb?: number;
  features?: unknown;
  activeTenants?: number;
  isPublic?: boolean;
  trialDays?: number;
  setupFee?: number;
  currency?: string;
  isArchived?: boolean;
}
export interface SuperadminPlansUpdateInput extends SuperadminPlansCreateInput {}

export interface SuperadminPlansDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  priceMonthly: number;
  priceAnnual: number;
  maxMembers: number;
  maxStaff: number;
  dbLimitGb: number;
  binaryLimitGb: number;
  features: unknown;
  activeTenants: number;
  isPublic: boolean;
  trialDays: number;
  setupFee: number;
  currency: string;
  isArchived: boolean;
}
