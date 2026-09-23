// RESPONSIBILITY: Defines domain/data transfer shapes for the broadcasts feature without ORM leakage.
// FLOW: DTO -> BroadcastsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';

export interface BroadcastsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface BroadcastsCreateInput {
  title?: string;
  content?: string;
  status?: string;
  targetGymIds?: unknown;
  scheduledDate?: Date | null;
  sentDate?: Date | null;
  totalRecipients?: number;
  deliveredCount?: number;
  failedCount?: number;
  audience?: string;
  channel?: string;
  openedCount?: number;
  clickedCount?: number;
}

export interface BroadcastsUpdateInput extends BroadcastsCreateInput {}

export interface BroadcastsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  title: string;
  content: string;
  status: string;
  targetGymIds: unknown;
  scheduledDate: Date | null;
  sentDate: Date | null;
  totalRecipients: number;
  deliveredCount: number;
  failedCount: number;
  audience: string;
}
