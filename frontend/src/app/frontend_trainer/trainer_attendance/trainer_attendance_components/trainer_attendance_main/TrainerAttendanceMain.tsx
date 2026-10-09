"use client";
// RESPONSIBILITY: Renders the Trainer Attendance page and composes feature-owned sections; all data and mutation orchestration is delegated to useTrainerAttendanceMain.
/**
 * @description Composes Attendance KPI, summary, toolbar, calendar/table, error, and modal views using the feature main hook.
 * @dependencies useTrainerAttendanceMain and Trainer Attendance presentation components.
 * @edge-case Preserves date filters, refresh behavior, empty/error states, and mutation result presentation without owning API logic.
 */
// DATA FLOW: page.tsx → useTrainerAttendanceMain → child views.
import { Loader2, RefreshCw } from 'lucide-react';

import { useTranslations } from 'next-intl';

import TrainerInfrastructureSkeletonBlock from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/TrainerInfrastructureSkeletonBlock';

import TrainerAttendanceKPIs from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_kpis/TrainerAttendanceKPIs';

import TrainerAttendanceModal from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_modal/TrainerAttendanceModal';

import TrainerAttendanceMyAttendanceCalendar from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_my_attendance_calendar/TrainerAttendanceMyAttendanceCalendar';

import TrainerAttendanceSummaryCard from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_summary_card/TrainerAttendanceSummaryCard';

import TrainerAttendanceTable from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_table/TrainerAttendanceTable';

import TrainerAttendanceToolbar from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_toolbar/TrainerAttendanceToolbar';

import { useTrainerAttendanceMain } from '@/app/frontend_trainer/trainer_attendance/trainer_attendance_hooks/useTrainerAttendanceMain';










/**
 * @description Owns the attendance feature UI responsibility represented by TrainerAttendanceMain, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceMain() {
  const t = useTranslations('TRAINER_ATTENDANCE');
  const viewModel = useTrainerAttendanceMain();
  const {
    filters, tab, search, filterDate, currentPage, sortBy, sortDirection, recordsQuery, myAttendanceHistoryQuery, myAttendanceRecords, stats, statsQuery, members,
    markAttendancePending, selfCheckInPending, selfCheckOutPending, openModal, closeModal, viewMode, showModal,
    handleMarkAttendance, handleSelfCheckIn, handleSelfCheckOut, handleRefresh, isRefreshing, records, totalRecords,
  } = viewModel;

  return (
    <div className="min-h-full pb-10 attendance-module bg-page text-primary">
      <div className="p-6 space-y-5">
        <TrainerAttendanceKPIs stats={stats} isPending={statsQuery.isPending} isError={statsQuery.isError} onRetry={() => void statsQuery.refetch()} />
        {tab === 'MY_ATTENDANCE' && (
          myAttendanceHistoryQuery.isPending ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-history-summary-loading">
              <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
              <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
              <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
              <TrainerInfrastructureSkeletonBlock className="h-24 rounded-xl border border-border" />
            </div>
          ) : myAttendanceHistoryQuery.isError ? (
            viewMode !== 'calendar' ? (
              <div role="alert" className="rounded-xl border border-danger-bg bg-danger-bg p-4 text-sm text-danger" data-testid="trainer_attendance-history-summary-error">
                <p>{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
                <button type="button" onClick={() => void myAttendanceHistoryQuery.refetch()} className="mt-2 min-h-11 rounded-lg px-3 font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('TEXT_REFRESH')}</button>
              </div>
            ) : null
          ) : <TrainerAttendanceSummaryCard records={myAttendanceRecords} />
        )}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <TrainerAttendanceToolbar
            tab={filters.tab}
            setTab={filters.setTab}
            viewMode={viewMode}
            setViewMode={viewModel.setViewMode}
            search={search}
            setSearch={filters.setSearch}
            filterDate={filterDate}
            setFilterDate={filters.setFilterDate}
            onAddRecord={openModal}
            onRefresh={handleRefresh}
            onSelfCheckIn={handleSelfCheckIn}
            onSelfCheckOut={handleSelfCheckOut}
            selfCheckInPending={selfCheckInPending}
            selfCheckOutPending={selfCheckOutPending}
            isRefreshing={isRefreshing}/>
          {tab === 'MY_ATTENDANCE' && viewMode === 'calendar' ? (
            myAttendanceHistoryQuery.isPending ? (
              <div className="p-6 space-y-5" aria-busy="true" aria-label={t('TEXT_LOADING_ATTENDANCE_RECORDS')} data-testid="trainer_attendance-calendar-loading">
                <div className="flex flex-wrap items-center justify-between gap-4"><TrainerInfrastructureSkeletonBlock className="h-8 w-56 rounded-lg" /><TrainerInfrastructureSkeletonBlock className="h-11 w-48 rounded-lg" /></div>
                <TrainerInfrastructureSkeletonBlock className="h-80 w-full rounded-xl" />
              </div>
            ) : myAttendanceHistoryQuery.isError ? (
              <div className="p-8 text-center border-t border-border" role="alert" data-testid="trainer_attendance-calendar-error">
                <p className="text-sm font-semibold text-danger">{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
                <button type="button" onClick={() => void myAttendanceHistoryQuery.refetch()} className="min-h-11 mt-4 min-w-28 px-4 py-2 rounded-lg font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{t('TEXT_REFRESH')}</button>
              </div>
            ) : <TrainerAttendanceMyAttendanceCalendar records={myAttendanceRecords} />
          ) : recordsQuery.isError ? (
            <div className="p-8 text-center border-t border-border" role="alert" data-testid="trainer_attendance-attendance-main_unable_to_load_attendance_records">
              <p className="text-sm font-semibold text-danger" data-testid="trainer_attendance-main-error_state">{t('TEXT_UNABLE_TO_LOAD_ATTENDANCE_RECORDS')}</p>
              <p className="text-sm text-secondary mt-1">{t('TEXT_USE_REFRESH_TO_RETRY_THIS_SECTION')}</p>
              <button type="button" onClick={handleRefresh} disabled={isRefreshing} className="min-h-11 mt-4 min-w-28 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_attendance-trainerattendancemain-button_2">
                {isRefreshing ? <><Loader2 size={18} strokeWidth={2} className="motion-safe:animate-spin" aria-hidden="true" />{t('TEXT_REFRESHING')}</> : <><RefreshCw size={18} strokeWidth={2} aria-hidden="true" />{t('TEXT_REFRESH')}</>}
              </button>
            </div>
          ) : (
            <TrainerAttendanceTable
              records={records}
              totalRecords={totalRecords}
              isPending={recordsQuery.isPending || recordsQuery.isFetching}
              search={search}
              filterDate={filterDate}
              currentPage={currentPage}
              sortBy={sortBy}
              sortDirection={sortDirection}
              onPageChange={filters.setCurrentPage}
              onSort={filters.setSort}/>
          )}
        </div>
      </div>
      <TrainerAttendanceModal isOpen={showModal} onClose={closeModal} members={members} saving={markAttendancePending} onSubmit={handleMarkAttendance} testId="trainer-attendance-attendance-main-modal"/>
    </div>
  );
}

