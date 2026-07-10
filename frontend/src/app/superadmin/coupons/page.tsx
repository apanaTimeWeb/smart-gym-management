'use client';

import React, { useState, useMemo } from 'react';
import { Tag, Plus, Search, X } from 'lucide-react';
import { DUMMY_COUPONS } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { CouponStatus, Coupon } from '@/app/superadmin/superadmin_types/superadmin_types';

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
  const [coupons, setCoupons] = useState<Coupon[]>(DUMMY_COUPONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number | ''>('');
  const [maxUses, setMaxUses] = useState<number | ''>('');
  const [expiryDate, setExpiryDate] = useState('');

  // KPIs
  const activeCoupons = useMemo(() => coupons.filter(c => c.status === 'ACTIVE').length, [coupons]);
  const totalRedeemed = useMemo(() => coupons.reduce((sum, c) => sum + c.currentUses, 0), [coupons]);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (typeof discountPercentage !== 'number' || typeof maxUses !== 'number') return;

    const newCoupon: Coupon = {
      id: `cpn-new-${Date.now()}`,
      code: code.toUpperCase(),
      discountPercentage,
      maxUses,
      currentUses: 0,
      status: 'ACTIVE',
      expiryDate,
    };

    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    
    // Reset form
    setCode('');
    setDiscountPercentage('');
    setMaxUses('');
    setExpiryDate('');
  };

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {filteredCoupons.map((cpn) => (
                <tr key={cpn.id} className="hover:bg-[var(--primary)]/5 transition-colors group">
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
              {filteredCoupons.length === 0 && (
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

      {/* Create Coupon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
              <h2 className="text-[18px] font-bold text-[var(--text-primary)]">Create Coupon</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreateCoupon} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Coupon Code <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="text" 
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] font-mono uppercase focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  placeholder="e.g. SUMMER2026"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[var(--text-secondary)]">Discount % <span className="text-[var(--danger)]">*</span></label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    max="100"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                    placeholder="25"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[14px] font-bold text-[var(--text-secondary)]">Max Uses <span className="text-[var(--danger)]">*</span></label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    value={maxUses}
                    onChange={(e) => setMaxUses(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Expiry Date <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="date" 
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2 pt-5 border-t border-[var(--border)]">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 bg-transparent border border-[var(--border)] hover:bg-[var(--border)] text-[var(--text-primary)] font-medium rounded-lg transition-colors text-[14px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2.5 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors text-[14px]"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
