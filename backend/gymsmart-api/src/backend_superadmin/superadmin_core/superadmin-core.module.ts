// RESPONSIBILITY: Registers global framework infrastructure only; business logic remains inside isolated feature modules.
// FLOW: AppModule -> Config/TypeORM/Pino -> auth/tenancy/cache/observability infrastructure.
import { Global, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SuperadminRedisService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-redis.service';
import { SuperadminIdempotencyService } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.service';
import { SuperadminIdempotencyInterceptor } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.interceptor';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { SuperadminTenantAuthorizationService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-authorization.service';
import { SuperadminTenantAuthorizationRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-authorization.repository';
import { SuperadminTenantDatasourceResolverService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-datasource-resolver.service';
import { SuperadminTenantDatabaseProvisionerService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-database-provisioner.service';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';
import { SuperadminTenantRegistryService } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.service';
import { SuperadminEncryptionService } from '@/backend_superadmin/superadmin_core/security/superadmin-core-encryption.service';
import { SuperadminMetricsService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-metrics.service';
import { SuperadminMetricsController } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-metrics.controller';
import { SuperadminAuditTrailService } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-audit-trail.service';
import { SuperadminRequestContextMiddleware } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-request-context.middleware';
import { SuperadminEventBusService } from '@/backend_superadmin/superadmin_core/events/superadmin-core-event-bus.service';
import { SuperadminTransactionContext } from '@/backend_superadmin/superadmin_core/database/superadmin-core-transaction-context';
import { SuperadminUnitOfWorkService } from '@/backend_superadmin/superadmin_core/database/superadmin-core-unit-of-work.service';
import { SuperadminDistributedJobQueueService } from '@/backend_superadmin/superadmin_core/jobs/superadmin-core-distributed-job-queue.service';
import { SuperadminScheduledJobRegistryService } from '@/backend_superadmin/superadmin_core/jobs/superadmin-core-scheduled-job-registry.service';
import { SuperadminAuditTrailSubscriber } from '@/backend_superadmin/superadmin_core/observability/superadmin-core-audit-trail.subscriber';
import { SuperadminResponseInterceptor } from '@/backend_superadmin/superadmin_core/http/superadmin-core-response.interceptor';
import { SuperadminValidationExceptionFilter } from '@/backend_superadmin/superadmin_core/http/superadmin-core-validation.exception-filter';
import { SuperadminDomainExceptionFilter } from '@/backend_superadmin/superadmin_core/http/superadmin-core-domain.exception-filter';
import configuration, { validateEnvironment } from '@/backend_superadmin/superadmin_core/config/superadmin-core-configuration';
import { SuperadminFeatureFlagService } from '@/backend_superadmin/superadmin_core/feature-flags/superadmin-core-feature-flag.service';
import { SuperadminBackendSuperadminI18nModule } from '@/backend_superadmin/superadmin_core/i18n/superadmin-core-i18n.module';
import { SuperadminRealtimeModule } from '@/backend_superadmin/superadmin_core/realtime/superadmin-core-realtime.module';
import { SuperadminCircuitBreakerService } from '@/backend_superadmin/superadmin_core/external/superadmin-core-circuit-breaker.service';
import { SuperadminRequestSanitizationPipe } from '@/backend_superadmin/superadmin_core/security/superadmin-core-request-sanitization.pipe';

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
        subscribers: [SuperadminAuditTrailSubscriber],
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
    SuperadminBackendSuperadminI18nModule, SuperadminRealtimeModule,
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({ pinoHttp: { level: config.getOrThrow<string>('app.logLevel') } }),
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('app.jwtAccessSecret'),
        signOptions: { expiresIn: config.getOrThrow<string>('app.jwtAccessTtl') as any },
      }),
    }),
  ],
  controllers: [SuperadminMetricsController],
  providers: [
    SuperadminRedisService, SuperadminCircuitBreakerService, SuperadminRequestSanitizationPipe, SuperadminIdempotencyService, SuperadminIdempotencyInterceptor, SuperadminRateLimitGuard,
    SuperadminJwtAuthGuard, SuperadminRolesGuard, SuperadminTenantAuthorizationRepository, SuperadminTenantAuthorizationService, SuperadminTenantDatasourceResolverService,
    SuperadminTenantDatabaseProvisionerService, SuperadminTenantRegistryRepository, SuperadminTenantRegistryService, SuperadminEncryptionService,
    SuperadminMetricsService, SuperadminAuditTrailService, SuperadminAuditTrailSubscriber, SuperadminEventBusService, SuperadminTransactionContext, SuperadminUnitOfWorkService, SuperadminDistributedJobQueueService, SuperadminScheduledJobRegistryService, SuperadminFeatureFlagService,
    { provide: APP_GUARD, useExisting: SuperadminJwtAuthGuard },
    { provide: APP_GUARD, useExisting: SuperadminRateLimitGuard },
    { provide: APP_INTERCEPTOR, useExisting: SuperadminIdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: SuperadminResponseInterceptor },
    { provide: APP_PIPE, useClass: SuperadminRequestSanitizationPipe },
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true, stopAtFirstError: false }) },
    { provide: APP_FILTER, useClass: SuperadminDomainExceptionFilter },
    { provide: APP_FILTER, useClass: SuperadminValidationExceptionFilter },
  ],
  exports: [
    JwtModule, SuperadminRedisService, SuperadminIdempotencyService, SuperadminIdempotencyInterceptor, SuperadminRateLimitGuard, SuperadminJwtAuthGuard,
    SuperadminRolesGuard, SuperadminTenantAuthorizationRepository, SuperadminTenantAuthorizationService, SuperadminTenantDatasourceResolverService, SuperadminTenantDatabaseProvisionerService,
    SuperadminTenantRegistryRepository, SuperadminTenantRegistryService, SuperadminEncryptionService, SuperadminMetricsService, SuperadminAuditTrailService,
    SuperadminEventBusService, SuperadminCircuitBreakerService, SuperadminTransactionContext, SuperadminUnitOfWorkService, SuperadminDistributedJobQueueService, SuperadminScheduledJobRegistryService, SuperadminFeatureFlagService, SuperadminAuditTrailSubscriber,
  ],
})
export class SuperadminCoreModule implements NestModule {
  /** Registers AsyncLocalStorage request context at the HTTP boundary. */
  configure(consumer: MiddlewareConsumer): void { consumer.apply(SuperadminRequestContextMiddleware).forRoutes('*'); }
}