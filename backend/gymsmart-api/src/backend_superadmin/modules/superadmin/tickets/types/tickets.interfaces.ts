// RESPONSIBILITY: Defines domain/data transfer shapes for the tickets feature without ORM leakage.
// FLOW: DTO -> TicketsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface TicketsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; tenantId?: string;}
export interface TicketsCreateInput {
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
export interface TicketsUpdateInput extends TicketsCreateInput {}

export interface TicketsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
