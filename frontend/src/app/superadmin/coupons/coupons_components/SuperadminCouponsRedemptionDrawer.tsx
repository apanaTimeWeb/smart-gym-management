// RESPONSIBILITY: Renders the coupon redemption history drawer using the feature-owned redemption query.
'use client';
import { useEffect } from 'react';
import { History, Loader2, X } from 'lucide-react';
import type { Coupon } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsTypes';
import type { SuperadminCouponsRedemptionDrawerProps } from '@/app/superadmin/coupons/coupons_types/SuperadminCouponsRedemptionDrawerTypes';
import SuperadminCouponsStatusBadge from '@/app/superadmin/coupons/coupons_components/SuperadminCouponsStatusBadge/SuperadminCouponsStatusBadge';
import { formatCurrency, formatDate } from '@/lib/formatters';
import { useSuperadminCouponRedemptions } from '@/app/superadmin/coupons/coupons_utils/useSuperadminCouponRedemptions';

export default function SuperadminCouponsRedemptionDrawer({ coupon, isOpen, onClose }: SuperadminCouponsRedemptionDrawerProps) {
  const query = useSuperadminCouponRedemptions(coupon?.id ?? null);
  // EFFECT INTENT: lock page scrolling while the drawer is open and always restore the prior browser state on cleanup.
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
      <div className="fixed inset-0 z-30 bg-overlay/70 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in" onClick={onClose} aria-hidden="true" />
      <div role="dialog" aria-modal="true" aria-label={`Redemption history for coupon ${coupon.code}`} className="fixed right-0 top-0 z-40 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-popover">
        <div className="flex items-center justify-between border-b border-border p-6">
          <div>
            <div className="mb-1 flex items-center gap-3"><h2 className="text-xl font-bold text-primary">Redemption History</h2><SuperadminCouponsStatusBadge status={coupon.status} /></div>
            <p className="text-sm font-mono text-primary">{coupon.code}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close redemption history" className="min-h-11 min-w-11 rounded-lg p-2 text-secondary hover:bg-input hover:text-primary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><X size={18} strokeWidth={2} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-input p-3"><p className="text-xs text-secondary">Redemptions</p><p className="mt-1 text-lg font-bold text-primary">{redemptions.length}</p></div>
            <div className="rounded-lg border border-border bg-input p-3"><p className="text-xs text-secondary">Discount applied</p><p className="mt-1 text-lg font-bold text-primary">{formatCurrency(totalDiscount)}</p></div>
          </div>
          {query.isPending ? (
            <div className="flex min-h-48 items-center justify-center gap-2 text-secondary" aria-busy="true"><Loader2 size={18} className="motion-safe:animate-spin" /> Loading redemptions…</div>
          ) : query.isError ? (
            <div role="alert" className="rounded-lg border border-danger/30 bg-danger-bg p-4 text-sm text-danger">Unable to load redemption history. <button type="button" onClick={() => void query.refetch()} className="ml-1 underline underline-offset-2">Retry</button></div>
          ) : redemptions.length === 0 ? (
            <div className="rounded-lg border border-border bg-input p-8 text-center"><History size={28} className="mx-auto mb-3 text-secondary" /><p className="font-medium text-primary">No Redemptions Yet</p><p className="mt-1 text-sm text-secondary">This coupon has not been used by a gym.</p></div>
          ) : (
            <div className="space-y-3">
              {redemptions.map((redemption) => (
                <div key={redemption.id} className="rounded-lg border border-border bg-card p-4 shadow-card">
                  <div className="flex items-start justify-between gap-3"><div><p className="font-medium text-primary">{redemption.tenantName}</p><p className="mt-1 text-xs text-secondary">{redemption.planName}</p></div><p className="font-semibold text-success">{formatCurrency(redemption.discountApplied)}</p></div>
                  <time className="mt-3 block text-xs text-secondary">Redeemed {formatDate(redemption.redeemedAt)}</time>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
