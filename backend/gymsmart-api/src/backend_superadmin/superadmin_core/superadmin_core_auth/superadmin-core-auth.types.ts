// RESPONSIBILITY: Defines the typed authentication claims and role vocabulary used by the application.
// FLOW: JWT claims -> SuperadminCoreJwtAuthGuard -> request.user -> SuperadminCoreRolesGuard.

/**
 * Primary Intent: Defines SuperadminAuthenticatedUser as the interface-level contract for superadmin-core-auth.types.ts.
 * Edge Cases: Preserve exact exported names, field shapes, enum values, nullability, and module isolation when changing this construct.
 * Side-Effects: None unless the construct is explicitly a persistence, adapter, queue, or event boundary.
 * AI-Note: Treat this declaration as an architectural contract; do not move business logic into generic/shared folders or introduce undocumented fields.
 */
export interface SuperadminAuthenticatedUser {
  readonly userId: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly requestId?: string;
}

/**
 * Primary Intent: Defines the SuperadminJwtClaims type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
export interface SuperadminJwtClaims {
  readonly sub: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly tokenVersion: number;
}
