// RESPONSIBILITY: Renders/orchestrates page for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import AdminPayoutsMain from '@/app/admin/payouts/payouts_components/AdminPayoutsMain/AdminPayoutsMain';
export default function PayoutsPage() { return (
      <AdminPayoutsMain />
  ); }
