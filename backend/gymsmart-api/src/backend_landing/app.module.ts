// RESPONSIBILITY: Composes the supplied Landing role container with its allowed global infrastructure contracts.
// FLOW: Bootstrap -> validated config -> global logger/master DB -> LandingCoreModule -> LandingLandingModule -> request middleware.
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { LandingValidationExceptionFilter } from '@/backend_landing/landing_core/landing_http/landing-validation-exception.filter';
import { LandingCoreModule } from '@/backend_landing/landing_core/landing-core.module';
import { LandingResponseInterceptor } from '@/backend_landing/landing_core/landing_http/landing-response.interceptor';
import { buildValidatedConfig, validateLandingEnvironment } from '@/backend_landing/landing_core/landing_config/landing-app.config';
import { getLandingDatabasePoolConfig } from '@/backend_landing/landing_core/landing_config/landing-database.config';
import { buildMasterDataSourceOptions } from '@/backend_landing/landing_core/landing_database/landing-master-data-source-options';
import { LandingTestTenantController } from '@/backend_landing/landing_core/landing_tenant/landing-test-tenant.controller';
import { LandingTenantResolutionMiddleware } from '@/backend_landing/landing_core/landing_tenant/landing-tenant-resolution.middleware';
import { LandingMetricsMiddleware } from '@/backend_landing/landing_core/landing_observability/landing-metrics.middleware';
import { buildLandingLoggerOptions } from '@/backend_landing/landing_core/landing_observability/landing-logger.config';
import { LandingCoreContextModule } from '@/backend_landing/landing_core/landing_context/landing-core-context.module';
import { LandingRequestContextService } from '@/backend_landing/landing_core/landing_context/landing-request-context.service';
import { LandingRequestContextMiddleware } from '@/backend_landing/landing_core/landing_context/landing-request-context.middleware';

import { LandingLandingModule } from '@/backend_landing/landing_modules/landing/landing-landing.module';

/**
 * Intent: Defines the AppModule class boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs and infrastructure failures are handled by the owning boundary.
 * Side Effects: None beyond the behavior implemented by this class.
 * AI Notes: Preserve the class responsibility and dependency direction documented by the module.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [buildValidatedConfig],
      validate: validateLandingEnvironment,
    }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule, LandingCoreContextModule],
      inject: [ConfigService, LandingRequestContextService],
      useFactory: buildLandingLoggerOptions,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => buildMasterDataSourceOptions(
        config.getOrThrow('app.masterDb'),
        getLandingDatabasePoolConfig(config),
      ),
    }),
    LandingCoreModule,
    LandingLandingModule,
  ],
  controllers: [LandingTestTenantController],
  providers: [
    { provide: APP_FILTER, useClass: LandingValidationExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LandingResponseInterceptor },
    LandingRequestContextMiddleware,
    LandingTenantResolutionMiddleware,
    LandingMetricsMiddleware,
  ],
})
/**
 * Intent: Defines the app module boundary for this supplied Landing backend scope.
 * Edge Cases: Invalid inputs, unavailable infrastructure, and transaction failures must fail through the owning boundary instead of being silently ignored.
 * Side Effects: Performs only the persistence, orchestration, transport, or infrastructure effects explicitly owned by this class.
 * AI Notes: Preserve the class's current responsibility and dependency direction; do not move business logic across feature boundaries.
 */
export class AppModule implements NestModule {
  /**
   * Intent: Registers request-scoped infrastructure middleware through Nest's dependency-injection lifecycle.
   * Edge Cases: Middleware order is security-sensitive; request context must exist before tenant resolution and metrics.
   * Side Effects: Populates AsyncLocalStorage and trusted tenant state used by downstream repositories and idempotency.
   * AI Notes: Do not instantiate these middleware classes manually in main.ts; doing so bypasses injected dependencies.
   */
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        LandingRequestContextMiddleware,
        LandingTenantResolutionMiddleware,
        LandingMetricsMiddleware,
      )
      .forRoutes('*');
  }
}
