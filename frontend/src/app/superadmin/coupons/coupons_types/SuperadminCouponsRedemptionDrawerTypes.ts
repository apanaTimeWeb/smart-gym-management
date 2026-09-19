// RESPONSIBILITY: Defines the prop contract for SuperadminCouponsRedemptionDrawer.
import type { Coupon } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
export interface SuperadminCouponsRedemptionDrawerProps {
  coupon: Coupon | null;
  isOpen: boolean;
  onClose: () => void;
}
