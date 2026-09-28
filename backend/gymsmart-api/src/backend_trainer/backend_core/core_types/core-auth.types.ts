// RESPONSIBILITY: Defines authenticated actor and tenant authorization context shapes.
// FLOW: JWT payload → CoreAuthGuard → RequestContext → service/repository scope.


export enum CoreRole { TRAINER='TRAINER', MANAGER='MANAGER', ADMIN='ADMIN', MEMBER='MEMBER' }
export const CORE_ROLE_IDS = Object.values(CoreRole);


export interface CoreAuthUser {
  userId: string;
  email: string;
  role: CoreRole;
}

export interface CoreAuthTokenPair { accessToken: string; refreshToken: string; }
