// RESPONSIBILITY: Provides the master PostgreSQL connection and master authentication repositories.
// FLOW: Config → master DataSource → core users/tenants/memberships/auth audit → auth repositories.

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreConfigService } from '@/backend_trainer/core/config/core-config.service';
import { CoreUserEntity } from '@/backend_trainer/core/database/core-user.entity';
import { CoreTenantEntity } from '@/backend_trainer/core/database/core-tenant.entity';
import { CoreTenantMembershipEntity } from '@/backend_trainer/core/database/core-tenant-membership.entity';
import { CoreAuthAuditLogEntity } from '@/backend_trainer/core/database/core-auth-audit-log.entity';
import { CoreMasterSchemaMigration } from '@/backend_trainer/core/database/core-master-schema.migration';
import { CoreAuthUserRepository } from '@/backend_trainer/core/database/core-auth-user.repository';
import { CoreAuthAuditRepository } from '@/backend_trainer/core/database/core-auth-audit.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'master',
      inject: [CoreConfigService],
      useFactory: (config: CoreConfigService) => ({
        name: 'master',
        type: 'postgres' as const,
        ...config.getMasterDatabase(),
        entities: [CoreUserEntity, CoreTenantEntity, CoreTenantMembershipEntity, CoreAuthAuditLogEntity],
        synchronize: false,
        migrations: [CoreMasterSchemaMigration],
        migrationsRun: true,
        migrationsTableName: 'core_migrations',
      }),
    }),
    TypeOrmModule.forFeature([CoreUserEntity, CoreTenantEntity, CoreTenantMembershipEntity, CoreAuthAuditLogEntity], 'master'),
  ],
  providers: [CoreAuthUserRepository, CoreAuthAuditRepository],
  exports: [TypeOrmModule, CoreAuthUserRepository, CoreAuthAuditRepository],
})
export class CoreMasterModule {}
