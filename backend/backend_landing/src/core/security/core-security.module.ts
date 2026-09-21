// RESPONSIBILITY: Registers security guards and request-level protections shared by backend modules.
// FLOW: AppModule → CoreSecurityModule → RateLimitGuard.
import { Global, Module } from '@nestjs/common';

import { RateLimitGuard } from '@/core/security/rate-limit.guard';


@Global()
@Module({
  providers: [RateLimitGuard],
  exports: [RateLimitGuard],
})
export class CoreSecurityModule {}
