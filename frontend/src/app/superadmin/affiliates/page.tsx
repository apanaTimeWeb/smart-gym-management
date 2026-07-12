'use client';

import React from 'react';
import { Users, Plus, Search, IndianRupee } from 'lucide-react';
import { AffiliateStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useAffiliatesPage } from '../superadmin_utils/hooks/useAffiliatesPage';
import { SuperadminAffiliateModal } from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliateModal';
import { toast } from 'react-hot-toast';

const getStatusBadge = (status: AffiliateStatus) => {
  switch (status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[var(--success-bg)] text-[var(--success)]">ACTIVE</span>;
    case 'INACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1E1E2E] text-[var(--text-secondary)]">INACTIVE</span>;
    default:
      return null;
  }
};

export default function AffiliatesPage() {
  const {
    affiliates,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    totalAffiliates,
    totalCommission
  , loading, error} = useAffiliatesPage();

  if (loading) return <div className="p-8 text-center text-[var(--text-disabled)]">Loading...</div>;
  if (error) return <div className="p-8 text-center text-[var(--danger)]">Error loading data.</div>;

  const handleRowClick = (name: string) => {
    toast(`Clicked on affiliate: ${name}`);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Users className="w-6 h-6 text-[var(--primary)]" />
            Affiliate Partners
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)] mt-1">
            Manage partners and resellers referring tenants to the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input 
              type="text" 
              placeholder="Search affiliates..." 
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
            Add Affiliate
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--info-bg)] flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--info)]" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">Total Affiliates</span>
          </div>
          <div className="text-[28px] font-bold text-[var(--text-primary)] mt-1">{totalAffiliates}</div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-[var(--success-bg)] flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-[var(--success)]" />
            </div>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider">Total Commission Paid</span>
          </div>
          <div className="text-[28px] font-bold text-[var(--text-primary)] mt-1">₹{totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--primary)]/5 border-b border-[var(--border)]">
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Partner Name</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Referral Code</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Total Referred</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Commission Earned</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-[var(--text-secondary)] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {affiliates.map((aff) => (
                <tr 
                  key={aff.id} 
                  className="hover:bg-[var(--primary)]/5 transition-colors group cursor-pointer"
                  onClick={() => handleRowClick(aff.name)}
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-[var(--text-primary)]">{aff.name}</span>
                      <span className="text-[12px] text-[var(--text-secondary)]">{aff.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px]">
                    <span className="px-2 py-1 bg-[var(--bg-input)] rounded text-[var(--text-secondary)] font-mono">{aff.referralCode}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-[var(--text-primary)]">
                    {aff.totalReferred} Gyms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[var(--success)] font-medium">
                    ₹{aff.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(aff.status)}
                  </td>
                </tr>
              ))}
              {affiliates.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>No affiliates found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <SuperadminAffiliateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onSubmit={handleAddAffiliate}
      />
    </div>
  );
}
