'use client';

import React, { useState, useMemo } from 'react';
import { Users, Plus, Search, IndianRupee, X } from 'lucide-react';
import { DUMMY_AFFILIATES } from '@/app/superadmin/superadmin_utils/SuperadminSharedConstants';
import { AffiliateStatus, Affiliate } from '@/app/superadmin/superadmin_types/superadmin_types';

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
  const [affiliates, setAffiliates] = useState<Affiliate[]>(DUMMY_AFFILIATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // KPIs
  const totalAffiliates = affiliates.length;
  const totalCommission = useMemo(() => affiliates.reduce((sum, a) => sum + a.commissionEarned, 0), [affiliates]);

  const handleAddAffiliate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAffiliate: Affiliate = {
      id: `aff-new-${Date.now()}`,
      name,
      email,
      referralCode: referralCode.toUpperCase(),
      totalReferred: 0,
      commissionEarned: 0,
      status: 'ACTIVE',
      joinedAt: new Date().toISOString(),
    };

    setAffiliates([newAffiliate, ...affiliates]);
    setIsModalOpen(false);
    
    // Reset form
    setName('');
    setEmail('');
    setReferralCode('');
  };

  const filteredAffiliates = affiliates.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.referralCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              {filteredAffiliates.map((aff) => (
                <tr key={aff.id} className="hover:bg-[var(--primary)]/5 transition-colors group cursor-pointer">
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
              {filteredAffiliates.length === 0 && (
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

      {/* Add Affiliate Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl w-full max-w-[480px] shadow-xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-7 py-5 border-b border-[var(--border)]">
              <h2 className="text-[18px] font-bold text-[var(--text-primary)]">Add Affiliate Partner</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddAffiliate} className="flex flex-col p-7 gap-5 overflow-y-auto max-h-[70vh] custom-scrollbar">
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Partner Name <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  placeholder="e.g. Fitness Gurus LLC"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Email Address <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  placeholder="partner@example.com"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[var(--text-secondary)]">Custom Referral Code <span className="text-[var(--danger)]">*</span></label>
                <input 
                  type="text" 
                  required
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[14px] text-[var(--text-primary)] font-mono uppercase focus:outline-none focus:border-[var(--border-focus)] transition-colors"
                  placeholder="e.g. PARTNER2026"
                />
                <p className="text-[12px] text-[var(--text-secondary)]">Gyms using this code at checkout will be tracked to this partner.</p>
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
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
