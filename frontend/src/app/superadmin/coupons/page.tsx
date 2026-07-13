'use client';

import React from 'react';
import { Tag, Plus, Search, Edit2, Trash2, RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';
import { CouponStatus } from '@/app/superadmin/superadmin_types/superadmin_types';
import { useCouponsPage } from '@/app/superadmin/superadmin_utils/hooks/useCouponsPage';
import { SuperadminCouponModal } from '@/app/superadmin/coupons/coupons_components/SuperadminCouponModal';
import { SuperadminCouponEditModal } from '@/app/superadmin/coupons/coupons_components/SuperadminCouponEditModal';
import { toast } from 'react-hot-toast';

const getStatusBadge = (status: CouponStatus) => {
  switch (status) {
    case 'ACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-success-bg text-success">ACTIVE</span>;
    case 'INACTIVE':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1E1E2E] text-secondary">INACTIVE</span>;
    case 'EXPIRED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1E1E2E] text-secondary">EXPIRED</span>;
    case 'DEPLETED':
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-warning-bg text-warning">DEPLETED</span>;
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
    totalRedeemed,
    loading, 
    error,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedCoupon,
    setSelectedCoupon,
    handleUpdateCoupon,
    handleDeleteCoupon,
    handleToggleRestore,
    handleToggleStatus
  } = useCouponsPage();

  if (loading) return <div className="p-8 text-center text-disabled">Loading...</div>;
  if (error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  const handleRowClick = (code: string) => {
    // Only fire if not clicking an action button (handled via stopPropagation on buttons)
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Tag className="w-6 h-6 text-primary" />
            Promotional Coupons
          </h1>
          <p className="text-sm text-secondary mt-1">
            Manage global discount codes for new SaaS subscriptions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search coupons..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-border-focus transition-colors w-64"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Create Coupon
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">Active Coupons</span>
          </div>
          <div className="text-3xl font-bold text-foreground mt-1">{activeCoupons}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-success-bg/30 flex items-center justify-center">
              <Tag className="w-5 h-5 text-success" />
            </div>
            <span className="text-xs font-medium text-secondary uppercase tracking-wider">Total Redeemed</span>
          </div>
          <div className="text-3xl font-bold text-foreground mt-1">{totalRedeemed.toLocaleString()}</div>
        </div>
      </div>

      {/* Data Table */}
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
                <tr 
                  key={cpn.id} 
                  className={`hover:bg-primary/5 transition-colors group cursor-pointer ${cpn.isDeleted ? 'opacity-50 grayscale' : ''}`}
                  onClick={() => handleRowClick(cpn.code)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground tracking-wide">
                    {cpn.code}
                    {cpn.isDeleted && <span className="ml-2 text-[10px] bg-destructive/20 text-destructive px-2 py-0.5 rounded-full">DELETED</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {cpn.discountType === 'PERCENTAGE' ? (
                      <span className="font-semibold text-success">{cpn.discountValue}% OFF</span>
                    ) : (
                      <span className="font-semibold text-success">Rs {cpn.discountValue} OFF</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {cpn.currentUses} / {cpn.maxUses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(cpn.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary">
                    {new Date(cpn.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
                    {cpn.isDeleted ? (
                      <button
                        title="Restore Coupon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleRestore(cpn.id);
                        }}
                        className="text-secondary hover:text-success transition-colors p-1.5 bg-input hover:bg-success/10 rounded-md border border-border"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    ) : (
                      <>
                        <button
                          title={cpn.status === 'ACTIVE' ? 'Deactivate Coupon' : 'Activate Coupon'}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleStatus(cpn.id, cpn.status);
                          }}
                          disabled={cpn.status === 'EXPIRED' || cpn.status === 'DEPLETED'}
                          className={`p-1.5 rounded-md border border-border transition-colors ${
                            cpn.status === 'EXPIRED' || cpn.status === 'DEPLETED' 
                              ? 'opacity-30 cursor-not-allowed bg-input' 
                              : cpn.status === 'ACTIVE'
                                ? 'text-success hover:text-white bg-success/10 hover:bg-success'
                                : 'text-secondary hover:text-white bg-input hover:bg-secondary'
                          }`}
                        >
                          {cpn.status === 'ACTIVE' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                        </button>
                        <button
                          title="Edit Coupon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCoupon(cpn);
                            setIsEditModalOpen(true);
                          }}
                          className="text-secondary hover:text-primary transition-colors p-1.5 bg-input hover:bg-primary/10 rounded-md border border-border"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          title="Delete Coupon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCoupon(cpn.id);
                          }}
                          className="text-secondary hover:text-destructive transition-colors p-1.5 bg-input hover:bg-destructive/10 rounded-md border border-border"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-secondary">
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

      <SuperadminCouponEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateCoupon}
        coupon={selectedCoupon}
      />
    </div>
  );
}
