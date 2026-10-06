// RESPONSIBILITY: Orchestrates the Manager PT route and delegates all visual sections to child components; it does not own API transport or business calculations.
'use client';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import ManagerPtDashboardTab from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_main/manager_pt_dashboard_tab/ManagerPtDashboardTab';
import ManagerPtPackagesGrid from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_main/manager_pt_packages_grid/ManagerPtPackagesGrid';
import ManagerPtTabBar from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_main/manager_pt_tab_bar/ManagerPtTabBar';
import ManagerPtToolbar from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_main/manager_pt_toolbar/ManagerPtToolbar';
import ManagerPtAssignmentForm from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_assignment_form/ManagerPtAssignmentForm';
import ManagerPtAssignmentsTable from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_assignments_table/ManagerPtAssignmentsTable';
import ManagerPtLoadingSkeleton from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_loading_skeleton/ManagerPtLoadingSkeleton';
import ManagerPtTrainerWorkload from '@/app/frontend_manager/manager_pt/manager_pt_components/manager_pt_trainer_workload/ManagerPtTrainerWorkload';
import { useManagerPtLogic } from '@/app/frontend_manager/manager_pt/manager_pt_hooks/useManagerPtLogic';
import type { ManagerPtAssignmentFormValues } from '@/app/frontend_manager/manager_pt/manager_pt_schemas/ManagerPtAssignmentSchema';
import { MANAGER_PT_TAB_OPTIONS } from '@/app/frontend_manager/manager_pt/manager_pt_constants/ManagerPtTabConstants';

/**
 * @description Orchestrates the Manager PT route, owns only modal visibility and selected-tab composition, and delegates server state/mutations to useManagerPtLogic.
 * @dependencies Consumes module-owned PT hooks, schemas, API contracts, and visual child components.
 * @edge-case Keeps loading, error, empty-package, retry, and repeated-assignment flows inside the documented module boundaries.
 */
export default function ManagerPtMain() {
  const t = useTranslations('MANAGER_PT');
  const locale = useLocale();
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const { activeTab, setActiveTab, packages, assignments, kpis, workload, expiringPackages, totalAssignments, currentPage, limit, setPage, isPending, isError, errorMessage, markingId, handleMarkSession, createAssignment, assignmentSaving } = useManagerPtLogic();

  const handleCreateAssignment = async (values: ManagerPtAssignmentFormValues) => {
    await createAssignment({ body: values, idempotencyKey: createManagerIdempotencyKey() });
    setIsAssignModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      <ManagerPtAssignmentForm data-testid="manager_pt-managerptmain-managerptassignmentform-1" open={isAssignModalOpen} packages={packages} trainers={workload} saving={assignmentSaving} onClose={() => setIsAssignModalOpen(false)} onSubmit={handleCreateAssignment} />
      <ManagerPtToolbar data-testid="manager_pt-managerptmain-managerpttoolbar-2" title={t('COPY_PERSONAL_TRAINING')} subtitle={t('COPY_MANAGE_PT_PACKAGES_MONITOR_TRAINER_WORKLOAD_TRACK_SESSIONS')} actionLabel={t('COPY_ASSIGN_TRAINER_1')} onAssign={() => setIsAssignModalOpen(true)} />
      <ManagerPtTabBar data-testid="manager_pt-managerptmain-managerpttabbar-3" tabs={MANAGER_PT_TAB_OPTIONS} activeTab={activeTab} onChange={setActiveTab} />

      {isPending && <ManagerPtLoadingSkeleton />}
      {isError && <div data-testid="manager_pt-manager-pt-main-status" role="alert" className="rounded-xl border border-danger bg-danger p-5 text-sm text-on-danger">{errorMessage || t('TEXT_GENERIC_ERROR')}</div>}

      {!isPending && !isError && (
        <div className="space-y-6">
          {activeTab === 'dashboard' && <ManagerPtDashboardTab kpis={kpis} workload={workload} expiringPackages={expiringPackages}  data-testid="manager_pt-managerptmain-pt-dashboard-tab-1"/>}
          {activeTab === 'assignments' && (
            <ManagerPtAssignmentsTable data-testid="manager_pt-managerptmain-managerptassignmentstable-4" assignments={assignments} totalAssignments={totalAssignments} currentPage={currentPage} totalPages={Math.max(1, Math.ceil(totalAssignments / limit))} onPageChange={setPage} markingId={markingId} onMarkSession={handleMarkSession} />
          )}
          {activeTab === 'workload' && <ManagerPtTrainerWorkload workload={workload} />}
          {activeTab === 'packages' && (
            <ManagerPtPackagesGrid packages={packages} translate={t} locale={locale} currencyCode={ManagerEnvConfig.currencyCode} />
          )}
        </div>
      )}
    </div>
  );
}
