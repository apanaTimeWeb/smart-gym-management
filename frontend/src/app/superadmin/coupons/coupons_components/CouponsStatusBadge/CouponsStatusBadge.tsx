'use client';
// RESPONSIBILITY: Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors.
import type { CouponsStatusBadgeProps } from '@/app/superadmin/coupons/coupons_types/coupons_types';

export default function CouponsStatusBadge({ status }: CouponsStatusBadgeProps) {
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
