// RESPONSIBILITY: Owns backend core NestJS module registration boundary.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreJwtGuard } from '@/backend_manager/core/auth/core-jwt.guard';
import { CoreRolesGuard } from '@/backend_manager/core/auth/core-roles.guard';
import { CoreConfigService } from '@/backend_manager/core/config/core-config.service';
import { CoreEnvSchema } from '@/backend_manager/core/config/core-env.schema';
import { CoreRequestContextMiddleware } from '@/backend_manager/core/context/core-request-context.middleware';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreHealthController } from '@/backend_manager/core/health/core-health.controller';
import { CoreExceptionFilter } from '@/backend_manager/core/http/core-exception.filter';
import { CoreResponseInterceptor } from '@/backend_manager/core/http/core-response.interceptor';
import { CoreValidationExceptionFilter } from '@/backend_manager/core/http/core-validation.exception.filter';
import { CoreIdempotencyInterceptor } from '@/backend_manager/core/idempotency/core-idempotency.interceptor';
import { CoreIdempotencyService } from '@/backend_manager/core/idempotency/core-idempotency.service';
import { CoreLoggerConfig } from '@/backend_manager/core/observability/core-logger.config';
import { CoreMetricsController } from '@/backend_manager/core/observability/core-metrics.controller';
import { CoreMetricsInterceptor } from '@/backend_manager/core/observability/core-metrics.interceptor';
import { CoreMetricsService } from '@/backend_manager/core/observability/core-metrics.service';
import { CoreEncryptionService } from '@/backend_manager/core/security/core-encryption.service';
import { CoreRateLimitGuard } from '@/backend_manager/core/security/core-rate-limit.guard';
import { CoreTenantAuthorizationService } from '@/backend_manager/core/tenant/core-tenant-authorization.service';
import { CoreTenantProvisioningService } from '@/backend_manager/core/tenant/core-tenant-provisioning.service';
import { CoreTenantGuard } from '@/backend_manager/core/tenant/core-tenant.guard';
import { MasterTenantEntity } from '@/backend_manager/core/tenant/master-tenant.entity';
import { MasterUserTenantEntity } from '@/backend_manager/core/tenant/master-user-tenant.entity';
import { MasterUserEntity } from '@/backend_manager/core/tenant/master-user.entity';

import { ManagerDomainModule } from '@/backend_manager/modules/backend_manager/manager-domain.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: (env: Record<string, unknown>) => CoreEnvSchema.parse(env) }),
    TypeOrmModule.forRootAsync({
      inject: [CoreConfigService],
      useFactory: (config: CoreConfigService) => ({
        type: 'postgres',
        url: config.masterDatabaseUrl,
        entities: [MasterTenantEntity, MasterUserEntity, MasterUserTenantEntity],
        synchronize: false,
      }),
    }),
    LoggerModule.forRoot(CoreLoggerConfig),
    ManagerDomainModule,
  ],
  controllers: [CoreHealthController, CoreMetricsController],
  providers: [
    CoreConfigService, CoreRequestContextService, CoreTenantAuthorizationService, CoreTenantDatasourceService,
    CoreTenantProvisioningService, CoreUnitOfWorkService, CoreAuditLogRepository, CoreEventService,
    CoreIdempotencyService, CoreRedisService, CoreMetricsService, CoreEncryptionService,
    { provide: APP_FILTER, useClass: CoreValidationExceptionFilter },
    { provide: APP_FILTER, useClass: CoreExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: CoreResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreIdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreMetricsInterceptor },
    { provide: APP_GUARD, useClass: CoreJwtGuard },
    { provide: APP_GUARD, useClass: CoreTenantGuard },
    { provide: APP_GUARD, useClass: CoreRolesGuard },
    { provide: APP_GUARD, useClass: CoreRateLimitGuard },
  ],
  exports: [
    CoreConfigService, CoreRequestContextService, CoreTenantAuthorizationService, CoreTenantDatasourceService,
    CoreTenantProvisioningService, CoreUnitOfWorkService, CoreAuditLogRepository, CoreEventService, CoreIdempotencyService,
    CoreRedisService, CoreMetricsService, CoreEncryptionService,
  ],
})
export class CoreAppModule implements NestModule {
  /** @description Installs request-context middleware at the application boundary. @param consumer - Nest middleware consumer. @returns Nothing. */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(CoreRequestContextMiddleware).forRoutes('*');
  }
}
