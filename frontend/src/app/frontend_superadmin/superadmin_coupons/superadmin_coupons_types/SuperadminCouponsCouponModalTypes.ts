// RESPONSIBILITY: Type contract extracted from SuperadminCouponsCouponModal.tsx; no business behavior.
import type { CouponFormData } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';
import type { UseFormReturn } from 'react-hook-form';



export interface SuperadminCouponsCouponModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: UseFormReturn<CouponFormData>;
    onSubmit: (data: CouponFormData) => void;
}
