// RESPONSIBILITY: Defines the typed authentication claims and role vocabulary used by the application.
// FLOW: JWT claims -> SuperadminJwtAuthGuard -> request.user -> SuperadminRolesGuard.
export enum SuperadminRole {
  SUPERADMIN = 'SUPERADMIN',
}

export interface SuperadminAuthenticatedUser {
  readonly userId: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly requestId?: string;
}

export interface SuperadminJwtClaims {
  readonly sub: string;
  readonly email: string;
  readonly role: SuperadminRole;
  readonly tenantId: string | null;
  readonly tokenVersion: number;
}
