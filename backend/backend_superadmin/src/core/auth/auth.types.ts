// RESPONSIBILITY: Defines the typed authentication claims and role vocabulary used by the application.
// FLOW: JWT claims -> JwtAuthGuard -> request.user -> RolesGuard.
export enum SuperadminRole {
  SUPERADMIN = 'SUPERADMIN',
}

export interface AuthenticatedUser {
  readonly userId: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly requestId?: string;
}

export interface JwtClaims {
  readonly sub: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly tokenVersion: number;
}
