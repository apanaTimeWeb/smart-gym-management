'use client';

import React from 'react';
import { Users, Plus, Search, IndianRupee, Pencil, Trash2, Power, Check } from 'lucide-react';
import { AffiliateStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useAffiliatesPage } from '../superadmin_utils/hooks/useAffiliatesPage';
import { SuperadminAffiliateModal } from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliateModal';
import { toast } from 'react-hot-toast';

const getStatusBadge = (status: AffiliateStatus) => {
  switch (status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-success-bg text-success">ACTIVE</span>;
    case 'INACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#1E1E2E] text-secondary">INACTIVE</span>;
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
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    openEditModal,
    editingAffiliate,
    setEditingAffiliate,
    totalAffiliates,
    totalCommission
  , loading, error} = useAffiliatesPage();

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-foreground flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Affiliate Partners
          </h1>
          <p className="text-[14px] text-secondary mt-1">
            Manage partners and resellers referring tenants to the platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search affiliates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-[14px] text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-[14px]"
          >
            <Plus className="w-4 h-4" />
            Add Affiliate
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-info-bg flex items-center justify-center">
              <Users className="w-5 h-5 text-info" />
            </div>
            <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">Total Affiliates</span>
          </div>
          <div className="text-[28px] font-bold text-foreground mt-1">{totalAffiliates}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success-bg flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-success" />
            </div>
            <span className="text-[11px] font-medium text-secondary uppercase tracking-wider">Total Commission Paid</span>
          </div>
          <div className="text-[28px] font-bold text-foreground mt-1">₹{totalCommission.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 border-b border-border">
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider">Partner Name</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider">Referral Code</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider">Total Referred</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider">Commission Earned</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {affiliates.map((aff) => (
                <tr 
                  key={aff.id} 
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-medium text-foreground">{aff.name}</span>
                      <span className="text-[12px] text-secondary">{aff.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px]">
                    <span className="px-2 py-1 bg-input rounded text-secondary font-mono">{aff.referralCode}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] font-semibold text-foreground">
                    {aff.totalReferred} Gyms
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-[14px] text-success font-medium">
                    ₹{aff.commissionEarned.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(aff.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-[14px]">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleAffiliateStatus(aff.id, aff.status)}
                        className="p-1.5 text-secondary hover:text-primary transition-colors"
                        title={aff.status === 'ACTIVE' ? "Suspend Affiliate" : "Activate Affiliate"}
                      >
                        {aff.status === 'ACTIVE' ? <Power className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => openEditModal(aff)}
                        className="p-1.5 text-secondary hover:text-info transition-colors"
                        title="Edit Affiliate"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAffiliate(aff.id)}
                        className="p-1.5 text-secondary hover:text-destructive transition-colors"
                        title="Delete Affiliate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {affiliates.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondary">
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingAffiliate(null);
          form.reset({ name: '', email: '', referralCode: '' });
        }}
        form={form}
        onSubmit={editingAffiliate ? handleEditAffiliate : handleAddAffiliate}
        isEdit={!!editingAffiliate}
      />
    </div>
  );
}
