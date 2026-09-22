// RESPONSIBILITY: Configures the canonical nestjs-pino structured logger with safe request/response serializers and redaction.
// FLOW: Environment config → LoggerModule → sanitized access log context.

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password', 'req.body.otp', 'req.body.pin', 'req.body.cardNumber'],
        serializers: {
          req: (request: { method: string; route?: { path?: string }; url?: string }) => ({ method: request.method, route: request.route?.path ?? request.url ?? 'unknown' }),
          res: (response: { statusCode: number }) => ({ statusCode: response.statusCode }),
        },
        customProps: () => {
          try {
            const context = CoreRequestContext.get();
            return {
              requestId: context.requestId,
              tenantId: context.tenantId,
              traceId: context.traceId,
              spanId: context.spanId,
              context: 'HTTP',
            };
          } catch {
            return {};
          }
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class CoreLoggerModule {}
