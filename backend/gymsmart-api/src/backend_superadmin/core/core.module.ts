// RESPONSIBILITY: Registers shared framework-level infrastructure only; no business logic lives here.
// FLOW: AppModule -> CoreModule -> config/auth/redis/observability/tenancy infrastructure.
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import configuration, { validateEnvironment } from '@/backend_superadmin/core/config/configuration';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MasterDataSource } from '@/backend_superadmin/core/database/master-data-source';
import { RedisService } from '@/backend_superadmin/core/cache/redis.service';
import { IdempotencyService } from '@/backend_superadmin/core/cache/idempotency.service';
import { IdempotencyInterceptor } from '@/backend_superadmin/core/cache/idempotency.interceptor';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { TenantAuthorizationService } from '@/backend_superadmin/core/tenancy/tenant-authorization.service';
import { TenantDataSourceResolverService } from '@/backend_superadmin/core/tenancy/tenant-datasource-resolver.service';
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

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [configuration], validate: validateEnvironment }), LoggerModule.forRoot({ pinoHttp: { level: process.env.LOG_LEVEL ?? 'info', redact: ['req.headers.authorization', 'req.headers.cookie'] } }), TypeOrmModule.forRoot(MasterDataSource.options), JwtModule.registerAsync({ inject: [ConfigService], useFactory: (config: ConfigService) => ({ secret: config.getOrThrow<string>('app.jwtAccessSecret'), signOptions: { expiresIn: config.getOrThrow<string>('app.jwtAccessTtl') } }) })],
  controllers: [MetricsController],
  providers: [
    RedisService, IdempotencyService, IdempotencyInterceptor, JwtAuthGuard, RolesGuard,
    { provide: APP_GUARD, useExisting: RateLimitGuard },
    RateLimitGuard, TenantAuthorizationService, TenantDataSourceResolverService, TenantDatabaseProvisionerService, TenantRegistryRepository, TenantRegistryService, EncryptionService, MetricsService, AuditTrailService, EventBusService, TransactionContext, UnitOfWorkService],
  exports: [RedisService, IdempotencyService, IdempotencyInterceptor, RateLimitGuard, JwtAuthGuard, RolesGuard, TenantAuthorizationService, TenantDataSourceResolverService, TenantDatabaseProvisionerService, TenantRegistryRepository, TenantRegistryService, EncryptionService, MetricsService, AuditTrailService, EventBusService, TransactionContext, UnitOfWorkService],
})
export class CoreModule implements NestModule {
  /** Registers AsyncLocalStorage request context at the HTTP boundary. */
  configure(consumer: MiddlewareConsumer): void { consumer.apply(RequestContextMiddleware).forRoutes('*'); }
}
