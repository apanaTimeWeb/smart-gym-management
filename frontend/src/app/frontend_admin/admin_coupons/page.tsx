// RESPONSIBILITY: Server Component entry point for the Coupons page.
import AdminCouponsMain from '@/app/frontend_admin/admin_coupons/admin_coupons_components/admin_coupons_main/AdminCouponsMain';

/**
 * CouponsPage is the primary function implementation owned by this Admin module.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export default function CouponsPage() {
  return (
      <AdminCouponsMain />
  );
}
