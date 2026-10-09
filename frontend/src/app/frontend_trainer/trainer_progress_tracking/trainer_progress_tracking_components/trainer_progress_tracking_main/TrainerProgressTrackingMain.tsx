"use client";
// RESPONSIBILITY: Renders Trainer Progress Tracking route sections and delegates orchestration to the module-local main hook.
/**
 * @description Composes the Progress Tracking visual sections; business/API orchestration remains in useTrainerProgressTrackingMain.
 * @dependencies Uses module-owned child views plus approved zero-business Trainer infrastructure components.
 * @edge-cases Preserves loading, empty, error, retry, comparison, and modal states supplied by the main hook.
 */
import { Plus, BarChart2, User, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { TrainerInfrastructureUserSafeError } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_errors/TrainerInfrastructureUserSafeError';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_searchable_dropdown/TrainerInfrastructureSearchableDropdown';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/TrainerInfrastructureSkeletonBlock';

import TrainerProgressTrackingChart from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_chart/TrainerProgressTrackingChart';

import TrainerProgressTrackingComparisonChart from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_comparison_chart/TrainerProgressTrackingComparisonChart';

import TrainerProgressTrackingComparisonTable from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_comparison_table/TrainerProgressTrackingComparisonTable';

import TrainerProgressTrackingEmptyState from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_empty_state/TrainerProgressTrackingEmptyState';

import TrainerProgressTrackingMemberSelector from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_member_selector/TrainerProgressTrackingMemberSelector';

import TrainerProgressTrackingModal from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_modal/TrainerProgressTrackingModal';

import TrainerProgressTrackingTable from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_table/TrainerProgressTrackingTable';

import { useTrainerProgressTrackingMain } from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_hooks/useTrainerProgressTrackingMain';

/**
 * @description Owns the progress tracking feature UI responsibility represented by TrainerProgressTrackingMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingMain() {
  const t = useTranslations('TRAINER_PROGRESS_TRACKING');
  const view = useTrainerProgressTrackingMain();
  const getSafeError = TrainerInfrastructureUserSafeError;
  return (
    <div className="min-h-full pb-10">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-section-title font-bold text-primary">{t('TEXT_PROGRESS_TRACKING')}</h2>
            <p className="text-sm text-secondary mt-0.5">{t('TEXT_BODY_MEASUREMENTS_AND_FITNESS_METRICS_OVER_TIME')}</p>
          </div>
          {view.activeTab === 'individual' && (
            <button type="button" onClick={view.openAddModal} className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-progress-tracking_progress_tracking_main_add">
              <Plus size={18} strokeWidth={2} /> {t('TEXT_ADD_ENTRY')}
            </button>
          )}
        </div>
        <div className="flex border-b border-border">
          <button type="button" onClick={() => view.setActiveTab('individual')} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${view.activeTab === 'individual' ? 'text-primary border-focus bg-primary-subtle' : 'border-transparent text-secondary hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_2">
            <User size={18} strokeWidth={2} /> {t('TEXT_INDIVIDUAL')}
          </button>
          <button type="button" onClick={() => view.setActiveTab('compare')} className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 motion-safe:transition-colors ${view.activeTab === 'compare' ? 'text-primary border-focus bg-primary-subtle' : 'border-transparent text-secondary hover:text-primary'} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95`} data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_3">
            <BarChart2 size={18} strokeWidth={2} /> {t('TEXT_COMPARE_MEMBERS')}
          </button>
        </div>
        {view.activeTab === 'individual' && (
          <>
            <div className="flex items-center justify-between bg-card p-4 rounded-xl border border-border">
              <span className="text-sm font-semibold text-primary">{t('TEXT_SELECT_MEMBER')}</span>
              <TrainerInfrastructureSearchableDropdown value={view.selectedMemberId} onChange={(value: string | number) => view.setSelectedMemberId(String(value))} options={[{ label: t('TEXT_SELECT_MEMBER'), value: '' }, ...view.tData.members.map(member => ({ label: member.name, value: member.id }))]} className="w-64" ariaLabel={t('TEXT_SELECT_MEMBER')} testId="trainer-progress-tracking-main-member-select" />
            </div>
            {!view.selectedMemberId ? (
              <div className="text-center py-12 text-secondary bg-card rounded-xl border border-border">{t('TEXT_PLEASE_SELECT_A_MEMBER_TO_VIEW_THEIR_PROGRESS')}</div>
            ) : view.progressQuery.isPending || view.chartQuery.isPending ? (
              <div className="space-y-4"><TrainerInfrastructureSkeletonBlock className="h-64 rounded-xl border border-border" /><TrainerInfrastructureSkeletonBlock className="h-72 rounded-xl border border-border" /></div>
            ) : view.progressQuery.isError ? (
              <div className="p-5 rounded-xl border border-border bg-danger-bg" data-testid={"trainer-progress-tracking-trainer-progress-tracking-main-danger-state-59-1"}>
                <p role="alert" className="text-sm text-danger font-medium" data-testid="trainer_progress_tracking-progress-tracking_main_error">{getSafeError(view.progressQuery.error, t('TEXT_GENERIC_REQUEST_ERROR'))}</p>
                <button type="button" onClick={() => void view.progressQuery.refetch()} disabled={view.progressQuery.isFetching} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-on-primary font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_progress_tracking-trainerprogresstrackingmain-button_5">{view.progressQuery.isFetching ? <><Loader2 size={18} className="motion-safe:animate-spin" aria-hidden="true" strokeWidth={2} />{t('TEXT_RETRYING')}</> : t('TEXT_RETRY')}</button>
              </div>
            ) : view.progressQuery.data?.entries.length === 0 ? (
              <TrainerProgressTrackingEmptyState onAdd={view.openAddModal}/>
            ) : (
              <>
                {view.chartQuery.isError ? (
                  <div className="p-4 rounded-xl border border-border bg-warning-bg text-warning" data-testid={"trainer-progress-tracking-trainer-progress-tracking-main-warning-state-68-2"}>{t('TEXT_PROGRESS_CHART_COULD_NOT_BE_LOADED_THE_T_B99F5572')}</div>
                ) : (
                  <TrainerProgressTrackingChart entries={view.chartQuery.data?.entries ?? []} activeMetric={view.activeMetric} onMetricChange={view.setActiveMetric}/>
                )}
                <TrainerProgressTrackingTable entries={view.progressQuery.data?.entries ?? []} totalEntries={view.progressQuery.data?.total ?? 0} currentPage={view.currentPage} itemsPerPage={10} sortBy={view.sortBy} sortDirection={view.sortDirection} onPageChange={view.setCurrentPage} onSort={view.setSort} onEdit={view.openEditModal} onDelete={view.handleDelete}/>
              </>
            )}
          </>
        )}
        {view.activeTab === 'compare' && (
          <>
            <TrainerProgressTrackingMemberSelector allMembers={view.tData.members} selectedIds={view.selectedComparisonIds} onToggle={view.toggleComparisonMember}/>
            {view.selectedComparisonIds.length >= 1 && <><TrainerProgressTrackingComparisonChart snapshots={view.comparisonSnapshots} activeMetric={view.activeComparisonMetric} onMetricChange={view.setActiveComparisonMetric}/><TrainerProgressTrackingComparisonTable snapshots={view.comparisonSnapshots} /></>}
          </>
        )}
      </div>
      {view.showModal && <TrainerProgressTrackingModal editingEntry={view.editingEntry} onSave={view.handleSave} onClose={view.closeModal} testId="trainer-progress-tracking-main-progress-modal"/>}
    </div>
  );
}
