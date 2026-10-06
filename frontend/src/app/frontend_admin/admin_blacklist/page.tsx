// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminBlacklistMain from '@/app/frontend_admin/admin_blacklist/admin_blacklist_components/admin_blacklist_main/AdminBlacklistMain';
/**
 * BlacklistPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function BlacklistPage() { return (
      <AdminBlacklistMain />
  ); }
