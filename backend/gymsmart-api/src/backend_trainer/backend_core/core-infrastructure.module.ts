// RESPONSIBILITY: Registers framework-only infrastructure and shared runtime providers for the Trainer modular monolith.
// FLOW: Nest root → CoreInfrastructureModule → master DB/request context/tenant resolver/security/observability.

import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreEncryptionService } from '@/backend_trainer/backend_core/core_security/core-encryption.service';
import { CoreSanitizationService } from '@/backend_trainer/backend_core/core_security/core-sanitization.service';
import { CoreMasterModule } from '@/backend_trainer/backend_core/core_database/core-master.module';
import { CoreTenantDataSourceManager } from '@/backend_trainer/backend_core/core_database/core-tenant-data-source.manager';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTenantMembershipAuthorizationRepository } from '@/backend_trainer/backend_core/core_database/core-tenant-membership-authorization.repository';
import { CoreMasterUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-master-unit-of-work.service';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreImmutableDomainEventRepository } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.repository';
import { CoreImmutableDomainEventService } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.service';
import { CoreAuditRepository } from '@/backend_trainer/backend_core/core_audit/core-audit.repository';
import { CoreRedisService } from '@/backend_trainer/backend_core/core_redis/core-redis.service';
import { CoreMetricsService } from '@/backend_trainer/backend_core/core_observability/core-metrics.service';
import { CoreJwtService } from '@/backend_trainer/backend_core/core_security/core-jwt.service';
import { CoreAuthService } from '@/backend_trainer/backend_core/core_security/core-auth.service';
import { CoreAuthController } from '@/backend_trainer/backend_core/core_security/core-auth.controller';
import { CoreIdempotencyCacheService } from '@/backend_trainer/backend_core/core_security/core-idempotency-cache.service';
import { CoreHealthController } from '@/backend_trainer/backend_core/core_health/core-health.controller';
import { CoreMetricsController } from '@/backend_trainer/backend_core/core_observability/core-metrics.controller';
import { CoreLoggerModule } from '@/backend_trainer/backend_core/core_observability/core-logger.module';
import { CoreRequestContextMiddleware } from '@/backend_trainer/backend_core/core_middleware/core-request-context.middleware';
import { CoreTracingMiddleware } from '@/backend_trainer/backend_core/core_observability/core-tracing.middleware';
import { CoreTenantProvisioningService } from '@/backend_trainer/backend_core/core_database/core-tenant-provisioning.service';


/**
 * Intent: Defines the CoreInfrastructureModule boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Global()
@Module({
  imports: [
    CoreMasterModule,
    CoreLoggerModule,
    JwtModule.registerAsync({
      inject: [CoreConfigService],
      useFactory: (config: CoreConfigService) => ({ secret: config.getJwt().secret, signOptions: { issuer: config.getJwt().issuer, audience: config.getJwt().audience, expiresIn: '15m' } }),
    }),
  ],
  providers: [
    CoreConfigService,
    CoreEncryptionService,
    CoreSanitizationService,
    CoreTenantDataSourceManager,
    CoreTenantDatasourceResolver,
    CoreTenantMembershipAuthorizationRepository,
    CoreMasterUnitOfWorkService,
    CoreUnitOfWorkService,
    CoreAuditRepository,
    CoreAuditService,
    CoreImmutableDomainEventRepository,
    CoreImmutableDomainEventService,
    CoreRedisService,
    CoreMetricsService,
    CoreJwtService,
    CoreAuthService,
    CoreIdempotencyCacheService,
    CoreTenantProvisioningService,
  ],
  controllers: [CoreAuthController, CoreHealthController, CoreMetricsController],
  exports: [
    CoreMasterModule,
    CoreConfigService,
    CoreEncryptionService,
    CoreSanitizationService,
    CoreTenantDataSourceManager,
    CoreTenantDatasourceResolver,
    CoreTenantMembershipAuthorizationRepository,
    CoreMasterUnitOfWorkService,
    CoreUnitOfWorkService,
    CoreAuditRepository,
    CoreAuditService,
    CoreImmutableDomainEventRepository,
    CoreImmutableDomainEventService,
    CoreRedisService,
    CoreMetricsService,
    CoreJwtService,
    CoreIdempotencyCacheService,
    CoreLoggerModule,
  ],
})
export class CoreInfrastructureModule implements NestModule {
  /** Applies request-context middleware before global authentication and tenant authorization. */
  configure(consumer: MiddlewareConsumer): void { consumer.apply(CoreRequestContextMiddleware, CoreTracingMiddleware).forRoutes('*'); }
}
