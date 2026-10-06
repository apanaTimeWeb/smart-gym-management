// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminPayoutsMain from '@/app/frontend_admin/admin_payouts/admin_payouts_components/admin_payouts_main/AdminPayoutsMain';
/**
 * PayoutsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function PayoutsPage() { return (
      <AdminPayoutsMain />
  ); }
