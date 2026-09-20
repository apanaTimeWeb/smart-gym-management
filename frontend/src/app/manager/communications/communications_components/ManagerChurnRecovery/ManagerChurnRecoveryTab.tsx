// RESPONSIBILITY: Root orchestrator for the Churn Recovery / Win-Back tab. Renders KPIs, table, and composer drawer. No direct API calls.
'use client';
import ManagerChurnRecoveryComposer from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryComposer';
import ManagerChurnRecoveryKPIs from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryKPIs';
import ManagerChurnRecoveryTable from '@/app/manager/communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTable';
import { useManagerChurnRecoveryLogic } from '@/app/manager/communications/communications_hooks/ManagerUseManagerChurnRecoveryLogic';


export default function ManagerChurnRecoveryTab() {
  const {
    churnKPIs,
    paginatedMembers,
    filteredMembers,
    isPending, isError,
    totalPages,
    churnSearch,
    setChurnSearch,
    churnReasonFilter,
    setChurnReasonFilter,
    churnCurrentPage,
    setChurnCurrentPage,
    isChurnComposerOpen,
    openChurnComposer,
    closeChurnComposer,
    selectedMember,
    handleSendWinBack,
    isSending,
    getTemplateTier } = useManagerChurnRecoveryLogic();

  const defaultTier = selectedMember ? getTemplateTier(selectedMember.daysSinceExit) : '30_days';

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-primary">Member Recovery / Win-Back</h2>
          <p className="text-xs text-secondary mt-0.5">
            Target exited members with personalised win-back campaigns to re-engage them.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-danger border border-danger text-on-danger text-xs font-medium">
          {filteredMembers.length} churned member{filteredMembers.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* KPI Cards */}
      <ManagerChurnRecoveryKPIs kpis={churnKPIs} />

      {/* Members Table */}
      <ManagerChurnRecoveryTable
        members={paginatedMembers}
        allFilteredCount={filteredMembers.length}
        isPending={isPending} isError={isError}
        churnSearch={churnSearch}
        onSearchChange={setChurnSearch}
        churnReasonFilter={churnReasonFilter}
        onReasonFilterChange={setChurnReasonFilter}
        currentPage={churnCurrentPage}
        totalPages={totalPages}
        onPageChange={setChurnCurrentPage}
        onOpenComposer={openChurnComposer}
      />

      {/* Win-Back Composer Drawer */}
      <ManagerChurnRecoveryComposer
        member={selectedMember}
        isOpen={isChurnComposerOpen}
        onClose={closeChurnComposer}
        onSend={handleSendWinBack}
        isSending={isSending}
        defaultTier={defaultTier}
      />
    </div>
  );
}
