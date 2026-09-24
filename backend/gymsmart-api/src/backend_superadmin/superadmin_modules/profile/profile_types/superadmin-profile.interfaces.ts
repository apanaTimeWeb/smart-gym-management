// RESPONSIBILITY: Defines domain/data transfer shapes for the profile feature without ORM leakage.
// FLOW: DTO -> ProfileInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminProfileListQuery as the interface-level contract for superadmin-profile.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminProfileListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; }
/**
 * Primary Intent: Defines the SuperadminProfileCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminProfileCreateInput {
  name?: string;
  email?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  role?: string;
  avatarUrl?: string;
  lastLoginAt?: Date | null;
  twoFactorEnabled?: boolean;
  passwordHash?: string;
}
/**
 * Primary Intent: Defines SuperadminProfileUpdateInput as the interface-level contract for superadmin-profile.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminProfileUpdateInput extends SuperadminProfileCreateInput {}

/**
 * Primary Intent: Defines the SuperadminProfileDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminProfileDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  email: string;
  phone: string;
  timezone: string;
  language: string;
  role: string;
  avatarUrl: string;
  lastLoginAt: Date | null;
  twoFactorEnabled: boolean;
  passwordHash: string;
}
