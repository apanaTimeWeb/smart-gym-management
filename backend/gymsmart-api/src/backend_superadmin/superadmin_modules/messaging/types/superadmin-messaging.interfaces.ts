// RESPONSIBILITY: Defines domain/data transfer shapes for the messaging feature without ORM leakage.
// FLOW: DTO -> MessagingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminMessagingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface SuperadminMessagingCreateInput {
  tenantId?: string;
  tenantName?: string;
  channel?: string;
  subject?: string;
  body?: string;
  status?: string;
  sentAt?: Date | null;
  scheduledAt?: Date | null;
  campaignMetadata?: Record<string, unknown> | null;
}
export interface SuperadminMessagingUpdateInput extends SuperadminMessagingCreateInput {}

export interface SuperadminMessagingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  channel: string;
  subject: string;
  body: string;
  status: string;
  sentAt: Date | null;
  scheduledAt: Date | null;
  campaignMetadata: Record<string, unknown> | null;
}
