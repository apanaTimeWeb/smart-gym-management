// RESPONSIBILITY: Orchestrates Attendance queries, URL filters, mutations, feedback, and child views without owning server data.
'use client';
// DATA FLOW: Attendance URL state → queries/mutations → table/calendar/modal → backend-driven feedback.
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { useAttendanceFilters } from '@/app/trainer/attendance/attendance_queries/TrainerUseAttendanceFilters';
import { useAttendanceRecordsQuery, useAttendanceStatsQuery, useAttendanceMembersQuery } from '@/app/trainer/attendance/attendance_queries/TrainerUseAttendanceQuery';
import { useAttendanceMutations } from '@/app/trainer/attendance/attendance_queries/TrainerUseAttendanceMutations';
import { useTrainerAttendanceStore } from '@/app/trainer/attendance/attendance_store/useTrainerAttendanceStore';
import TrainerAttendanceKPIs from '@/app/trainer/attendance/attendance_components/TrainerAttendanceKPIs/TrainerAttendanceKPIs';
import TrainerAttendanceSummaryCard from '@/app/trainer/attendance/attendance_components/TrainerAttendanceSummaryCard/TrainerAttendanceSummaryCard';
import TrainerAttendanceToolbar from '@/app/trainer/attendance/attendance_components/TrainerAttendanceToolbar/TrainerAttendanceToolbar';
import TrainerAttendanceTable from '@/app/trainer/attendance/attendance_components/TrainerAttendanceTable/TrainerAttendanceTable';
import TrainerAttendanceModal from '@/app/trainer/attendance/attendance_components/TrainerAttendanceModal/TrainerAttendanceModal';
import TrainerMyAttendanceCalendar from '@/app/trainer/attendance/attendance_components/TrainerMyAttendanceCalendar/TrainerMyAttendanceCalendar';
import type { CreateAttendanceDto } from '@/app/trainer/attendance/attendance_types/TrainerAttendance_types';
import { useState } from 'react';

export default function TrainerAttendanceMain() {
  const filters = useAttendanceFilters();
  const { tab, search, filterDate, currentPage, sortBy, sortDirection } = filters;
  const recordsQuery = useAttendanceRecordsQuery({ tab, search, filterDate, currentPage, sortBy, sortDirection });
  const { data: stats } = useAttendanceStatsQuery();
  const { data: members = [] } = useAttendanceMembersQuery();
  const { markAttendance, selfCheckIn, selfCheckOut } = useAttendanceMutations();
  const { openModal, closeModal, viewMode, showModal } = useTrainerAttendanceStore();
  const { showSuccess, showError } = useTrainerFeedback();
  const mutationKeys = useTrainerIdempotencyKey();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const records = recordsQuery.data?.records ?? [];
  const totalRecords = recordsQuery.data?.total ?? 0;

  const handleMarkAttendance = async (data: CreateAttendanceDto) => {
    const actionId = `record-${data.memberId ?? data.staffId ?? data.date}`;
    const key = mutationKeys.begin(actionId);
    try {
      const response = await markAttendance.mutateAsync({ dto: data, idempotencyKey: key });
      mutationKeys.clear(actionId);
      closeModal();
      showSuccess(response.message, `attendance-record-${data.memberId ?? data.staffId ?? data.date}`);
    } catch (error) {
      showError(error, `attendance-record-${data.memberId ?? data.staffId ?? data.date}`);
    }
  };

  const handleSelfCheckIn = async () => {
    const actionId = 'self-check-in';
    const key = mutationKeys.begin(actionId);
    try {
      const response = await selfCheckIn.mutateAsync({ idempotencyKey: key });
      mutationKeys.clear(actionId);
      showSuccess(response.message, 'attendance-self-check-in');
    } catch (error) {
      showError(error, 'attendance-self-check-in');
    }
  };

  const handleSelfCheckOut = async () => {
    const actionId = 'self-check-out';
    const key = mutationKeys.begin(actionId);
    try {
      const response = await selfCheckOut.mutateAsync({ idempotencyKey: key });
      mutationKeys.clear(actionId);
      showSuccess(response.message, 'attendance-self-check-out');
    } catch (error) {
      showError(error, 'attendance-self-check-out');
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try { await recordsQuery.refetch(); } finally { setIsRefreshing(false); }
  };

  const showQueryError = recordsQuery.isError;

  return (
    <div className="min-h-full pb-10 attendance-module bg-page text-primary">
      <div className="p-6 space-y-5">
        <TrainerAttendanceKPIs stats={stats ?? { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 }} />
        {tab === 'My Attendance' && <TrainerAttendanceSummaryCard records={records} />}
        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <TrainerAttendanceToolbar
            tab={filters.tab}
            setTab={filters.setTab}
            viewMode={viewMode}
            setViewMode={useTrainerAttendanceStore.getState().setViewMode}
            search={filters.search}
            setSearch={filters.setSearch}
            filterDate={filters.filterDate}
            setFilterDate={filters.setFilterDate}
            onAddRecord={openModal}
            onRefresh={handleRefresh}
            onSelfCheckIn={handleSelfCheckIn}
            onSelfCheckOut={handleSelfCheckOut}
            selfCheckInPending={selfCheckIn.isPending}
            selfCheckOutPending={selfCheckOut.isPending}
            isRefreshing={isRefreshing}
          />
          {showQueryError ? (
            <div className="p-8 text-center border-t border-border" role="alert">
              <p className="text-sm font-semibold text-danger">Unable to load attendance records.</p>
              <p className="text-sm text-secondary mt-1">Use Refresh to retry this section.</p>
              <button type="button" onClick={handleRefresh} disabled={isRefreshing} className="mt-4 min-w-28 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">{isRefreshing ? 'Refreshing…' : 'Refresh'}</button>
            </div>
          ) : tab === 'My Attendance' && viewMode === 'calendar' ? (
            <TrainerMyAttendanceCalendar records={records} />
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
              onSort={filters.setSort}
            />
          )}
        </div>
      </div>
      <TrainerAttendanceModal isOpen={showModal} onClose={closeModal} members={members} saving={markAttendance.isPending} onSubmit={handleMarkAttendance} />
    </div>
  );
}
