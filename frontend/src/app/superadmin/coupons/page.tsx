'use client';

import React from 'react';
import { Tag, Plus, Search } from 'lucide-react';
import { CouponStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useCouponsPage } from '../superadmin_utils/hooks/useCouponsPage';
import { SuperadminCouponModal } from '../superadmin_components/Coupons/SuperadminCouponModal';
import { toast } from 'react-hot-toast';

const getStatusBadge = (status: CouponStatus) => {
  switch (status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--success-bg)] text-[var(--success)]">ACTIVE</span>;
    case 'EXPIRED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1E1E2E] text-[var(--text-secondary)]">EXPIRED</span>;
    case 'DEPLETED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--warning-bg)] text-[var(--warning)]">DEPLETED</span>;
    default:
      return null;
  }
};

export default function CouponsPage() {
  const {
    coupons,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateCoupon,
    activeCoupons,
    totalRedeemed
  } = useCouponsPage();

  const handleRowClick = (code: string) => {
    toast(`Clicked on coupon: ${code}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Tag className="w-6 h-6 text-[var(--primary)]" />
            Promotional Coupons
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">
            Manage global discount codes for new SaaS subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search coupons..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">Active Coupons</span>
          </div>
          <div className="text-[28px] font-bold text-[var(--text-primary)] mt-1">{activeCoupons}</div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--success-bg)]/30 flex items-center justify-center">
              <Tag className="w-5 h-5 text-[var(--success)]" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">Total Redeemed</span>
          </div>
          <div className="text-[28px] font-bold text-[var(--text-primary)] mt-1">{totalRedeemed.toLocaleString()}</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--primary)]/5 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Discount</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Usage</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Expiry Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {coupons.map((cpn) => (
                <tr 
                  key={cpn.id} 
                  className="hover:bg-[var(--primary)]/5 transition-colors group cursor-pointer"
                  onClick={() => handleRowClick(cpn.code)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-bold text-[var(--text-primary)] tracking-wide">
                    {cpn.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[var(--text-secondary)]">
                    <span className="font-semibold text-[var(--success)]">{cpn.discountPercentage}% OFF</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[var(--text-secondary)]">
                    {cpn.currentUses} / {cpn.maxUses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(cpn.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[var(--text-secondary)]">
                    {new Date(cpn.expiryDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                    <Tag className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No coupons found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SuperadminCouponModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onSubmit={handleCreateCoupon}
      />
    </div>
  );
}
