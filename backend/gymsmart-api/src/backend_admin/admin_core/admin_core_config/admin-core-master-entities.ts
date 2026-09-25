// RESPONSIBILITY: Provides the immutable master-DB entity registry consumed by TypeORM bootstrap.
// FLOW: ConfigModule -> AdminCoreMasterEntities -> TypeORM master DataSource.
import { AdminCoreMasterFeatureFlagEntity } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-feature-flag.entity.js';
import { AdminCoreMasterAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-master-audit-log.entity.js';
import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity.js';
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity.js';
import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity.js';
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity.js';
import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity.js';
import { AdminCoreMasterUpgradeRequestEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-upgrade-request.entity.js';
import { AdminCoreMasterTenantMembershipEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-membership.entity.js';
import { AdminCoreMasterTenantEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant.entity.js';

const masterEntities = [
  AdminCoreMasterAdminEntity,
  AdminCoreMasterTenantEntity,
  AdminCoreMasterTenantMembershipEntity,
  AdminCoreMasterSubscriptionEntity,
  AdminCoreMasterPlanEntity,
  AdminCoreMasterInvoiceEntity,
  AdminCoreMasterPaymentMethodEntity,
  AdminCoreMasterUpgradeRequestEntity,
  AdminCoreMasterAuditLogEntity,
  AdminCoreMasterFeatureFlagEntity,
];

export const AdminCoreMasterEntities = masterEntities;
