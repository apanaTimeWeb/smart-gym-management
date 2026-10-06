// RESPONSIBILITY: Renders/orchestrates not-found for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminLayoutNotFound from '@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound';

/**
 * NotFound is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function NotFound() {
  return <AdminLayoutNotFound />;
}

