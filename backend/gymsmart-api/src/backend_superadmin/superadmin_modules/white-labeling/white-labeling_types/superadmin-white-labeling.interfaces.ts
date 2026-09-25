// RESPONSIBILITY: Defines domain/data transfer shapes for the white-labeling feature without ORM leakage.
// FLOW: DTO -> WhiteLabelingInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingListQuery as the interface-level contract for superadmin-white-labeling.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminWhiteLabelingListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string;  status?: string; gymId?: string;}
/**
 * Primary Intent: Defines the SuperadminWhiteLabelingCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminWhiteLabelingCreateInput {
  gymId?: string;
  gymName?: string;
  domain?: string;
  status?: string;
  sslStatus?: string;
  logoUrl?: string;
  primaryColor?: string;
}
/**
 * Primary Intent: Defines the SuperadminWhiteLabelingUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminWhiteLabelingUpdateInput extends SuperadminWhiteLabelingCreateInput {}

/**
 * Primary Intent: Defines the SuperadminWhiteLabelingDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminWhiteLabelingDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  gymId: string;
  gymName: string;
  domain: string;
  status: string;
  sslStatus: string;
  logoUrl: string;
  primaryColor: string;
}
