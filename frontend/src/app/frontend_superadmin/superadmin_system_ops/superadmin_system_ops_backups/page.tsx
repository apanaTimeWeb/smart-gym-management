// RESPONSIBILITY: Server route boundary for the Superadmin System Ops child feature.
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';
import SuperadminLayoutRoleProviders from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_components/SuperadminLayoutRoleProviders';
import SuperadminSystemOpsBackupsMain from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_components/SuperadminSystemOpsBackupsMain';

/**
 * @description Owns the Next.js route boundary for the System Ops child feature without embedding business logic.
 * @dependencies Uses role infrastructure plus the feature Main/View component.
 * @edge-case Preserves child loading/error/recovery behavior by delegating entirely to the owning feature component.
 */
export default function Page() {
  return (
    <SuperadminLayoutRoleProviders>
      <SuperadminLayoutErrorBoundary>
        <SuperadminSystemOpsBackupsMain />
      </SuperadminLayoutErrorBoundary>
    </SuperadminLayoutRoleProviders>
  );
}
