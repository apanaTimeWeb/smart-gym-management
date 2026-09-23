import { Global, Module } from '@nestjs/common';
import { CoreTenantDatasourceService } from '@/backend_manager/core/database/core-tenant-datasource.service';
import { CoreUnitOfWorkService } from '@/backend_manager/core/database/core-unit-of-work.service';
import { CoreAuditLogRepository } from '@/backend_manager/core/audit/core-audit-log.repository';
import { CoreEventService } from '@/backend_manager/core/events/core-event.service';
import { CoreRequestContextService } from '@/backend_manager/core/context/core-request-context.service';
import { CoreRedisService } from '@/backend_manager/core/database/core-redis.service';
import { CoreEncryptionService } from '@/backend_manager/core/security/core-encryption.service';

@Global()
@Module({
  providers: [CoreTenantDatasourceService, CoreUnitOfWorkService, CoreAuditLogRepository, CoreEventService, CoreRequestContextService, CoreRedisService, CoreEncryptionService],
  exports: [CoreTenantDatasourceService, CoreUnitOfWorkService, CoreAuditLogRepository, CoreEventService, CoreRequestContextService, CoreRedisService, CoreEncryptionService],
})
export class ManagerCoreModule {}
