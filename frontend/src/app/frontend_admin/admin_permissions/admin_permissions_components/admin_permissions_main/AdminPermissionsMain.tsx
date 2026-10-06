// RESPONSIBILITY: Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor.
"use client";
/**
 * @description AdminPermissionsMain: Composes the documented Permissions toolbar, read-only role matrix, and per-staff override editor.
 * @dependencies Consumes useAdminPermissionsLogic, AdminPermissionsSkeleton, AdminPermissionsToolbar, AdminPermissionsRoleCard, AdminPermissionsMatrix.
 * @edge-case Preserves the owning feature's documented loading, empty, error, permission, and recovery states without taking API ownership.
 */
import { useAdminPermissionsLogic } from '@/app/frontend_admin/admin_permissions/admin_permissions_hooks/useAdminPermissionsLogic';
import AdminPermissionsSkeleton from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_main/AdminPermissionsSkeleton';
import AdminPermissionsToolbar from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_toolbar/AdminPermissionsToolbar';
import AdminPermissionsRoleCard from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_role_card/AdminPermissionsRoleCard';
import AdminPermissionsMatrix from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_matrix/AdminPermissionsMatrix';
import AdminPermissionsStaffOverrides from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_staff_overrides/AdminPermissionsStaffOverrides';

/** Renders the Permissions page without owning API calls or business-side permission rules.
 */
/**
 * @description Orchestrates the / feature view and composes feature-owned sections without owning API transport or validation.
 * @dependencies Uses feature-owned hooks, props, and semantic global design tokens; API transport remains outside the view declaration.
 * @edge-case Preserves documented loading, empty, error, disabled, nullable, and retry behavior without inventing fallback business data.
 */
export default function AdminPermissionsMain() {
  const { status } = useAdminPermissionsLogic();
  if (status === 'pending') return <AdminPermissionsSkeleton />;
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <AdminPermissionsRoleCard role="manager" />
          <AdminPermissionsRoleCard role="trainer" />
          <AdminPermissionsRoleCard role="receptionist" />
        </div>
        <AdminPermissionsToolbar />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2"><AdminPermissionsMatrix /></div>
          <div><AdminPermissionsStaffOverrides /></div>
        </div>
      </div>
    </div>
  );
}
