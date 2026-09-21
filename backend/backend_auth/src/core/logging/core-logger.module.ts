// RESPONSIBILITY: Registers the only canonical backend logger with redaction and request correlation metadata.
// FLOW: AppModule -> CoreLoggerModule -> nestjs-pino -> sanitized structured access log.

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

import { CoreRequestContextService } from '@/core/context/core-request-context';
import { CoreRequestContextModule } from '@/core/context/core-request-context.module';
import type { CoreRouteRequest } from '@/core/http/core-http.interfaces';

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
    LoggerModule.forRootAsync({
      inject: [ConfigService, CoreRequestContextService],
      useFactory: (config: ConfigService, requestContext: CoreRequestContextService) => ({
        pinoHttp: {
          level: config.getOrThrow<string>('environment.NODE_ENV') === 'production' ? 'info' : 'debug',
          redact: {
            paths: [
              'req.headers.authorization',
              'req.headers.cookie',
              'req.headers.set-cookie',
              'res.headers["set-cookie"]',
              'req.body.password',
              'req.body.passwordHash',
              'req.body.accessToken',
              'req.body.refreshToken',
              'req.body.*.password',
              'req.body.*.accessToken',
              'req.body.*.refreshToken',
              'password',
              'passwordHash',
              'accessToken',
              'refreshToken',
            ],
            remove: true,
          },
          serializers: {
            req: (request: CoreRouteRequest) => ({
              method: request.method,
              route: routeTemplate(request),
              requestId: requestContext.get()?.requestId ?? 'unknown',
            }),
            res: (response: Response) => ({ statusCode: response.statusCode }),
          },
          customProps: (request: CoreRouteRequest) => {
            const context = requestContext.get();
            return {
              method: request.method,
              route: routeTemplate(request),
              requestId: context?.requestId ?? 'unknown',
              traceId: context?.traceId ?? 'unknown',
              spanId: context?.spanId ?? 'unknown',
              tenantId: context?.tenantId ?? null,
              context: 'HTTP',
                  };
          },
        },
      }),
    }),
  ],
  exports: [LoggerModule],
})
export class CoreLoggerModule {}
