// RESPONSIBILITY: Provides the singleton AsyncLocalStorage request context to the application.
// FLOW: AppModule → CoreContextModule → RequestContextService → request-scoped readers.
import { Global, Module } from '@nestjs/common';
import { RequestContextService } from '@/core/context/request-context.service';

@Global()
@Module({
  providers: [RequestContextService],
  exports: [RequestContextService],
})
export class CoreContextModule {}
