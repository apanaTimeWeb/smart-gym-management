// RESPONSIBILITY: Type contract extracted from SuperadminCouponsTableRow.tsx; no business behavior.
import type { Coupon, CouponStatus } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';

export interface SuperadminCouponsTableRowProps {
    coupon: Coupon;
    onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
    onRestore: (id: string) => void;
}
