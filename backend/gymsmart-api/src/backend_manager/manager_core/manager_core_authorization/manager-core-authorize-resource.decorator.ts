// RESPONSIBILITY: Declares which route parameter or body field represents a resource requiring authorization.
// FLOW: Controller metadata -> ManagerCoreResourceAuthorizationGuard -> explicit resource feature provider -> authorized handler.
import { SetMetadata } from '@nestjs/common';

export const MANAGER_CORE_RESOURCE_AUTHORIZATION = 'core_resource_authorization';
export interface ManagerCoreResourceAuthorizationMetadata { source: 'params' | 'body' | 'query'; field: string; resourceFeature?: string; }

/**
 * @description Marks a route parameter as an explicitly owned or foreign resource that must be authorized before controller execution.
 * @param paramName - Request parameter containing the resource UUID.
 * @param resourceFeature - Optional owning feature name when the identifier belongs to another feature.
 * @returns NestJS metadata decorator.
 */
export const ManagerCoreAuthorizeResourceParam = (paramName: string, resourceFeature?: string) => SetMetadata(MANAGER_CORE_RESOURCE_AUTHORIZATION, { source: 'params', field: paramName, resourceFeature });

/**
 * @description Marks a request-body field as an explicitly owned or foreign resource that must be authorized before controller execution.
 * @param fieldName - Body property containing the resource UUID.
 * @param resourceFeature - Optional owning feature name when the identifier belongs to another feature.
 * @returns NestJS metadata decorator.
 */
export const ManagerCoreAuthorizeResourceBody = (fieldName: string, resourceFeature?: string) => SetMetadata(MANAGER_CORE_RESOURCE_AUTHORIZATION, { source: 'body', field: fieldName, resourceFeature });
