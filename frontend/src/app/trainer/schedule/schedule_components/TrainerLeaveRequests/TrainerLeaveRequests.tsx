'use client';
// RESPONSIBILITY: Renders the table of past and upcoming ad-hoc leave requests.
import { useTrainerScheduleQuery } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleQuery';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import TrainerScheduleEmptyState from '@/app/trainer/schedule/schedule_components/TrainerScheduleEmptyState/TrainerScheduleEmptyState';
import { Plus, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib/formatters';

import { TRAINER_SCHEDULE_STATUS_STYLES, TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';

export default function TrainerLeaveRequests() {
  const { data, isLoading } = useTrainerScheduleQuery();
  const openLeaveModal = useTrainerScheduleStore(s => s.openLeaveModal);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  const leaveRequests = data?.leaves ?? [];

  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="p-4 border-b border-border flex justify-between items-center bg-input/50">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-foreground">Time Off Requests</h2>
        </div>
        <button 
          onClick={openLeaveModal}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:opacity-90 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <Plus size={16} /> Request Leave
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/5">
            <tr>
              <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">ID</th>
              <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Date Range</th>
              <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Reason</th>
              <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Status</th>
              <th className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Requested On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leaveRequests.map(leave => {
              const statusStyle = TRAINER_SCHEDULE_STATUS_STYLES[leave.status] ?? TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE;
              return (
                <tr key={leave.id} className="hover:bg-primary/5 motion-safe:transition-colors cursor-pointer">
                  <td className="px-4 py-4 text-xs font-bold text-primary whitespace-nowrap">{leave.id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-foreground whitespace-nowrap">
                    {formatDate(leave.startDate)} <span className="text-secondary font-normal mx-1">to</span> {formatDate(leave.endDate)}
                  </td>
                  <td className="px-4 py-4 text-sm text-secondary truncate max-w-xs">{leave.reason}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-secondary whitespace-nowrap">
                    {formatDate(leave.createdAt)}
                  </td>
                </tr>
              );
            })}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="p-0 border-b-0">
                  <TrainerScheduleEmptyState />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
