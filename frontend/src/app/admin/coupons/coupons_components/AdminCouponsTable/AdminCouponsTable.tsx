"use client";
import { formatCurrency } from '@/lib/formatters';
// RESPONSIBILITY: Renders the coupons data table with edit, delete, and toggle actions.

import { Edit2, Trash2, ToggleLeft, ToggleRight, Copy } from 'lucide-react';
import { useAdminCouponsLogic } from '@/app/admin/coupons/coupons_context/useAdminCouponsLogic';
import AdminCouponsEmptyState from '@/app/admin/coupons/coupons_components/AdminCouponsEmptyState/AdminCouponsEmptyState';
import AdminPagination from '@/app/admin/admin_components/AdminShared/AdminPagination';
import { AdminTableSkeleton } from '@/app/admin/admin_components/AdminShared/AdminTableSkeleton';
import type { Coupon } from '@/app/admin/coupons/coupons_types/AdminCouponsTypes';

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-success-bg text-success',
  inactive: 'bg-warning-bg text-warning',
  expired: 'bg-danger-bg text-danger',
};

const TABLE_HEADERS = ['Code', 'Type / Value', 'Assigned Gyms', 'Usage', 'Valid Until', 'Status', 'Actions'];

export default function AdminCouponsTable() {
  const { coupons, status, openEdit, deleteCoupon, toggleCoupon, currentPage, setCurrentPage, totalPages, totalItems } = useAdminCouponsLogic();

  if (status === 'pending') return <AdminTableSkeleton rows={6} cols={TABLE_HEADERS.length} />;

  if (coupons.length === 0) return <AdminCouponsEmptyState />;

  const handleCopy = (code: string) => { navigator.clipboard.writeText(code); };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table data-admin-responsive-table className="w-full">
          <thead>
            <tr className="bg-primary/5">
              {TABLE_HEADERS.map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((coupon: Coupon) => (
              <tr
                key={coupon.id}
                className="hover:bg-primary/5 motion-safe:transition-colors cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Edit coupon ${coupon.code}`}
                onClick={() => openEdit(coupon)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openEdit(coupon);
                  }
                }}
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-primary bg-primary-subtle px-2 py-0.5 rounded">{coupon.code}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleCopy(coupon.code); }}
                      className="opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity text-secondary hover:text-foreground"
                      aria-label="Copy coupon code"
                    >
                      <Copy size={13} />
                    </button>
                  </div>
                  <p className="text-xs text-secondary mt-1 truncate max-w-48">{coupon.description}</p>
                </td>
                <td className="px-5 py-4 text-sm font-semibold text-foreground">
                  {coupon.type === 'percentage' ? `${coupon.value}% off` : `${formatCurrency(coupon.value)} off`}
                  {coupon.minOrderAmount > 0 && <p className="text-xs text-secondary font-normal">Min: {formatCurrency(coupon.minOrderAmount)}</p>}
                </td>
                <td className="px-5 py-4 text-sm text-foreground">
                  {coupon.assignedGymNames.join(', ')}
                </td>
                <td className="px-5 py-4">
                  {coupon.usageLimit ? (
                    <>
                      <div className="text-sm text-foreground">{coupon.usedCount} / {coupon.usageLimit} Used</div>
                      <div className="mt-1 h-1.5 bg-input rounded-full w-20">
                        <div
                          className="h-1.5 bg-primary rounded-full"
                          style={{ width: `${Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100)}%` }}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-sm text-foreground">{coupon.usedCount} Used (Unlimited)</div>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-foreground whitespace-nowrap">{coupon.validUntil}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_STYLES[coupon.status] ?? 'bg-input text-secondary'}`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCoupon(coupon.id); }}
                      className="p-1.5 rounded-lg hover:bg-input text-secondary hover:text-foreground motion-safe:transition-colors"
                      aria-label={coupon.status === 'active' ? 'Deactivate coupon' : 'Activate coupon'}
                    >
                      {coupon.status === 'active' ? <ToggleRight size={16} className="text-success" /> : <ToggleLeft size={16} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openEdit(coupon); }}
                      className="p-1.5 rounded-lg hover:bg-input text-secondary hover:text-foreground motion-safe:transition-colors"
                      aria-label="Edit coupon"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteCoupon(coupon.id); }}
                      className="p-1.5 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors"
                      aria-label="Delete coupon"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border">
        <AdminPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={10}
        />
      </div>
    </div>
  );
}
