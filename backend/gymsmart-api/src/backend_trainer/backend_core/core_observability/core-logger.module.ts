// RESPONSIBILITY: Configures the canonical nestjs-pino structured logger with safe request/response serializers and redaction.
// FLOW: Environment config → LoggerModule → sanitized access log context.

import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';


/**
 * Intent: Defines the CoreLoggerModule boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        redact: ['req.headers.authorization', 'req.headers.cookie', 'req.body.password', 'req.body.otp', 'req.body.pin', 'req.body.cardNumber'],
        serializers: {
          req: (request: { method: string; route?: { path?: string }; url?: string }) => ({ method: request.method, route: request.route?.path ?? 'unknown' }),
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
