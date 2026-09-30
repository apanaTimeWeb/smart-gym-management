// RESPONSIBILITY: Provides the master PostgreSQL connection and master authentication repositories.
// FLOW: Config → master DataSource → core users/tenants/memberships/auth audit → auth repositories.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreUserEntity } from '@/backend_trainer/backend_core/core_database/core-user.entity';
import { CoreTenantEntity } from '@/backend_trainer/backend_core/core_database/core-tenant.entity';
import { CoreTenantMembershipEntity } from '@/backend_trainer/backend_core/core_database/core-tenant-membership.entity';
import { CoreAuthAuditLogEntity } from '@/backend_trainer/backend_core/core_database/core-auth-audit-log.entity';
import { CoreMasterSchemaMigration } from '@/backend_trainer/backend_core/core_database/core-master-schema.migration';
import { CoreAuthUserRepository } from '@/backend_trainer/backend_core/core_database/core-auth-user.repository';
import { CoreAuthAuditRepository } from '@/backend_trainer/backend_core/core_database/core-auth-audit.repository';


/**
 * Intent: Defines the CoreMasterModule boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([CoreUserEntity, CoreTenantEntity, CoreTenantMembershipEntity, CoreAuthAuditLogEntity]),
  ],
  providers: [CoreAuthUserRepository, CoreAuthAuditRepository],
  exports: [TypeOrmModule, CoreAuthUserRepository, CoreAuthAuditRepository],
})
export class CoreMasterModule {}
