// RESPONSIBILITY: Provides branded Admin not-found handling for an invalid Data Export route.
import AdminLayoutNotFound from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound';

/**
 * AdminDataExportNotFound renders the admin data export not found UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminDataExportNotFound() {
  return <AdminLayoutNotFound />;
}
