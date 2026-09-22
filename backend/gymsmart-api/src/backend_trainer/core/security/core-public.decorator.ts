// RESPONSIBILITY: Marks endpoints that may bypass global authentication, such as health probes.
// FLOW: Route metadata → CoreAuthGuard → allow anonymous access.


import { SetMetadata } from '@nestjs/common';
export const CORE_PUBLIC_KEY = 'core_public';
export const CorePublic = () => SetMetadata(CORE_PUBLIC_KEY, true);
