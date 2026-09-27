// RESPONSIBILITY: Declares backend response-field exposure metadata for authorized sensitive-field serialization.
// FLOW: Decorator metadata → ManagerCoreResponseInterceptor → role/endpoint authorization → filtered response serialization.
import { SetMetadata } from '@nestjs/common';

export const MANAGER_CORE_EXPOSE_SENSITIVE_FIELDS = 'core_expose_sensitive_fields';

/** @description Declares sensitive response fields that the current authorized route is explicitly allowed to expose. */
export const ManagerCoreExposeSensitiveFields = (...fields: string[]): MethodDecorator & ClassDecorator =>
  SetMetadata(MANAGER_CORE_EXPOSE_SENSITIVE_FIELDS, fields);
