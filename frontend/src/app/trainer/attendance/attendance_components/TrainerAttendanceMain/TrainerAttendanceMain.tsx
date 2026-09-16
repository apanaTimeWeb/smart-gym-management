'use client';
// RESPONSIBILITY: Root client component for the Trainer Attendance module.
// Orchestrates query/store hooks and renders the attendance page layout.
// DATA FLOW: page.tsx (Server) → TrainerAttendanceMain (Client) → hooks → sub-components
import { useState, useEffect } from 'react';
import TrainerToast from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
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

export default function TrainerAttendanceMain() {
  const filters = useAttendanceFilters();
  const { tab, search, filterDate, currentPage } = filters;

  const { data: recordsData, isLoading, refetch } = useAttendanceRecordsQuery({ tab, search, filterDate, currentPage });
  const { data: stats } = useAttendanceStatsQuery();
  const { data: members = [] } = useAttendanceMembersQuery();
  const { markAttendance, selfCheckIn, selfCheckOut } = useAttendanceMutations();
  const { showModal, openModal, closeModal, viewMode, toast, showToast, hideToast } = useTrainerAttendanceStore();

  const records = recordsData?.records ?? [];
  const totalRecords = recordsData?.total ?? 0;

  // Wire mutations to toast feedback
  const handleMarkAttendance = async (data: Parameters<typeof markAttendance.mutateAsync>[0]) => {
    try {
      await markAttendance.mutateAsync(data);
      closeModal();
      showToast('Attendance recorded successfully', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Failed to record attendance', 'error');
    }
  };

  const handleSelfCheckIn = async () => {
    try {
      await selfCheckIn.mutateAsync();
      showToast('Checked in successfully', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Check-in failed', 'error');
    }
  };

  const handleSelfCheckOut = async () => {
    try {
      await selfCheckOut.mutateAsync();
      showToast('Checked out successfully', 'success');
    } catch (err) {
      showToast((err as Error).message ?? 'Check-out failed', 'error');
    }
  };

  return (
    <div className="min-h-full pb-10 attendance-module bg-background text-foreground">
      <div className="p-6 space-y-5">
        <TrainerAttendanceKPIs
          stats={stats ?? { totalCheckIns: 0, memberCheckIns: 0, staffCheckIns: 0 }}
        />

        {tab === 'My Attendance' && (
          <TrainerAttendanceSummaryCard records={records} />
        )}

        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <TrainerAttendanceToolbar
            {...filters}
            viewMode={viewMode}
            onAddRecord={openModal}
            onRefresh={refetch}
            onSelfCheckIn={handleSelfCheckIn}
            onSelfCheckOut={handleSelfCheckOut}
            selfCheckInPending={selfCheckIn.isPending}
            selfCheckOutPending={selfCheckOut.isPending}
          />

          {tab === 'My Attendance' && viewMode === 'calendar' ? (
            <TrainerMyAttendanceCalendar records={records} />
          ) : (
            <TrainerAttendanceTable
              records={records}
              totalRecords={totalRecords}
              isLoading={isLoading}
              search={search}
              filterDate={filterDate}
              currentPage={currentPage}
              onPageChange={filters.setCurrentPage}
            />
          )}
        </div>
      </div>

      <TrainerAttendanceModal
        isOpen={showModal}
        onClose={closeModal}
        members={members}
        saving={markAttendance.isPending}
        onSubmit={handleMarkAttendance}
      />

      {toast && (
        <TrainerToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
    </div>
  );
}
