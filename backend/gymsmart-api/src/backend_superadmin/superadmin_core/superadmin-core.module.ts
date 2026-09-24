// RESPONSIBILITY: Registers global framework infrastructure only; business logic remains inside isolated feature modules.
// FLOW: AppModule -> Config/TypeORM/Pino -> auth/tenancy/cache/observability infrastructure.
import { Global, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, type JwtSignOptions } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SUPERADMIN_CORE_PROVIDERS } from '@/backend_superadmin/superadmin_core/superadmin-core.providers';
import { SuperadminCoreMetricsController } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-metrics.controller';
import { SuperadminCoreRequestContextMiddleware } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-request-context.middleware';
import { SuperadminCoreResponseInterceptor } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-response.interceptor';
import { SuperadminCoreValidationExceptionFilter } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-validation.exception-filter';
import { SuperadminCoreDomainExceptionFilter } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-domain.exception-filter';
import configuration, { validateEnvironment } from '@/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-configuration';
import { SuperadminCoreI18nModule } from '@/backend_superadmin/superadmin_core/superadmin_core_i18n/superadmin-core-i18n.module';
import { SuperadminCoreRealtimeModule } from '@/backend_superadmin/superadmin_core/superadmin_core_realtime/superadmin-core-realtime.module';
/**
 * Primary Intent: Defines SuperadminCoreModule as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate: validateEnvironment }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        url: config.getOrThrow<string>('app.databaseUrl'),
        autoLoadEntities: true,
        subscribers: [SuperadminCoreAuditTrailSubscriber],
        synchronize: false,
        migrationsRun: false,
        extra: {
          max: config.getOrThrow<number>('app.databasePoolMax'),
          connectionTimeoutMillis: config.getOrThrow<number>('app.databaseAcquireTimeoutMs'),
          idleTimeoutMillis: config.getOrThrow<number>('app.databaseIdleTimeoutMs'),
          statement_timeout: config.getOrThrow<number>('app.databaseStatementTimeoutMs'),
        },
      }),
    }),
    SuperadminCoreI18nModule, SuperadminCoreRealtimeModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ pinoHttp: { level: config.getOrThrow<string>('app.logLevel') } }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('app.jwtAccessSecret'),
        signOptions: { expiresIn: config.getOrThrow<string>('app.jwtAccessTtl') as JwtSignOptions['expiresIn'] },
      }),
    }),
  ],
  controllers: [SuperadminCoreMetricsController],
  providers: SUPERADMIN_CORE_PROVIDERS,
  exports: [
    JwtModule, SuperadminCoreRedisService, SuperadminCoreIdempotencyService, SuperadminCoreIdempotencyInterceptor, SuperadminCoreRateLimitGuard, SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard, SuperadminCoreTenantAuthorizationRepository, SuperadminCoreTenantAuthorizationService, SuperadminCoreTenantDatasourceResolverService, SuperadminCoreTenantDatabaseProvisionerService,
    SuperadminCoreTenantRegistryRepository, SuperadminCoreTenantRegistryService, SuperadminCoreEncryptionService, SuperadminCoreMetricsService, SuperadminCoreAuditTrailService, SuperadminCoreEventBusService, SuperadminCoreCircuitBreakerService, SuperadminCoreTransactionContext, SuperadminCoreUnitOfWorkService, SuperadminCoreDistributedJobQueueService, SuperadminCoreScheduledJobRegistryService, SuperadminCoreFeatureFlagService, SuperadminCoreAuditTrailSubscriber,
  ],
})
/**
 * Primary Intent: Defines SuperadminCoreModule, the focused backend component for its owning feature or infrastructure boundary.
 * Edge Cases: Preserve validation/tenant/transaction/authorization invariants. Side-Effects: Only documented effects are permitted.
 * AI-Note: Keep this class isolated, dependency-injected, explicitly typed, and aligned with the frozen contract.
 */
export class SuperadminCoreModule implements NestModule {
  /**
 * Primary Intent: Executes the configure use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  configure(consumer: MiddlewareConsumer): void { consumer.apply(SuperadminCoreRequestContextMiddleware).forRoutes('*'); }
}
