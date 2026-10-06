// RESPONSIBILITY: Server Component entry point for the Permissions page.
import AdminPermissionsMain from '@/app/frontend_admin/admin_permissions/admin_permissions_components/admin_permissions_main/AdminPermissionsMain';

/**
 * PermissionsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function PermissionsPage() {
  return (
      <AdminPermissionsMain />
  );
}
