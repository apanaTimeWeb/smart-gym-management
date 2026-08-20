'use client';
// RESPONSIBILITY: Renders the Coupons data table shell (header row + rows). Delegates each row to CouponsTableRow. No API calls.

import CouponsTableRow from '@/app/superadmin/coupons/coupons_components/CouponsTable/CouponsTableRow';
import type { Coupon, CouponStatus } from '@/app/superadmin/coupons/coupons_types/coupons_types';

interface CouponsTableProps {
  coupons: Coupon[];
  onToggleStatus: (id: string, currentStatus: CouponStatus) => void;
  onEdit: (coupon: Coupon) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
}

export default function CouponsTable({ coupons, onToggleStatus, onEdit, onDelete, onRestore }: CouponsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Code</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Discount</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Usage</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {coupons.map((cpn) => (
              <CouponsTableRow
                key={cpn.id}
                coupon={cpn}
                onToggleStatus={onToggleStatus}
                onEdit={onEdit}
                onDelete={onDelete}
                onRestore={onRestore}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
