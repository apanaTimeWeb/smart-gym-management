// RESPONSIBILITY: Defines domain/data transfer shapes for the usage-meters feature without ORM leakage.
// FLOW: DTO -> UsageMetersInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface UsageMetersListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  tenantId?: string;}
export interface UsageMetersCreateInput {
  tenantId?: string;
  tenantName?: string;
  smsSent?: number;
  smsLimit?: number;
  whatsappMessagesSent?: number;
  whatsappLimit?: number;
  emailsSent?: number;
  emailLimit?: number;
  apiCallsCount?: number;
  apiCallsLimit?: number;
  databaseGb?: number;
  mediaGb?: number;
  storageLimitGb?: number;
  activeMembers?: number;
  totalMembers?: number;
  memberLimit?: number;
  staffCount?: number;
  staffLimit?: number;
  billingCycleEnd?: Date;
}
export interface UsageMetersUpdateInput extends UsageMetersCreateInput {}

export interface UsageMetersDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  smsSent: number;
  smsLimit: number;
  whatsappMessagesSent: number;
  whatsappLimit: number;
  emailsSent: number;
  emailLimit: number;
  apiCallsCount: number;
  apiCallsLimit: number;
  databaseGb: number;
  mediaGb: number;
  storageLimitGb: number;
  activeMembers: number;
  totalMembers: number;
  memberLimit: number;
  staffCount: number;
  staffLimit: number;
  billingCycleEnd: Date;
}
