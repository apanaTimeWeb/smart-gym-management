// RESPONSIBILITY: Defines feature-safe domain input/output shapes without exposing mutable financial persistence fields.
// FLOW: DTO -> domain input -> service -> repository; ledger -> domain pending balance -> response DTO.

/**
 * Primary Intent: Defines SuperadminAffiliatesListQuery as the interface-level contract for superadmin-affiliates.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAffiliatesListQuery { page: number; limit: number; sortBy: string; sortOrder: 'ASC' | 'DESC'; search?: string; status?: string; }
/**
 * Primary Intent: Defines the SuperadminAffiliatesCreateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAffiliatesCreateInput {
  name: string;
  email: string;
  phone?: string;
  referralCode: string;
  bankDetails?: Record<string, unknown> | null;
  currency?: string;
  status?: string;
  joinedAt?: Date;
}
/**
 * Primary Intent: Defines the SuperadminAffiliatesUpdateInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAffiliatesUpdateInput {
  name?: string;
  email?: string;
  phone?: string;
  referralCode?: string;
  bankDetails?: Record<string, unknown> | null;
  currency?: string;
  status?: string;
  joinedAt?: Date;
}

/**
 * Primary Intent: Defines SuperadminAffiliatesCreatePersistenceInput as the interface-level contract for superadmin-affiliates.interfaces.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAffiliatesCreatePersistenceInput {
  name: string; email: string; phone?: string; referralCode: string; bankDetails?: string | null; currency: string; status?: string; joinedAt?: Date;
}

/**
 * Primary Intent: Defines the SuperadminAffiliatesUpdatePersistenceInput type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAffiliatesUpdatePersistenceInput {
  name?: string; email?: string; phone?: string; referralCode?: string; bankDetails?: string | null; currency?: string; status?: string; joinedAt?: Date;
}

/**
 * Primary Intent: Defines the SuperadminAffiliatesDomainModel type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminAffiliatesDomainModel { id: string; createdAt: Date; updatedAt: Date; deletedAt: Date | null;
  name: string; email: string; phone: string; referralCode: string; totalReferred: number; commissionEarned: number; commissionRate: number;
  pendingPayout: number; bankDetails: string | null; currency: string; status: string; joinedAt: Date; referralCount: number; conversionRate: number;
}
