// RESPONSIBILITY: Defines domain/data transfer shapes for the tickets feature without ORM leakage.
// FLOW: DTO -> TicketsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminTicketsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface SuperadminTicketsCreateInput {
  tenantId?: string;
  tenantName?: string;
  reporterEmail?: string;
  subject?: string;
  description?: string;
  status?: string;
  priority?: string;
  assignedTo?: string;
  attachments?: unknown;
  slaDeadline?: Date | null;
  firstResponseAt?: Date | null;
  resolutionTime?: number;
  messages?: unknown;
  lastUpdated?: Date;
}
export interface SuperadminTicketsUpdateInput extends SuperadminTicketsCreateInput {}

export interface SuperadminTicketsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  tenantId: string;
  tenantName: string;
  reporterEmail: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  assignedTo: string;
  attachments: unknown;
  slaDeadline: Date | null;
  firstResponseAt: Date | null;
  resolutionTime: number;
  messages: unknown;
  lastUpdated: Date;
}
