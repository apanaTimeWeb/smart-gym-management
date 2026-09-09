'use client';
// RESPONSIBILITY: Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useSuperadminAffiliatesPage. No business logic here.

import { useState } from 'react';
import { useSuperadminAffiliatesPage } from '@/app/superadmin/affiliates/affiliates_utils/useSuperadminAffiliatesPage';
import SuperadminAffiliatesHeader from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesHeader/SuperadminAffiliatesHeader';
import SuperadminAffiliatesStatsBar from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesStatsBar/SuperadminAffiliatesStatsBar';
import SuperadminAffiliatesTable from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesTable/SuperadminAffiliatesTable';
import SuperadminAffiliatesEmptyState from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesEmptyState/SuperadminAffiliatesEmptyState';
import { SuperadminAffiliateModal } from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliateModal';
import SuperadminAffiliatesPayoutHistory from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliatesPayoutHistory/SuperadminAffiliatesPayoutHistory';

export default function SuperadminAffiliatesClient() {
  const [activeTab, setActiveTab] = useState<'AFFILIATES' | 'PAYOUTS'>('AFFILIATES');
  const {
    affiliates,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    isModalOpen,
    setIsModalOpen,
    form,
    handleAddAffiliate,
    handleEditAffiliate,
    handleToggleAffiliateStatus,
    handleDeleteAffiliate,
    handlePayCommission,
    openEditModal,
    editingAffiliate,
    setEditingAffiliate,
    totalAffiliates,
    totalCommission,
    fetchState,
    error,
    isMutating,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useSuperadminAffiliatesPage();

  if (fetchState === 'loading') return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(2)].map((_, i) => <div key={`skeleton-${i}`} className="h-24 bg-card rounded-xl border border-border" />)}
      </div>
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (fetchState === 'error' || error) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <SuperadminAffiliatesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onAddClick={() => setIsModalOpen(true)}
        startDate={startDate ?? ''}
        onStartDateChange={setStartDate ?? (() => {})}
        endDate={endDate ?? ''}
        onEndDateChange={setEndDate ?? (() => {})}
      />

      <SuperadminAffiliatesStatsBar
        totalAffiliates={totalAffiliates}
        totalCommission={totalCommission}
      />

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 justify-between items-center bg-input/20">
          <div className="flex bg-input border border-border rounded-lg p-1 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('AFFILIATES')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'AFFILIATES' ? 'bg-background text-foreground shadow-sm' : 'text-secondary hover:text-foreground hover:bg-background/50'}`}
            >
              Affiliates List
            </button>
            <button
              onClick={() => setActiveTab('PAYOUTS')}
              className={`flex-1 md:flex-none px-4 py-2 text-sm rounded-md font-medium motion-safe:transition-colors ${activeTab === 'PAYOUTS' ? 'bg-background text-foreground shadow-sm' : 'text-secondary hover:text-foreground hover:bg-background/50'}`}
            >
              Payout History
            </button>
          </div>
        </div>

        {activeTab === 'PAYOUTS' ? (
          <div className="p-4">
            <SuperadminAffiliatesPayoutHistory affiliates={affiliates} />
          </div>
        ) : (
          affiliates.length === 0 ? (
            <SuperadminAffiliatesEmptyState onAddClick={() => setIsModalOpen(true)} />
          ) : (
            <SuperadminAffiliatesTable
              onAddClick={() => setIsModalOpen(true)}
              affiliates={affiliates}
              onToggleStatus={handleToggleAffiliateStatus}
              onEdit={openEditModal}
              onDelete={handleDeleteAffiliate}
              onPayCommission={handlePayCommission}
            />
          )
        )}
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
        isMutating={isMutating}
      />
    </div>
  );
}
