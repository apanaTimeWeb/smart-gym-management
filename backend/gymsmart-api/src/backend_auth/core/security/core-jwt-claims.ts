// RESPONSIBILITY: Defines the minimal JWT claims contract known by core security infrastructure.
// FLOW: Auth signing -> JWT -> CoreJwtAuthGuard -> request context/RBAC.

export interface CoreJwtClaims {
  sub: string;
  sid: string;
  email: string;
  role: string;
  tenantId?: string;
  iat?: number;
  exp?: number;
}
