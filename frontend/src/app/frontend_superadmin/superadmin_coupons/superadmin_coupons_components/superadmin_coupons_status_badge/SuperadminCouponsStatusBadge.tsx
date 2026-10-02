'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsStatusBadge owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsStatusBadgeTypes
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Renders the status badge pill for a single coupon. Purely presentational — maps CouponStatus to design system colors.
import { useTranslations } from 'next-intl';

import { SUPERADMIN_COUPON_STATUS_CODES } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_constants/SuperadminCouponsConstants';

import type { SuperadminCouponsStatusBadgeProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsStatusBadgeTypes';
import type { CouponStatus } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';



export default function SuperadminCouponsStatusBadge({ status }: SuperadminCouponsStatusBadgeProps) {
  const t = useTranslations('superadmin_coupons');
    switch (status) {
        case SUPERADMIN_COUPON_STATUS_CODES.ACTIVE:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success" data-testid="superadmin_coupons-superadmin-coupons-status-badge-coupons-status-badge-status">{t('ui.active_18ff74f4')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.INACTIVE:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">{t('ui.inactive_6b273343')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.EXPIRED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-input text-secondary">{t('ui.expired_38afd7ae')}</span>;
        case SUPERADMIN_COUPON_STATUS_CODES.DEPLETED:
            return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">{t('ui.depleted_e3b87190')}</span>;
        default:
            return null;
    }
}
