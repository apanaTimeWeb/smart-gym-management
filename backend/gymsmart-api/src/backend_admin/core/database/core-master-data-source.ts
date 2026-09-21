// RESPONSIBILITY: CLI DataSource for master database migrations and seeding.
// FLOW: CLI → validated environment → master DataSource → migrations/seeder.

import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { CoreMasterTenantEntity } from '@/backend_admin/core/tenant/core-master-tenant.entity';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';
import { CoreMasterTenantMembershipEntity } from '@/backend_admin/core/tenant/core-master-tenant-membership.entity';
import { CoreMasterPlanEntity } from '@/backend_admin/core/subscription/core-master-plan.entity';
import { CoreMasterSubscriptionEntity } from '@/backend_admin/core/subscription/core-master-subscription.entity';
import { CoreMasterInvoiceEntity } from '@/backend_admin/core/subscription/core-master-invoice.entity';
import { CoreMasterPaymentMethodEntity } from '@/backend_admin/core/subscription/core-master-payment-method.entity';
import { CoreMasterUpgradeRequestEntity } from '@/backend_admin/core/subscription/core-master-upgrade-request.entity';

export default new DataSource({
  type: 'postgres',
  host: process.env.MASTER_DB_HOST ?? 'localhost',
  port: Number(process.env.MASTER_DB_PORT ?? 5432),
  username: process.env.MASTER_DB_USER ?? 'postgres',
  password: process.env.MASTER_DB_PASSWORD ?? '',
  database: process.env.MASTER_DB_NAME ?? 'buildronix_master',
  entities: [CoreMasterTenantEntity, CoreMasterAdminEntity, CoreMasterTenantMembershipEntity, CoreMasterPlanEntity, CoreMasterSubscriptionEntity, CoreMasterInvoiceEntity, CoreMasterPaymentMethodEntity, CoreMasterUpgradeRequestEntity],
  migrations: ['src/core/database/migrations/master/*.ts'],
  synchronize: false,
  extra: { max: 20, connectionTimeoutMillis: 30000, idleTimeoutMillis: 10000 },
});
