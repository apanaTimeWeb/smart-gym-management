// RESPONSIBILITY: Registers application-wide guards, interceptors, filters, core services, and platform controllers.
// FLOW: AdminCoreConfigModule -> core providers -> global HTTP pipeline -> isolated feature modules.
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AdminCoreAccessLogInterceptor } from '@/backend_admin/admin_core/admin_core_observability/admin-core-access-log.interceptor.js';
import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuthController } from '@/backend_admin/admin_core/admin_core_auth/admin-core-auth.controller.js';
import { AdminCoreAuthService } from '@/backend_admin/admin_core/admin_core_auth/admin-core-auth.service.js';
import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard.js';
import { AdminCoreMasterAdminRepository } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin-repository.js';
import { AdminCoreRateLimitGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-rate-limit.guard.js';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard.js';
import { AdminCoreConfigModule } from '@/backend_admin/admin_core/admin_core_config/admin-core-config.module.js';
import { AdminCoreFeatureFlagService } from '@/backend_admin/admin_core/admin_core_config/admin-core-feature-flag.service.js';
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';
import { AdminCoreTenantContextInterceptor } from '@/backend_admin/admin_core/admin_core_context/admin-core-tenant-context.interceptor.js';
import { AdminCoreMasterUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-master-unit-of-work.service.js';
import { AdminCoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager.js';
import { AdminCoreTenantUnitOfWorkService } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-unit-of-work.service.js';
import { AdminCoreTransactionInterceptor } from '@/backend_admin/admin_core/admin_core_database/admin-core-transaction.interceptor.js';
import { AdminCoreEventBusService } from '@/backend_admin/admin_core/admin_core_events/admin-core-event-bus.service.js';
import { AdminCoreHealthController } from '@/backend_admin/admin_core/admin_core_health/admin-core-health.controller.js';
import { AdminCoreIdempotencyInterceptor } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-idempotency.interceptor.js';
import { AdminCoreIdempotencyService } from '@/backend_admin/admin_core/admin_core_idempotency/admin-core-idempotency.service.js';
import { AdminCoreJobQueueService } from '@/backend_admin/admin_core/admin_core_jobs/admin-core-job-queue.service.js';
import { AdminCoreMetricsController } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.controller.js';
import { AdminCoreMetricsInterceptor } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.interceptor.js';
import { AdminCoreMetricsService } from '@/backend_admin/admin_core/admin_core_metrics/admin-core-metrics.service.js';
import { AdminCoreRealtimePublisherService } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-publisher.service.js';
import { AdminCoreRealtimeReplayController } from '@/backend_admin/admin_core/admin_core_realtime/admin-core-realtime-replay.controller.js';
import { AdminCoreRedisService } from '@/backend_admin/admin_core/admin_core_redis/admin-core-redis.service.js';
import { AdminCoreResponseInterceptor } from '@/backend_admin/admin_core/admin_core_response/admin-core-response.interceptor.js';
import { AdminCoreValidationExceptionFilter } from '@/backend_admin/admin_core/admin_core_response/admin-core-validation-exception.filter.js';
import { AdminCoreEncryptionService } from '@/backend_admin/admin_core/admin_core_security/admin-core-encryption.service.js';
import { AdminCoreObjectStorageService } from '@/backend_admin/admin_core/admin_core_storage/admin-core-object-storage.service.js';
import { AdminCoreMasterTenantLookupService } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-lookup.service.js';

const coreProviders = [
  AdminCoreRequestContextService,
  AdminCoreAccessLogInterceptor,
  AdminCoreMasterTenantLookupService,
  AdminCoreTenantDataSourceManager,
  AdminCoreTenantUnitOfWorkService,
  AdminCoreMasterUnitOfWorkService,
  AdminCoreRedisService,
  AdminCoreIdempotencyService,
  AdminCoreAuditTrailService,
  AdminCoreEventBusService,
  AdminCoreEncryptionService,
  AdminCoreFeatureFlagService,
  AdminCoreObjectStorageService,
  AdminCoreAuthService,
  AdminCoreMasterAdminRepository,
  AdminCoreJwtAuthGuard,
  AdminCoreRolesGuard,
  AdminCoreRateLimitGuard,
  AdminCoreMetricsService,
  AdminCoreJobQueueService,
  AdminCoreRealtimePublisherService,
];

const coreExports = [...coreProviders];

@Global()
@Module({
  imports: [AdminCoreConfigModule],
  controllers: [AdminCoreAuthController, AdminCoreHealthController, AdminCoreMetricsController, AdminCoreRealtimeReplayController],
  providers: [
    ...coreProviders,
    { provide: APP_GUARD, useExisting: AdminCoreJwtAuthGuard },
    { provide: APP_GUARD, useExisting: AdminCoreRateLimitGuard },
    { provide: APP_GUARD, useExisting: AdminCoreRolesGuard },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreTenantContextInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreAccessLogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreIdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreTransactionInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreMetricsInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreResponseInterceptor },
    { provide: APP_FILTER, useClass: AdminCoreValidationExceptionFilter },
  ],
  exports: coreExports,
})
/**
 * @description Defines the AdminCoreInfrastructureModule boundary for the admin-core-infrastructure.module.ts backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreInfrastructureModule {}
