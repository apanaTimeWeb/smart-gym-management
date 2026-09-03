'use client';
// RESPONSIBILITY: Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useBroadcastsPage. No business logic here.

import { useBroadcastsPage } from '@/app/superadmin/broadcasts/broadcasts_utils/useBroadcastsPage';
import BroadcastsHeader from '@/app/superadmin/broadcasts/broadcasts_components/BroadcastsHeader/BroadcastsHeader';
import BroadcastsTable from '@/app/superadmin/broadcasts/broadcasts_components/BroadcastsTable/BroadcastsTable';
import BroadcastsEmptyState from '@/app/superadmin/broadcasts/broadcasts_components/BroadcastsEmptyState/BroadcastsEmptyState';
import { SuperadminBroadcastModal } from '@/app/superadmin/broadcasts/broadcasts_components/SuperadminBroadcastModal';

export default function BroadcastsClient() {
  const {
    broadcasts,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    form,
    handleCreateBroadcast,
    handleDeleteBroadcast,
    handleSendBroadcast,
    openEditModal,
    openCreateModal,
    editingId,
    fetchState,
    error,
  } = useBroadcastsPage();

  if (fetchState === 'loading') return (
    <div className="space-y-6 motion-safe:animate-pulse">
      <div className="h-8 bg-card rounded w-48" />
      <div className="h-96 bg-card rounded-xl border border-border" />
    </div>
  );
  if (fetchState === 'error' || error) return <div className="p-8 text-center text-danger">Error loading data.</div>;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <BroadcastsHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onCreateClick={openCreateModal}
      />

      {broadcasts.length === 0 ? (
        <BroadcastsEmptyState onCreateClick={openCreateModal} />
      ) : (
        <BroadcastsTable
          broadcasts={broadcasts}
          onSend={handleSendBroadcast}
          onEdit={openEditModal}
          onDelete={handleDeleteBroadcast}
        />
      )}

      <SuperadminBroadcastModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        form={form}
        onSubmit={handleCreateBroadcast}
        isEditMode={!!editingId}
      />
    </div>
  );
}
