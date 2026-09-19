// RESPONSIBILITY: Type contract extracted from SuperadminCouponsTableRow.tsx; no business behavior.
import type { Coupon, CouponStatus } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';

export interface SuperadminCouponsTableRowProps {
    coupon: Coupon;
    onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
    onRestore: (id: string) => void;
}
