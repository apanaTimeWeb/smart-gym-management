import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver';
import { CoreUnitOfWorkService } from '@/backend_trainer/core/database/core-unit-of-work.service';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { CoreSanitizationService } from '@/backend_trainer/core/security/core-sanitization.service';
import { CoreUserEntity } from '@/backend_trainer/core/database/core-user.entity';
import { CoreTenantEntity } from '@/backend_trainer/core/database/core-tenant.entity';
import { CoreTenantMembershipEntity } from '@/backend_trainer/core/database/core-tenant-membership.entity';
import { CoreAuthAuditLogEntity } from '@/backend_trainer/core/database/core-auth-audit-log.entity';
import { CoreAuthUserRepository } from '@/backend_trainer/core/database/core-auth-user.repository';
import { CoreAuthAuditRepository } from '@/backend_trainer/core/database/core-auth-audit.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([CoreUserEntity, CoreTenantEntity, CoreTenantMembershipEntity, CoreAuthAuditLogEntity])
  ],
  providers: [CoreTenantDataSourceResolver, CoreUnitOfWorkService, CoreAuditService, CoreSanitizationService, CoreAuthUserRepository, CoreAuthAuditRepository],
  exports: [TypeOrmModule, CoreTenantDataSourceResolver, CoreUnitOfWorkService, CoreAuditService, CoreSanitizationService, CoreAuthUserRepository, CoreAuthAuditRepository],
})
export class TrainerCoreModule {}
