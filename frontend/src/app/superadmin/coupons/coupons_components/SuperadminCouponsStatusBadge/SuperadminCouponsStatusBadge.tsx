// RESPONSIBILITY: Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors.
'use client';
import type { CouponStatus } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
import type { SuperadminCouponsStatusBadgeProps } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsStatusBadgeTypes';

export default function SuperadminCouponsStatusBadge({ status }: SuperadminCouponsStatusBadgeProps) {
    switch (status) {
        case 'ACTIVE':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">ACTIVE</span>;
        case 'INACTIVE':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">INACTIVE</span>;
        case 'EXPIRED':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">EXPIRED</span>;
        case 'DEPLETED':
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">DEPLETED</span>;
        default:
            return null;
    }
}
