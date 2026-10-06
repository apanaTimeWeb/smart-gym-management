// RESPONSIBILITY: Defines the prop contract for SuperadminCouponsRedemptionDrawer.
import type { Coupon } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';
export interface SuperadminCouponsRedemptionDrawerProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}
