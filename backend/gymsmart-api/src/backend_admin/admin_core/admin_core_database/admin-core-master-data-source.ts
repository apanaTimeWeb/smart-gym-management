// RESPONSIBILITY: CLI DataSource for master database migrations and seeding.
// FLOW: CLI â†’ validated environment â†’ master DataSource â†’ migrations/seeder.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import 'dotenv/config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { AdminCoreMasterAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-master-audit-log.entity'
import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity'
import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment'
import { AdminCoreMasterFeatureFlagEntity } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-feature-flag.entity'
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity'
import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity'
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity'
import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity'
import { AdminCoreMasterUpgradeRequestEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-upgrade-request.entity'
import { AdminCoreMasterTenantMembershipEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-membership.entity'
import { AdminCoreMasterTenantEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant.entity'

const env = readAdminCoreEnvironment();

export default new DataSource({
  type: 'postgres',
  host: env.MASTER_DB_HOST ?? 'localhost',
  port: Number(env.MASTER_DB_PORT ?? 5432),
  username: env.MASTER_DB_USER ?? 'postgres',
  password: env.MASTER_DB_PASSWORD ?? '',
  database: env.MASTER_DB_NAME ?? 'buildronix_master',
  entities: [AdminCoreMasterTenantEntity, AdminCoreMasterAdminEntity, AdminCoreMasterTenantMembershipEntity, AdminCoreMasterPlanEntity, AdminCoreMasterSubscriptionEntity, AdminCoreMasterInvoiceEntity, AdminCoreMasterPaymentMethodEntity, AdminCoreMasterUpgradeRequestEntity, AdminCoreMasterAuditLogEntity, AdminCoreMasterFeatureFlagEntity],
  migrations: [join(__dirname, 'admin_core_migrations/admin_core_master/*{.js,.ts}')],
  synchronize: false,
  extra: { max: 20, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000 },
});
