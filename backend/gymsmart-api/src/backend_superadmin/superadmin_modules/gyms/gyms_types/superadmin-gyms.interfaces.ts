// RESPONSIBILITY: Defines domain/data transfer shapes for the gyms feature without ORM leakage.
// FLOW: DTO -> GymsInput -> service -> repository; entity -> mapper -> response DTO.
import type { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';

/**
 * Primary Intent: Defines SuperadminGymsListQuery as the interface-level contract for superadmin-gyms.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGymsListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; order?: 'asc' | 'desc'; search?: string; status?: string; }
/**
 * Primary Intent: Defines the SuperadminGymsCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminGymsCreateInput {
  id?: string;
  name?: string;
  ownerName?: string;
  adminEmail?: string;
  phone?: string;
  status?: string;
  plan?: string;
  memberCount?: number;
  monthlyRevenue?: number;
  databaseVersion?: string;
  city?: string;
  state?: string;
  country?: string;
  gstin?: string;
  trialEndsAt?: Date | null;
  lastLoginAt?: Date | null;
  lastActiveAt?: Date | null;
  staffCount?: number;
  databaseName?: string;
  aadharNumberEncrypted?: string;
  subscriptionHistory?: unknown;
  usageStats?: unknown;
  acquisitionSource?: string;
  currency?: string;
  acquisitionCostMinor?: number;
  taxRateBasisPoints?: number;
}
/**
 * Primary Intent: Defines SuperadminGymsUpdateInput as the interface-level contract for superadmin-gyms.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGymsUpdateInput extends SuperadminGymsCreateInput { temporaryPassword?: string; }

/**
 * Primary Intent: Defines the SuperadminGymsDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminGymsDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  status: string;
  plan: string;
  memberCount: number;
  monthlyRevenue: number;
  databaseVersion: string;
  city: string;
  state: string;
  country: string;
  gstin: string;
  trialEndsAt: Date | null;
  lastLoginAt: Date | null;
  lastActiveAt: Date | null;
  staffCount: number;
  databaseName: string;
  subscriptionHistory: unknown;
  usageStats: unknown;
  acquisitionSource: string;
  acquisitionCostMinor: number;
  taxRateBasisPoints: number;
}

/**
 * Primary Intent: Defines SuperadminGymsProvisionInput as the interface-level contract for superadmin-gyms.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminGymsProvisionInput {
  gymName: string;
  ownerName: string;
  adminEmail: string;
  phone: string;
  plan: string;
  planId?: string;
  aadharNumber?: string;
  temporaryPassword: string;
  initialStatus?: string;
  acquisitionSource?: string;
  currency?: string;
  acquisitionCostMinor?: number;
  taxRateBasisPoints?: number;
}
