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
import { SuperadminCoreRedisService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-redis.service';
import { SuperadminCoreIdempotencyService } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.service';
import { SuperadminCoreIdempotencyInterceptor } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.interceptor';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { SuperadminCoreTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.service';
import { SuperadminCoreTenantAuthorizationRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-authorization.repository';
import { SuperadminCoreTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminCoreTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminCoreTenantRegistryService } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.service';
import { SuperadminCoreEncryptionService } from '@/backend_superadmin/superadmin_core/superadmin_core_security/superadmin-core-encryption.service';
import { SuperadminCoreMetricsService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-metrics.service';
import { SuperadminCoreAuditTrailService } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-audit-trail.service';
import { SuperadminCoreEventBusService } from '@/backend_superadmin/superadmin_core/superadmin_core_events/superadmin-core-event-bus.service';
import { SuperadminCoreTransactionContext } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-transaction-context';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';
import { SuperadminCoreDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-distributed-job-queue.service';
import { SuperadminCoreScheduledJobRegistryService } from '@/backend_superadmin/superadmin_core/superadmin_core_jobs/superadmin-core-scheduled-job-registry.service';
import { SuperadminCoreAuditTrailSubscriber } from '@/backend_superadmin/superadmin_core/superadmin_core_observability/superadmin-core-audit-trail.subscriber';
import { SuperadminCoreFeatureFlagService } from '@/backend_superadmin/superadmin_core/superadmin_core_feature_flags/superadmin-core-feature-flag.service';
import { SuperadminCoreCircuitBreakerService } from '@/backend_superadmin/superadmin_core/superadmin_core_external/superadmin-core-circuit-breaker.service';
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
