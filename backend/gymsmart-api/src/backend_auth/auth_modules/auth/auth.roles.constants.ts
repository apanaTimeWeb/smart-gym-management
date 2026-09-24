// RESPONSIBILITY: Defines the authoritative Auth role registry used by persistence, JWT claims, validation and RBAC.
// FLOW: AuthRole -> JWT/domain/entity -> @CoreRoles -> controller authorization.

export enum AuthRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
}

export const AUTH_ALL_ROLES = [AuthRole.SUPERADMIN, AuthRole.ADMIN, AuthRole.MANAGER, AuthRole.TRAINER] as const;
