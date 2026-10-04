// RESPONSIBILITY: Renders and orchestrates SuperadminBroadcastsMain for the owning Superadmin feature module; presentation stays free of direct API calls.
'use client';
/**
 * RESPONSIBILITY: React component SuperadminBroadcastsMain owned by the superadmin_broadcasts feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsPage, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_header/SuperadminBroadcastsHeader, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_table/SuperadminBroadcastsTable, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_empty_state/SuperadminBroadcastsEmptyState, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/SuperadminBroadcastsBroadcastModal, @/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/SuperadminBroadcastsBroadcastQueueModal, @/components/ui/Pagination
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Root orchestrator for the Broadcasts page. Composes isolated sub-components and passes state from useSuperadminBroadcastsPage. No business logic here.
import { useTranslations } from 'next-intl';

import Pagination from '@/components/ui/Pagination';

import SuperadminBroadcastsEmptyState from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_empty_state/SuperadminBroadcastsEmptyState';
import SuperadminBroadcastsHeader from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_header/SuperadminBroadcastsHeader';
import SuperadminBroadcastsTable from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/superadmin_broadcasts_table/SuperadminBroadcastsTable';
import { SuperadminBroadcastsBroadcastModal } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/SuperadminBroadcastsBroadcastModal';
import SuperadminBroadcastsBroadcastQueueModal from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_components/SuperadminBroadcastsBroadcastQueueModal';
import { useSuperadminBroadcastsPage } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsPage';


/**
 * @description Owns the SuperadminBroadcastsMain responsibility within the superadmin_role feature boundary.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminBroadcastsMain() {
  const t = useTranslations('superadmin_broadcasts');
    const { broadcasts, searchQuery, setSearchQuery, statusFilter, setStatusFilter, currentPage, totalPages, setCurrentPage, isModalOpen, setIsModalOpen, form, handleCreateBroadcast, handleDeleteBroadcast, handleSendBroadcast, openEditModal, openCreateModal, editingId, isMutating, status, error, queueModalOpen, queueRecipients, queueBroadcastId, queueTitle, onQueueComplete, setQueueModalOpen } = useSuperadminBroadcastsPage();
    const isPending = status === 'pending';
    if (status === 'pending')
        return (<div className="space-y-6 motion-safe:animate-pulse" data-testid="superadmin_broadcasts-superadmin-broadcasts-main-page">
      <div className="h-8 bg-card rounded w-48"/>
      <div className="h-96 bg-card rounded-xl border border-border"/>
    </div>);
    if (error)
        return <div className="p-8 text-center text-danger">{t('ui.broadcasts_could_not_be_loaded_please_retry_5c1c1316')}</div>;
    return (<div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      <SuperadminBroadcastsHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} statusFilter={statusFilter} onStatusFilterChange={setStatusFilter} onCreateClick={openCreateModal} data-testid="superadmin_broadcasts-superadmin-broadcasts-header-interactive-1"/>

      {broadcasts.length === 0 ? (<SuperadminBroadcastsEmptyState onCreateClick={openCreateModal} data-testid="superadmin_broadcasts-superadmin-broadcasts-empty-state-interactive-2"/>) : (<>
          <SuperadminBroadcastsTable onCreateClick={openCreateModal} broadcasts={broadcasts} onSend={handleSendBroadcast} onEdit={openEditModal} onDelete={handleDeleteBroadcast} data-testid="superadmin_broadcasts-superadmin-broadcasts-table-interactive-3"/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} data-testid="superadmin_broadcasts-superadmin-broadcasts-main-superadmin-broadcasts-main-pagination"/>
        </>)}

      <SuperadminBroadcastsBroadcastModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} form={form} onSubmit={handleCreateBroadcast} isEditMode={!!editingId} isMutating={isMutating} data-testid="superadmin_broadcasts-main-broadcast-modal"/>

      <SuperadminBroadcastsBroadcastQueueModal isOpen={queueModalOpen} onClose={() => setQueueModalOpen(false)} recipients={queueRecipients} broadcastId={queueBroadcastId} broadcastTitle={queueTitle} onComplete={onQueueComplete} data-testid="superadmin_broadcasts-superadmin-broadcasts-broadcast-queue-modal-interactive-4"/>
    </div>);
}
