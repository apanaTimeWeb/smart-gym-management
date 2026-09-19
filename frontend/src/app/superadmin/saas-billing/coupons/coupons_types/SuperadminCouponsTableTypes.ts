// RESPONSIBILITY: Type contract extracted from SuperadminCouponsTable.tsx; no business behavior.
import type { Coupon, CouponStatus } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';

export interface SuperadminCouponsTableProps {
    coupons: Coupon[];
    onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
    onEdit: (coupon: Coupon) => void;
    onDelete: (id: string) => void;
    onRestore: (id: string) => void;
    onCreateClick: () => void;
}
