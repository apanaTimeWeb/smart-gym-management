// RESPONSIBILITY: Owns backend core NestJS module registration boundary.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerModule } from 'nestjs-pino';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import { ManagerCoreJwtGuard } from '@/backend_manager/manager_core/manager_core_auth/manager-core-jwt.guard';
import { ManagerCoreRolesGuard } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.guard';
import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreEnvSchema } from '@/backend_manager/manager_core/manager_core_config/manager-core-env.schema';
import { ManagerCoreRequestContextMiddleware } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.middleware';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreRedisService } from '@/backend_manager/manager_core/manager_core_database/manager-core-redis.service';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreImmutableEventLogRepository } from '@/backend_manager/manager_core/manager_core_events/manager-core-immutable-event-log.repository';
import { ManagerCoreHealthController } from '@/backend_manager/manager_core/manager_core_health/manager-core-health.controller';
import { ManagerCoreInputSanitizationPipe } from '@/backend_manager/manager_core/manager_core_http/manager-core-input-sanitization.pipe';
import { ManagerCorePayloadLimitMiddleware } from '@/backend_manager/manager_core/manager_core_http/manager-core-payload-limit.middleware';
import { ManagerCoreExceptionFilter } from '@/backend_manager/manager_core/manager_core_http/manager-core-exception.filter';
import { ManagerCoreResponseInterceptor } from '@/backend_manager/manager_core/manager_core_http/manager-core-response.interceptor';
import { ManagerCoreValidationExceptionFilter } from '@/backend_manager/manager_core/manager_core_http/manager-core-validation.exception.filter';
import { ManagerCoreIdempotencyInterceptor } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-idempotency.interceptor';
import { ManagerCoreIdempotencyService } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-idempotency.service';
import { ManagerCoreLoggerConfig } from '@/backend_manager/manager_core/manager_core_observability/manager-core-logger.config';
import { ManagerCoreMetricsController } from '@/backend_manager/manager_core/manager_core_observability/manager-core-metrics.controller';
import { ManagerCoreMetricsInterceptor } from '@/backend_manager/manager_core/manager_core_observability/manager-core-metrics.interceptor';
import { ManagerCoreMetricsService } from '@/backend_manager/manager_core/manager_core_observability/manager-core-metrics.service';
import { ManagerCoreEncryptionService } from '@/backend_manager/manager_core/manager_core_security/manager-core-encryption.service';
import { ManagerCoreRateLimitGuard } from '@/backend_manager/manager_core/manager_core_security/manager-core-rate-limit.guard';
import { ManagerCoreTenantAuthorizationService } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-tenant-authorization.service';
import { ManagerCoreResourceAuthorizationGuard } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.guard';
import { ManagerCoreTenantProvisioningService } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-tenant-provisioning.service';
import { ManagerCoreTenantGuard } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-tenant.guard';
import { MasterTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-tenant.entity';
import { MasterUserTenantEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-user-tenant.entity';
import { MasterUserEntity } from '@/backend_manager/manager_core/manager_core_tenant/manager-core-master-user.entity';
import { ManagerCoreFeatureFlagEntity } from '@/backend_manager/manager_core/manager_core_config/manager-core-feature-flag.entity';
import { ManagerCoreFeatureFlagService } from '@/backend_manager/manager_core/manager_core_config/manager-core-feature-flag.service';
import { ManagerCoreI18nService } from '@/backend_manager/manager_core/manager_core_config/manager-core-i18n.service';
import { ManagerCoreRagController } from '@/backend_manager/manager_core/manager_core_ai/manager-core-rag.controller';
import { ManagerCoreMcpController } from '@/backend_manager/manager_core/manager_core_ai/manager-core-mcp.controller';

import { ManagerCoreModule } from '@/backend_manager/manager_core/manager-core.module';
import { BackendManagerModule } from '@/backend_manager/backend-manager.module';

@Global()
@Module({
  imports: [

    ManagerCoreModule,
    BackendManagerModule,
  ],
  controllers: [ManagerCoreHealthController, ManagerCoreMetricsController, ManagerCoreRagController, ManagerCoreMcpController],
  providers: [
    ManagerCoreFeatureFlagService,
    ManagerCoreI18nService,
    { provide: APP_PIPE, useClass: ManagerCoreInputSanitizationPipe },
    { provide: APP_FILTER, useClass: ManagerCoreValidationExceptionFilter },
    { provide: APP_FILTER, useClass: ManagerCoreExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ManagerCoreResponseInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ManagerCoreIdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ManagerCoreMetricsInterceptor },
    { provide: APP_GUARD, useClass: ManagerCoreJwtGuard },
    { provide: APP_GUARD, useClass: ManagerCoreTenantGuard },
    { provide: APP_GUARD, useClass: ManagerCoreResourceAuthorizationGuard },
    { provide: APP_GUARD, useClass: ManagerCoreRolesGuard },
    { provide: APP_GUARD, useClass: ManagerCoreRateLimitGuard },
  ],

})
export class ManagerCoreAppModule implements NestModule {
  /** @description Installs request-context middleware at the application boundary. @param consumer - Nest middleware consumer. @returns Nothing. */
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ManagerCorePayloadLimitMiddleware, ManagerCoreRequestContextMiddleware).forRoutes('*');
  }
}
