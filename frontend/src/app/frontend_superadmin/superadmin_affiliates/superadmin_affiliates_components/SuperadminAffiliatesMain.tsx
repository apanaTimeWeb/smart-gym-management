'use client';
// RESPONSIBILITY: Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesPage. No business logic here.
import { useTranslations } from 'next-intl';

import { SuperadminAffiliatesAffiliateModal } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/SuperadminAffiliatesAffiliateModal';
import SuperadminAffiliatesEmptyState from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_empty_state/SuperadminAffiliatesEmptyState';
import SuperadminAffiliatesHeader from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_header/SuperadminAffiliatesHeader';
import SuperadminAffiliatesPayoutHistory from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_payout_history/SuperadminAffiliatesPayoutHistory';
import SuperadminAffiliatesStatsBar from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_stats_bar/SuperadminAffiliatesStatsBar';
import SuperadminAffiliatesTable from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_components/superadmin_affiliates_table/SuperadminAffiliatesTable';
import { useSuperadminAffiliatesPage } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_hooks/useSuperadminAffiliatesPage';
import { SuperadminLayoutErrorBoundary } from '@/app/frontend_superadmin/superadmin_layout/superadmin_layout_error_boundary/SuperadminLayoutErrorBoundary';


/**
 * @description Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesPage. No business logic here.
 * @dependencies Uses the existing feature-local API, query, state, and approved UI/infrastructure contracts imported by this component.
 * @edge-case Interactive, loading, empty, error, disabled, and repeated-action paths must remain recoverable through the owning feature contract.
 */
export default function SuperadminAffiliatesMain() {
  const t = useTranslations('superadmin_affiliates');
    const { affiliates, searchQuery, setSearchQuery, statusFilter, setStatusFilter, activeTab, setActiveTab, isModalOpen, setIsModalOpen, handleCloseModal, form, handleAddAffiliate, handleEditAffiliate, handleToggleAffiliateStatus, handleDeleteAffiliate, handlePayCommission, openEditModal, totalAffiliates, totalCommission, payoutHistory, payoutHistoryLoading, payoutHistoryError, retryPayoutHistory, fetchState, isMutating, isError, startDate, setStartDate, endDate, setEndDate, currentPage, totalPages, setPage, editingAffiliate, } = useSuperadminAffiliatesPage();
    if (fetchState === 'pending')
        return (<div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(2)].map((_, i) => <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl border border-border"/>)}
      </div>
      <div className="h-96 bg-card rounded-xl border border-border"/>
    </div>);
    if (isError)
        return <div className="p-8 text-center text-danger" role="alert" data-testid="superadmin_affiliates-affiliates-affiliates-client-alert">{t('ui.affiliates_could_not_be_loaded_6ac4dd1')}</div>;
    return (<div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <SuperadminAffiliatesHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} onAddClick={() => setIsModalOpen(true)} startDate={startDate ?? ''} onStartDateChange={(value) => setStartDate(value)} endDate={endDate ?? ''} onEndDateChange={(value) => setEndDate(value)}/>

      <SuperadminAffiliatesStatsBar totalAffiliates={totalAffiliates} totalCommission={totalCommission} currency={affiliates[0]?.currency || 'INR'}/>

      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-card">
          <div className="flex bg-card border border-border rounded-lg p-1 w-full md:w-auto">
            <button  type="button" onClick={() => setActiveTab('AFFILIATES')} className={`min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'AFFILIATES' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-page'} motion-safe:active:scale-95`} data-testid="superadmin_affiliates-affiliates-affiliates-client-control">
              
              {t('ui.affiliates_list_f2da5c6')}
            </button>
            <button  type="button" onClick={() => setActiveTab('PAYOUTS')} className={`min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'PAYOUTS' ? 'bg-page text-primary shadow-card' : 'text-secondary hover:text-primary hover:bg-page'} motion-safe:active:scale-95`} data-testid="superadmin_affiliates-affiliates-affiliates-client-history">
              
              {t('ui.payout_history_625c04c')}
            </button>
          </div>
        </div>

        <SuperadminLayoutErrorBoundary variant="inline">
          {activeTab === 'PAYOUTS' ? (<div className="p-4">
              <SuperadminAffiliatesPayoutHistory payouts={payoutHistory} isPending={payoutHistoryLoading} isError={payoutHistoryError} onRetry={retryPayoutHistory}/>
            </div>) : (affiliates.length === 0 ? (<SuperadminAffiliatesEmptyState onAddClick={() => setIsModalOpen(true)}/>) : (<SuperadminAffiliatesTable onAddClick={() => setIsModalOpen(true)} affiliates={affiliates} onToggleStatus={handleToggleAffiliateStatus} onEdit={openEditModal} onDelete={handleDeleteAffiliate} onPayCommission={handlePayCommission} currentPage={currentPage} totalPages={totalPages} setPage={setPage}/>))}
        </SuperadminLayoutErrorBoundary>
      </div>

      <SuperadminAffiliatesAffiliateModal data-testid="superadmin_affiliates-superadmin_affiliates-main-SuperadminAffiliatesAffiliateModal-62" isOpen={isModalOpen} onClose={handleCloseModal} form={form} onSubmit={editingAffiliate ? handleEditAffiliate : handleAddAffiliate} isEdit={!!editingAffiliate} isMutating={isMutating}/>
    </div>);
}

export type { AffiliatesTab } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_types/SuperadminAffiliatesMainTypes';
