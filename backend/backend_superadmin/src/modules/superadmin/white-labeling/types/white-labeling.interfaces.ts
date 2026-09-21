// RESPONSIBILITY: Defines domain/data transfer shapes for the white-labeling feature without ORM leakage.
// FLOW: DTO -> WhiteLabelingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/core/auth/auth.types';

export interface WhiteLabelingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; gymId?: string;}
export interface WhiteLabelingCreateInput {
  gymId?: string;
  gymName?: string;
  domain?: string;
  status?: string;
  sslStatus?: string;
  logoUrl?: string;
  primaryColor?: string;
}
export interface WhiteLabelingUpdateInput extends WhiteLabelingCreateInput {}

export interface WhiteLabelingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  gymId: string;
  gymName: string;
  domain: string;
  status: string;
  sslStatus: string;
  logoUrl: string;
  primaryColor: string;
}
