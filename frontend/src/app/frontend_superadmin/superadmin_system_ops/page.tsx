// RESPONSIBILITY: Renders/orchestrates page within its owning Superadmin feature module; no direct backend implementation.
import { Suspense } from 'react';
import SuperadminLayoutPageSuspenseSkeleton from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutPageSuspenseSkeleton';
// RESPONSIBILITY: Framework route artifact for system-ops.
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminSystemOpsMain from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_components/SuperadminSystemOpsMain';



/**
 * @description Framework route artifact for system-ops.
 * @dependencies Consumes the owning feature contract and approved global zero-business UI/infrastructure only.
 * @edge-case Preserves documented loading, empty, error, retry, keyboard, responsive, and repeated-action behavior where applicable.
 */
export default function SuperadminSystemOpsPage() {
  return <SuperadminLayoutRoleProviders><Suspense fallback={<SuperadminLayoutPageSuspenseSkeleton />}>
        <SuperadminSystemOpsMain />
      </Suspense></SuperadminLayoutRoleProviders>;
}
