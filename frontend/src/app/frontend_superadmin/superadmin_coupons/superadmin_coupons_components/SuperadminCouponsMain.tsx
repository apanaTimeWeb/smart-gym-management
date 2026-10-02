'use client';
/**
 * RESPONSIBILITY: React component SuperadminCouponsMain owned by the superadmin_coupons feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMain, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_header/SuperadminCouponsHeader, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_stats_bar/SuperadminCouponsStatsBar, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTable, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsCouponModal, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsCouponEditModal, @/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsRedemptionDrawer
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Coupons page. Composes isolated sub-components and consumes the main feature hook.
import SuperadminCouponsEmptyState from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_empty_state/SuperadminCouponsEmptyState';
import SuperadminCouponsHeader from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_header/SuperadminCouponsHeader';
import SuperadminCouponsStatsBar from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_stats_bar/SuperadminCouponsStatsBar';
import SuperadminCouponsTable from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/superadmin_coupons_table/SuperadminCouponsTable';
import { SuperadminCouponsCouponEditModal } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsCouponEditModal';
import { SuperadminCouponsCouponModal } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsCouponModal';
import SuperadminCouponsRedemptionDrawer from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_components/SuperadminCouponsRedemptionDrawer';
import { useSuperadminCouponsMain } from '@/app/frontend_superadmin/superadmin_coupons/superadmin_coupons_hooks/useSuperadminCouponsMain';



/**
 * @description Owns the SuperadminCouponsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminCouponsMain() {
  const { coupons, searchQuery, setSearchQuery, isModalOpen, setIsModalOpen, form, handleCreateCoupon, activeCoupons, totalRedeemed, status, error, isEditModalOpen, setIsEditModalOpen, selectedCoupon, setSelectedCoupon, handleUpdateCoupon, handleDeleteCoupon, handleToggleRestore, handleToggleStatus, activeKpi, setActiveKpi, totalCoupons, statusFilter, setStatusFilter, isDrawerOpen, setIsDrawerOpen, drawerCoupon } = useSuperadminCouponsMain();
  if (status === 'pending') {
    return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_coupons-superadmin-coupons-main-page"><div className="h-8 w-48 rounded bg-card"/><div className="grid grid-cols-1 gap-4 md:grid-cols-3">{[...Array(2)].map((_, i) => <div key={`skeleton-${i}`} className="h-24 rounded-xl border border-border bg-card"/>)}</div><div className="h-96 rounded-xl border border-border bg-card"/></div>);
  }
  if (error) return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_coupons-main-error-state">{error}</div>;
  return (<div className="mx-auto flex w-full max-w-7xl flex-col gap-6" data-testid="superadmin_coupons-superadmin-coupons-main-page-ready">
    <SuperadminCouponsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} onCreateClick={() => setIsModalOpen(true)} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} data-testid="superadmin_coupons-superadmin-coupons-header-interactive-2"/>
    <SuperadminCouponsStatsBar activeCoupons={activeCoupons} totalRedeemed={totalRedeemed} totalCoupons={totalCoupons} activeKpi={activeKpi} onKpiClick={setActiveKpi} data-testid="superadmin_coupons-superadmin-coupons-stats-bar-interactive-3"/>
    {coupons.length === 0 ? <SuperadminCouponsEmptyState onCreateClick={() => setIsModalOpen(true)} data-testid="superadmin_coupons-superadmin-coupons-empty-state-interactive-4"/> : <SuperadminCouponsTable onCreateClick={() => setIsModalOpen(true)} coupons={coupons} onToggleStatus={handleToggleStatus} onEdit={(cpn) => { setSelectedCoupon(cpn); setIsEditModalOpen(true); }} onDelete={handleDeleteCoupon} onRestore={handleToggleRestore} data-testid="superadmin_coupons-superadmin-coupons-table-interactive-5"/> }
    <SuperadminCouponsCouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} form={form} onSubmit={handleCreateCoupon} data-testid="superadmin_coupons-main-create-coupon-modal"/>
    <SuperadminCouponsCouponEditModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} onSubmit={handleUpdateCoupon} coupon={selectedCoupon} data-testid="superadmin_coupons-main-edit-coupon-modal"/>
    <SuperadminCouponsRedemptionDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} coupon={drawerCoupon} data-testid="superadmin_coupons-superadmin-coupons-redemption-drawer-interactive-6"/>
  </div>);
}

