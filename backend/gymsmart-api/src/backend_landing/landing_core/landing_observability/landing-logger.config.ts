// RESPONSIBILITY: Builds the approved Pino logger options from validated ConfigService state and trusted request context.
// FLOW: AppModule logger factory -> buildLandingLoggerOptions -> ConfigService + request context -> Pino.
import { ConfigService } from '@nestjs/config';

import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';

export interface LandingLoggerOptions {
  readonly pinoHttp: {
    readonly level: string;
    readonly redact: readonly string[];
    readonly mixin: () => Record<string, string>;
  };
}

/**
 * Intent: Keep bootstrap logging configuration outside AppModule so the module file remains under Rule 75's hard ceiling.
 * Edge Cases: Request context may be unavailable during startup or background work; the mixin then returns an empty object.
 * Side Effects: None; this function builds configuration only.
 * AI Notes: Do not read process.env directly here; ConfigService is the single configuration boundary.
 */
export function buildLandingLoggerOptions(
  config: ConfigService,
  requestContext: LandingRequestContextService,
): LandingLoggerOptions {
  return {
    pinoHttp: {
      level: config.getOrThrow<string>('app.nodeEnv') === 'production' ? 'info' : 'debug',
      redact: ['req.headers.authorization', 'req.headers.cookie', 'req.headers.x-api-key'],
      mixin: () => {
        try {
          const context = requestContext.get();
          return {
            requestId: context.requestId,
            tenantId: context.tenantId ?? '',
            traceId: context.traceId,
            spanId: context.spanId,
          };
        } catch {
          return {};
        }
      },
    },
  };
}
