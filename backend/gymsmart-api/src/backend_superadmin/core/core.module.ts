// RESPONSIBILITY: Registers global framework infrastructure only; business logic remains inside isolated feature modules.
// FLOW: AppModule -> Config/TypeORM/Pino -> auth/tenancy/cache/observability infrastructure.
import { Global, MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { IdempotencyService } from '@/backend_superadmin/core/cache/idempotency.service';
import { IdempotencyInterceptor } from '@/backend_superadmin/core/cache/idempotency.interceptor';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { TenantAuthorizationService } from '@/backend_superadmin/core/tenancy/tenant-authorization.service';
import { TenantAuthorizationRepository } from '@/backend_superadmin/core/tenancy/tenant-authorization.repository';
import { TenantDatasourceResolverService } from '@/backend_superadmin/core/tenancy/tenant-datasource-resolver.service';
import { TenantDatabaseProvisionerService } from '@/backend_superadmin/core/tenancy/tenant-database-provisioner.service';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';
import { TenantRegistryService } from '@/backend_superadmin/core/tenancy/tenant-registry.service';
import { EncryptionService } from '@/backend_superadmin/core/security/encryption.service';
import { MetricsService } from '@/backend_superadmin/core/observability/metrics.service';
import { MetricsController } from '@/backend_superadmin/core/observability/metrics.controller';
import { AuditTrailService } from '@/backend_superadmin/core/observability/audit-trail.service';
import { RequestContextMiddleware } from '@/backend_superadmin/core/observability/request-context.middleware';
import { EventBusService } from '@/backend_superadmin/core/events/event-bus.service';
import { TransactionContext } from '@/backend_superadmin/core/database/transaction-context';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';
import { DistributedJobQueueService } from '@/backend_superadmin/core/jobs/distributed-job-queue.service';
import { ScheduledJobRegistryService } from '@/backend_superadmin/core/jobs/scheduled-job-registry.service';
import { AuditTrailSubscriber } from '@/backend_superadmin/core/observability/audit-trail.subscriber';
import { ResponseInterceptor } from '@/backend_superadmin/core/http/response.interceptor';
import { ValidationExceptionFilter } from '@/backend_superadmin/core/http/validation.exception-filter';
import { DomainExceptionFilter } from '@/backend_superadmin/core/http/domain.exception-filter';
import configuration, { validateEnvironment } from '@/backend_superadmin/core/config/configuration';
import { FeatureFlagService } from '@/backend_superadmin/core/feature-flags/feature-flag.service';
import { BackendSuperadminI18nModule } from '@/backend_superadmin/core/i18n/i18n.module';
import { RealtimeModule } from '@/backend_superadmin/core/realtime/realtime.module';
import { CircuitBreakerService } from '@/backend_superadmin/core/external/circuit-breaker.service';
import { RequestSanitizationPipe } from '@/backend_superadmin/core/security/request-sanitization.pipe';

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
        subscribers: [AuditTrailSubscriber],
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
    BackendSuperadminI18nModule, RealtimeModule,
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
  controllers: [MetricsController],
  providers: [
    RedisService, CircuitBreakerService, RequestSanitizationPipe, IdempotencyService, IdempotencyInterceptor, RateLimitGuard,
    JwtAuthGuard, RolesGuard, TenantAuthorizationRepository, TenantAuthorizationService, TenantDatasourceResolverService,
    TenantDatabaseProvisionerService, TenantRegistryRepository, TenantRegistryService, EncryptionService,
    MetricsService, AuditTrailService, AuditTrailSubscriber, EventBusService, TransactionContext, UnitOfWorkService, DistributedJobQueueService, ScheduledJobRegistryService, FeatureFlagService,
    { provide: APP_GUARD, useExisting: JwtAuthGuard },
    { provide: APP_GUARD, useExisting: RateLimitGuard },
    { provide: APP_INTERCEPTOR, useExisting: IdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_PIPE, useClass: RequestSanitizationPipe },
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true, stopAtFirstError: false }) },
    { provide: APP_FILTER, useClass: DomainExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
  ],
  exports: [
    JwtModule, RedisService, IdempotencyService, IdempotencyInterceptor, RateLimitGuard, JwtAuthGuard,
    RolesGuard, TenantAuthorizationRepository, TenantAuthorizationService, TenantDatasourceResolverService, TenantDatabaseProvisionerService,
    TenantRegistryRepository, TenantRegistryService, EncryptionService, MetricsService, AuditTrailService,
    EventBusService, CircuitBreakerService, TransactionContext, UnitOfWorkService, DistributedJobQueueService, ScheduledJobRegistryService, FeatureFlagService, AuditTrailSubscriber,
  ],
})
export class CoreModule implements NestModule {
  /** Registers AsyncLocalStorage request context at the HTTP boundary. */
  configure(consumer: MiddlewareConsumer): void { consumer.apply(RequestContextMiddleware).forRoutes('*'); }
}