// RESPONSIBILITY: Defines domain/data transfer shapes for the broadcasts feature without ORM leakage.
// FLOW: DTO -> BroadcastsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminBroadcastsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string;}
export interface SuperadminBroadcastsCreateInput {
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

export interface SuperadminBroadcastsUpdateInput extends SuperadminBroadcastsCreateInput {}

export interface SuperadminBroadcastsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
