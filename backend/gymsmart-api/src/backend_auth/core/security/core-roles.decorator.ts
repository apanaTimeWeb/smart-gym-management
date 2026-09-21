// RESPONSIBILITY: Declares controller-layer RBAC requirements with centralized role values.
// FLOW: @CoreRoles metadata -> CoreRolesGuard -> verified JWT role.

import { SetMetadata } from '@nestjs/common';

export const CORE_ROLES = 'core_roles';
/** @description Declares the allowed typed-role metadata consumed by CoreRolesGuard. @param roles - Central role values. @returns Nest metadata decorator. */
export const CoreRoles = (...roles: readonly string[]): MethodDecorator => SetMetadata(CORE_ROLES, roles);
