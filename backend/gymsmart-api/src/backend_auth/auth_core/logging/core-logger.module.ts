// RESPONSIBILITY: Registers the only canonical backend logger with redaction and request correlation metadata.
// FLOW: AppModule -> CoreLoggerModule -> nestjs-pino -> sanitized structured access log.

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { CoreRequestContextService } from '@/backend_auth/auth_core/context/core-request-context';
import { CoreRequestContextModule } from '@/backend_auth/auth_core/context/core-request-context.module';
import type { CoreRouteRequest } from '@/backend_auth/auth_core/http/core-http.interfaces';

import type { Response } from 'express';
/** @description Resolves the matched route template without exposing raw URL values. @param request - Express request with optional route metadata. @returns Matched route template or unknown. */
function routeTemplate(request: CoreRouteRequest): string {
  const path = request.route?.path;
  return typeof path === 'string' ? path : 'unknown';
}

@Module({
  imports: [
    ConfigModule,
    CoreRequestContextModule,

  ],
  exports: [],
})
export class CoreLoggerModule {}
