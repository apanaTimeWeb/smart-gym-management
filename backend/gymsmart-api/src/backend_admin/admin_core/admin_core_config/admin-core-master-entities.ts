// RESPONSIBILITY: Provides the immutable master-DB entity registry consumed by TypeORM bootstrap.
// FLOW: ConfigModule -> AdminCoreMasterEntities -> TypeORM master DataSource.
import { AdminCoreMasterFeatureFlagEntity } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-feature-flag.entity'
import { AdminCoreMasterAuditLogEntity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-master-audit-log.entity'
import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity'
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity'
import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity'
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity'
import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity'
import { AdminCoreMasterUpgradeRequestEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-upgrade-request.entity'
import { AdminCoreMasterTenantMembershipEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-membership.entity'
import { AdminCoreMasterTenantEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant.entity'

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
