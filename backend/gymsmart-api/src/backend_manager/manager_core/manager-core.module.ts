// RESPONSIBILITY: Registers Manager-only framework infrastructure and exports only infrastructure contracts.
// FLOW: Manager domain module -> Manager core providers -> isolated feature modules.
import { Global, Module } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreTenantDataSourceManager } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-data-source.manager';
import { ManagerCoreTenantDatasourceService } from '@/backend_manager/manager_core/manager_core_database/manager-core-tenant-datasource.service';
import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreImmutableEventLogRepository } from '@/backend_manager/manager_core/manager_core_events/manager-core-immutable-event-log.repository';
import { ManagerCoreRequestContextService } from '@/backend_manager/manager_core/manager_core_context/manager-core-request-context.service';
import { ManagerCoreRedisService } from '@/backend_manager/manager_core/manager_core_database/manager-core-redis.service';
import { MANAGER_CORE_REDIS_PORT } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-redis.port';
import { ManagerCoreEncryptionService } from '@/backend_manager/manager_core/manager_core_security/manager-core-encryption.service';
import { ManagerCoreResourceAuthorizationRegistry } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-resource-authorization.registry';
import { ManagerCoreCircuitBreakerService } from '@/backend_manager/manager_core/manager_core_infrastructure/manager-core-circuit-breaker.service';
import { ManagerCoreMemberCreationRegistry } from '@/backend_manager/manager_core/manager-core-member-creation.registry';

@Global()
@Module({
  providers: [
    ManagerCoreConfigService,
    ManagerCoreTenantDataSourceManager,
    ManagerCoreTenantDatasourceService,
    ManagerCoreUnitOfWorkService,
    ManagerCoreAuditLogRepository,
    ManagerCoreEventService,
    ManagerCoreImmutableEventLogRepository,
    ManagerCoreRequestContextService,
    ManagerCoreRedisService,
    ManagerCoreEncryptionService,
    ManagerCoreResourceAuthorizationRegistry,
    ManagerCoreCircuitBreakerService,
    ManagerCoreMemberCreationRegistry,
  ],
  exports: [ManagerCoreConfigService, ManagerCoreTenantDataSourceManager, ManagerCoreTenantDatasourceService, ManagerCoreUnitOfWorkService, ManagerCoreAuditLogRepository, ManagerCoreEventService,
    ManagerCoreImmutableEventLogRepository, ManagerCoreRequestContextService, ManagerCoreRedisService, ManagerCoreEncryptionService, ManagerCoreResourceAuthorizationRegistry, ManagerCoreCircuitBreakerService, ManagerCoreMemberCreationRegistry],
})
export class ManagerCoreModule {}
