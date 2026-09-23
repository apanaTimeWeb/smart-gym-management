// RESPONSIBILITY: Defines domain/data transfer shapes for the white-labeling feature without ORM leakage.
// FLOW: DTO -> WhiteLabelingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';

export interface SuperadminWhiteLabelingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; gymId?: string;}
export interface SuperadminWhiteLabelingCreateInput {
  gymId?: string;
  gymName?: string;
  domain?: string;
  status?: string;
  sslStatus?: string;
  logoUrl?: string;
  primaryColor?: string;
}
export interface SuperadminWhiteLabelingUpdateInput extends SuperadminWhiteLabelingCreateInput {}

export interface SuperadminWhiteLabelingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  gymId: string;
  gymName: string;
  domain: string;
  status: string;
  sslStatus: string;
  logoUrl: string;
  primaryColor: string;
}
