'use client';
// RESPONSIBILITY: Root orchestrator for the Affiliates page. Composes isolated sub-components and passes state from useAffiliatesPage. No business logic here.

import { useAffiliatesPage } from '@/app/superadmin/affiliates/affiliates_utils/useAffiliatesPage';
import AffiliatesHeader from '@/app/superadmin/affiliates/affiliates_components/AffiliatesHeader/AffiliatesHeader';
import AffiliatesStatsBar from '@/app/superadmin/affiliates/affiliates_components/AffiliatesStatsBar/AffiliatesStatsBar';
import AffiliatesTable from '@/app/superadmin/affiliates/affiliates_components/AffiliatesTable/AffiliatesTable';
import AffiliatesEmptyState from '@/app/superadmin/affiliates/affiliates_components/AffiliatesEmptyState/AffiliatesEmptyState';
import { SuperadminAffiliateModal } from '@/app/superadmin/affiliates/affiliates_components/SuperadminAffiliateModal';

export default function AffiliatesClient() {
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
    totalCommission,
    fetchState,
    error,
  } = useAffiliatesPage();

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
      <AffiliatesHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={() => setIsModalOpen(true)}
      />

      <AffiliatesStatsBar
        totalAffiliates={totalAffiliates}
        totalCommission={totalCommission}
      />

      {affiliates.length === 0 ? (
        <AffiliatesEmptyState onAddClick={() => setIsModalOpen(true)} />
      ) : (
        <AffiliatesTable
          affiliates={affiliates}
          onToggleStatus={handleToggleAffiliateStatus}
          onEdit={openEditModal}
          onDelete={handleDeleteAffiliate}
        />
      )}

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
