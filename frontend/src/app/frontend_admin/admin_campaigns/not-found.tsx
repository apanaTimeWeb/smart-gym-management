// RESPONSIBILITY: Renders the Campaigns module not-found state and routes recovery through the shared admin shell.
import AdminLayoutNotFound from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound';

/**
 * AdminCampaignsNotFound renders the admin campaigns not found UI surface and coordinates only the state or handlers required by its owning module.
 * @remarks Business behavior remains inside the feature module and semantic theme tokens are consumed at the JSX boundary.
 */
export default function AdminCampaignsNotFound() {
  return <AdminLayoutNotFound />;
}
