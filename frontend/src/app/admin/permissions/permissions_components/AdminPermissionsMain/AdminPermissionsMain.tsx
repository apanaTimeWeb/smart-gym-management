"use client";
// RESPONSIBILITY: Main entry point for the Permissions module. Composes toolbar, role cards, matrix, and gym overrides panel.
import { useAdminPermissionsLogic } from '@/app/admin/permissions/permissions_context/useAdminPermissionsLogic';
import AdminPermissionsSkeleton from '@/app/admin/permissions/permissions_components/AdminPermissionsMain/AdminPermissionsSkeleton';
import AdminPermissionsToolbar from '@/app/admin/permissions/permissions_components/AdminPermissionsToolbar/AdminPermissionsToolbar';
import AdminPermissionsRoleCard from '@/app/admin/permissions/permissions_components/AdminPermissionsRoleCard/AdminPermissionsRoleCard';
import AdminPermissionsMatrix from '@/app/admin/permissions/permissions_components/AdminPermissionsMatrix/AdminPermissionsMatrix';
import AdminPermissionsGymOverride from '@/app/admin/permissions/permissions_components/AdminPermissionsGymOverride/AdminPermissionsGymOverride';

export default function AdminPermissionsMain() {
  const { status } = useAdminPermissionsLogic();

  if (status === 'pending') return <AdminPermissionsSkeleton />;

  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">

        {/* Role Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AdminPermissionsRoleCard role="manager" />
          <AdminPermissionsRoleCard role="trainer" />
        </div>

        {/* Toolbar: role tabs + gym scope */}
        <AdminPermissionsToolbar />

        {/* Main content: matrix + gym overrides sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <AdminPermissionsMatrix />
          </div>
          <div>
            <AdminPermissionsGymOverride />
          </div>
        </div>

      </div>
    </div>
  );
}