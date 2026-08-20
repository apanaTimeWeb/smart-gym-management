'use client';
// RESPONSIBILITY: Root orchestrator for the Coupons page. Composes isolated sub-components and passes state from useCouponsPage. No business logic here.

import { useCouponsPage } from '@/app/superadmin/coupons/coupons_utils/useCouponsPage';
import CouponsHeader from '@/app/superadmin/coupons/coupons_components/CouponsHeader/CouponsHeader';
import CouponsStatsBar from '@/app/superadmin/coupons/coupons_components/CouponsStatsBar/CouponsStatsBar';
import CouponsTable from '@/app/superadmin/coupons/coupons_components/CouponsTable/CouponsTable';
import CouponsEmptyState from '@/app/superadmin/coupons/coupons_components/CouponsEmptyState/CouponsEmptyState';
import { SuperadminCouponModal } from '@/app/superadmin/coupons/coupons_components/SuperadminCouponModal';
import { SuperadminCouponEditModal } from '@/app/superadmin/coupons/coupons_components/SuperadminCouponEditModal';

export default function CouponsClient() {
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
    fetchState,
    error,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedCoupon,
    setSelectedCoupon,
    handleUpdateCoupon,
    handleDeleteCoupon,
    handleToggleRestore,
    handleToggleStatus,
  } = useCouponsPage();

  if (fetchState === 'loading') return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(2)].map((_, i) => <div key={i} className="h-24 bg-card rounded-xl border border-border" />)}
      </div>
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (fetchState === 'error' || error) return <div className="p-8 text-center text-destructive">Error loading data.</div>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <CouponsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={() => setIsModalOpen(true)}
      />

      <CouponsStatsBar
        activeCoupons={activeCoupons}
        totalRedeemed={totalRedeemed}
      />

      {coupons.length === 0 ? (
        <CouponsEmptyState onCreateClick={() => setIsModalOpen(true)} />
      ) : (
        <CouponsTable
          coupons={coupons}
          onToggleStatus={handleToggleStatus}
          onEdit={(cpn) => { setSelectedCoupon(cpn); setIsEditModalOpen(true); }}
          onDelete={handleDeleteCoupon}
          onRestore={handleToggleRestore}
        />
      )}

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
