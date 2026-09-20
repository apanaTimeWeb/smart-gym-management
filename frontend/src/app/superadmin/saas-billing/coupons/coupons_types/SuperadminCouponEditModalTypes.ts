// RESPONSIBILITY: Type contract extracted from SuperadminCouponEditModal.tsx; no business behavior.
import type { Coupon, CouponFormData } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';

export interface SuperadminCouponEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: Partial<CouponFormData>) => void;
    coupon: Coupon | null;
}
