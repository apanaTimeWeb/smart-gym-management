'use client';
import { formatCurrency as SuperadminCouponsFormatCurrency } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_utils/SuperadminCouponsFormatCurrency';
// RESPONSIBILITY: Renders and composes SuperadminCouponsRedemptionDrawer for the owning feature module; business logic and API transport remain in module-owned hooks/services.
'use client';import { useEffect } from 'react';

import { History, Loader2, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

import { formatDate } from '@/lib/formatters';

import SuperadminCouponsStatusBadge from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_status_badge/SuperadminCouponsStatusBadge';
import { useSuperadminCouponsCouponRedemptions } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsCouponRedemptions';

import type { SuperadminCouponsRedemptionDrawerProps } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsRedemptionDrawerTypes';
import type { Coupon } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_types/SuperadminCouponsTypes';



/**
 * @description Owns the SuperadminCouponsRedemptionDrawer responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCouponsRedemptionDrawer({ coupon, isOpen, onClose }: SuperadminCouponsRedemptionDrawerProps) {
  const t = useTranslations('superadmin_coupons');
    const locale = useLocale();

  const query = useSuperadminCouponsCouponRedemptions(coupon?.id ?? null);
  // EFFECT: lock page scrolling while the drawer is open; useEffect dependency [isOpen] controls the lifecycle and cleanup restores the prior browser state.
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [isOpen]);
  if (!isOpen || !coupon) return null;
  const redemptions = query.data?.data ?? [];
  const totalDiscount = redemptions.reduce((sum, redemption) => sum + redemption.discountApplied, 0);
  return (
    <>
      <div className="fixed inset-0 z-30 bg-overlay backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" onClick={onClose} aria-hidden="true"  data-testid="superadmin_coupons-superadmincouponsredemptiondrawer-interaction-layer-1" />
      <div role="dialog" aria-modal="true" aria-label={t('ui.redemption_history_aria', { code: coupon.code })} className="fixed right-0 top-0 z-40 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-popover" data-testid="superadmin_coupons-redemption-drawer-dialog">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <div className="mb-1 flex items-center gap-3"><h2 className="text-xl font-bold text-primary">{t('ui.redemption_history_b5003d96')}</h2><SuperadminCouponsStatusBadge status={coupon.status} /></div>
            <p className="text-sm font-mono text-primary">{coupon.code}</p>
          </div>
          <button type="button" onClick={onClose} aria-label={t('ui.close_redemption_history_4e217641')} className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" data-testid="superadmin_coupons-superadmin-coupons-redemption-drawer-drawer-close-redemption-history"><X size={18} strokeWidth={2}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-input p-3"><p className="text-xs text-secondary">{t('ui.redemptions_a1be0b61')}</p><p className="mt-1 text-lg font-bold text-primary">{redemptions.length}</p></div>
            <div className="rounded-lg border border-border bg-input p-3"><p className="text-xs text-secondary">{t('ui.discount_applied_d89d5239')}</p><p className="mt-1 text-lg font-bold text-primary">{SuperadminCouponsFormatCurrency(totalDiscount, 'INR', locale)}</p></div>
          </div>
          {query.isPending ? (
            <div className="flex min-h-48 items-center justify-center gap-2 text-secondary" aria-busy="true" data-testid="superadmin_coupons-redemption-drawer-loading-state"><Loader2 size={18} className="motion-safe:animate-spin"/> {t('ui.loading_redemptions_b65cc1b0')}</div>
          ) : query.isError ? (
            <div role="alert" className="rounded-lg border border-border bg-danger-bg p-4 text-sm text-danger" data-testid="superadmin_coupons-redemption-drawer-error-state">{t('ui.unable_to_load_redemption_history_4bca1761')}<button type="button" onClick={() => void query.refetch()} className="ml-1 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" data-testid="superadmin_coupons-superadmin-coupons-redemption-drawer-coupons-redemption-drawer-retry">{t('ui.retry_6327b4e5')}</button></div>
          ) : redemptions.length === 0 ? (
            <div className="rounded-lg border border-border bg-input p-8 text-center"><History size={18} className="mx-auto mb-3 text-secondary"/><p className="font-medium text-primary">{t('ui.no_redemptions_yet_465fe9ce')}</p><p className="mt-1 text-sm text-secondary">{t('ui.this_coupon_has_not_been_used_by_a_gym_c8e776d1')}</p></div>
          ) : (
            <div className="space-y-3">
              {redemptions.map((redemption) => (
                <div key={redemption.id} className="rounded-lg border border-border bg-card p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3"><div><p className="font-medium text-primary">{redemption.tenantName}</p><p className="mt-1 text-xs text-secondary">{redemption.planName}</p></div><p className="font-semibold text-success">{SuperadminCouponsFormatCurrency(redemption.discountApplied, 'INR', locale)}</p></div>
                  <time className="mt-3 block text-xs text-secondary">{t('ui.redeemed_d182bd3c')}{formatDate(redemption.redeemedAt)}</time>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
