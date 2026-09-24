// RESPONSIBILITY: Provides the singleton AsyncLocalStorage request context to the application.
// FLOW: AppModule â†’ CoreContextModule â†’ RequestContextService â†’ request-scoped readers.
import { Global, Module } from '@nestjs/common';

import { RequestContextService } from '@/backend_landing/landing_core/context/request-context.service';


@Global()
@Module({
  providers: [RequestContextService],
  exports: [RequestContextService],
})
export class CoreContextModule {}
