// RESPONSIBILITY: Provides the AsyncLocalStorage request context as a singleton core service.
// FLOW: AppModule -> CoreRequestContextModule -> CoreRequestContextService -> middleware/guards/repositories.

import { Global, Module } from '@nestjs/common';

import { CoreRequestContextService } from '@/backend_auth/auth_core/context/core-request-context';
@Global()
@Module({ providers: [CoreRequestContextService], exports: [CoreRequestContextService] })
export class CoreRequestContextModule {}
