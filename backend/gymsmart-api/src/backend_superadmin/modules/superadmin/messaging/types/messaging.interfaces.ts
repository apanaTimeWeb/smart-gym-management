// RESPONSIBILITY: Defines domain/data transfer shapes for the messaging feature without ORM leakage.
// FLOW: DTO -> MessagingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface MessagingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface MessagingCreateInput {
  tenantId?: string;
  tenantName?: string;
  channel?: string;
  subject?: string;
  body?: string;
  status?: string;
  sentAt?: Date | null;
  scheduledAt?: Date | null;
}
export interface MessagingUpdateInput extends MessagingCreateInput {}

export interface MessagingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  channel: string;
  subject: string;
  body: string;
  status: string;
  sentAt: Date | null;
  scheduledAt: Date | null;
}
