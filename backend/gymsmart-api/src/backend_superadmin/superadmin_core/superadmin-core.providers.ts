import { SuperadminAuthRepository } from '@/backend_superadmin/superadmin_modules/auth/superadmin-auth.repository';
// RESPONSIBILITY: Registers shared Superadmin framework infrastructure providers without business logic.
// FLOW: SuperadminCoreModule -> SUPERADMIN_CORE_PROVIDERS -> NestJS dependency injection.
import { ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SuperadminCoreResponseInterceptor } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-response.interceptor';
import { SuperadminCoreValidationExceptionFilter } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-validation.exception-filter';
import { SuperadminCoreDomainExceptionFilter } from '@/backend_superadmin/superadmin_core/superadmin_core_http/superadmin-core-domain.exception-filter';
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
import { SuperadminCoreRequestSanitizationPipe } from '@/backend_superadmin/superadmin_core/superadmin_core_security/superadmin-core-request-sanitization.pipe';

/**
 * Primary Intent: Centralizes only global framework/infrastructure providers required by the Superadmin modular monolith.
 * Edge Cases: Provider order and APP_* bindings must remain stable; business-feature providers must not be added here.
 * Side-Effects: Configures authentication, tenancy, cache, observability, event, job, transaction, and HTTP infrastructure.
 * AI-Note: Keep this file small and infrastructure-only; do not turn it into a shared business-logic dumping ground.
 */
export const SUPERADMIN_CORE_PROVIDERS = [
    SuperadminAuthRepository, SuperadminCoreRedisService, SuperadminCoreCircuitBreakerService, SuperadminCoreRequestSanitizationPipe, SuperadminCoreIdempotencyService, SuperadminCoreIdempotencyInterceptor, SuperadminCoreRateLimitGuard, SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard, SuperadminCoreTenantAuthorizationRepository, SuperadminCoreTenantAuthorizationService, SuperadminCoreTenantDatasourceResolverService, SuperadminCoreTenantDatabaseProvisionerService, SuperadminCoreTenantRegistryRepository, SuperadminCoreTenantRegistryService, SuperadminCoreEncryptionService, SuperadminCoreMetricsService,
    SuperadminCoreAuditTrailService, SuperadminCoreAuditTrailSubscriber, SuperadminCoreEventBusService, SuperadminCoreTransactionContext, SuperadminCoreUnitOfWorkService, SuperadminCoreDistributedJobQueueService, SuperadminCoreScheduledJobRegistryService, SuperadminCoreFeatureFlagService,
    { provide: APP_GUARD, useExisting: SuperadminCoreJwtAuthGuard },
    { provide: APP_GUARD, useExisting: SuperadminCoreRateLimitGuard },
    { provide: APP_INTERCEPTOR, useExisting: SuperadminCoreIdempotencyInterceptor },
    { provide: APP_INTERCEPTOR, useClass: SuperadminCoreResponseInterceptor },
    { provide: APP_PIPE, useClass: SuperadminCoreRequestSanitizationPipe },
    { provide: APP_PIPE, useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true, forbidUnknownValues: true, stopAtFirstError: false }) },
    { provide: APP_FILTER, useClass: SuperadminCoreDomainExceptionFilter },
    { provide: APP_FILTER, useClass: SuperadminCoreValidationExceptionFilter },
];

