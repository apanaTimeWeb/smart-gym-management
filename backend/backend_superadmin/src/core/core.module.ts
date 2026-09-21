// RESPONSIBILITY: Registers shared framework-level infrastructure only; no business logic lives here.
// FLOW: AppModule -> CoreModule -> config/auth/redis/observability/tenancy infrastructure.
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import configuration, { validateEnvironment } from '@/core/config/configuration';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MasterDataSource } from '@/core/database/master-data-source';
import { RedisService } from '@/core/cache/redis.service';
import { IdempotencyService } from '@/core/cache/idempotency.service';
import { IdempotencyInterceptor } from '@/core/cache/idempotency.interceptor';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { TenantAuthorizationService } from '@/core/tenancy/tenant-authorization.service';
import { TenantDataSourceResolverService } from '@/core/tenancy/tenant-datasource-resolver.service';
import { TenantDatabaseProvisionerService } from '@/core/tenancy/tenant-database-provisioner.service';
import { TenantRegistryRepository } from '@/core/tenancy/tenant-registry.repository';
import { TenantRegistryService } from '@/core/tenancy/tenant-registry.service';
import { EncryptionService } from '@/core/security/encryption.service';
import { MetricsService } from '@/core/observability/metrics.service';
import { MetricsController } from '@/core/observability/metrics.controller';
import { AuditTrailService } from '@/core/observability/audit-trail.service';
import { RequestContextMiddleware } from '@/core/observability/request-context.middleware';
import { EventBusService } from '@/core/events/event-bus.service';
import { TransactionContext } from '@/core/database/transaction-context';
import { UnitOfWorkService } from '@/core/database/unit-of-work.service';

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
