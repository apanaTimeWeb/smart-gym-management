// RESPONSIBILITY: Marks intentionally public routes for the global access-token guard.
// FLOW: Controller metadata -> CoreJwtAuthGuard -> public route bypass.

import { SetMetadata } from '@nestjs/common';

export const CORE_PUBLIC_ROUTE = 'core_public_route';
/** @description Marks an endpoint as intentionally public to the global JWT guard. @returns Nest metadata decorator. */
export const CorePublic = (): MethodDecorator => SetMetadata(CORE_PUBLIC_ROUTE, true);
