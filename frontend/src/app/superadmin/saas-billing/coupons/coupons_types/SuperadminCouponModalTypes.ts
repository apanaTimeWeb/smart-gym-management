// RESPONSIBILITY: Type contract extracted from SuperadminCouponModal.tsx; no business behavior.
import type { UseFormReturn } from 'react-hook-form';
import type { CouponFormData } from '@/app/superadmin/saas-billing/coupons/coupons_types/SuperadminCouponsTypes';

export interface SuperadminCouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<CouponFormData>;
    onSubmit: (data: CouponFormData) => void;
}
