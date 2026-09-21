// RESPONSIBILITY: Defines trusted tenant routing constants and roles.
// FLOW: Authentication/authorization â†’ tenant constants â†’ feature guards.

export enum CoreAdminRole {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
  MANAGER = 'MANAGER',
  TRAINER = 'TRAINER',
}

export const CoreTenantErrorCodes = {
  UNAUTHORIZED: 'TENANT.ACCESS.DENIED',
  MISSING: 'TENANT.CONTEXT.MISSING',
  MISMATCH: 'TENANT.CONTEXT.MISMATCH',
} as const;
