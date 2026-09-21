// RESPONSIBILITY: Declares the endpoint SLA category consumed by the timeout interceptor and operational tooling.
// FLOW: Controller decorator -> CoreTimeoutInterceptor -> TIMEOUT_CONFIG -> bounded HTTP execution.

import { SetMetadata } from '@nestjs/common';

export enum CoreSlaCategory {
  FAST = 'FAST',
  STANDARD = 'STANDARD',
  HEAVY = 'HEAVY',
}

export const CORE_SLA_CATEGORY = 'core_sla_category';
/** @description Declares the endpoint SLA category consumed by CoreTimeoutInterceptor. @param category - Endpoint latency category. @returns Nest metadata decorator. */
export const CoreSla = (category: CoreSlaCategory): MethodDecorator => SetMetadata(CORE_SLA_CATEGORY, category);
