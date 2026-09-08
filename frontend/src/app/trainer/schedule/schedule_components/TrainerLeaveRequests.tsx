// RESPONSIBILITY: Renders the table of past and upcoming ad-hoc leave requests.
'use client';

import { useScheduleContext } from '@/app/trainer/schedule/schedule_context/TrainerScheduleContext';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import { Plus, Loader2 } from 'lucide-react';

const STATUS_COLORS: Record<string, { bg: string, text: string }> = {
  PENDING: { bg: 'bg-warning/10', text: 'text-warning' },
  APPROVED: { bg: 'bg-success/10', text: 'text-success' },
  REJECTED: { bg: 'bg-danger/10', text: 'text-danger' },
};

export default function TrainerLeaveRequests() {
  const { openLeaveModal } = useScheduleContext();
  const leaveRequests = useTrainerScheduleStore(s => s.leaveRequests);
  const fetchState = useTrainerScheduleStore(s => s.fetchState);

  if (fetchState === 'loading') {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 motion-safe:animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="p-4 border-b border-border flex justify-between items-center bg-input/50">
        <h2 className="text-lg font-bold text-foreground">Time Off Requests</h2>
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
              <th className="text-left text-[11px] font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">ID</th>
              <th className="text-left text-[11px] font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Date Range</th>
              <th className="text-left text-[11px] font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Reason</th>
              <th className="text-left text-[11px] font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Status</th>
              <th className="text-left text-[11px] font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">Requested On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {leaveRequests.map(leave => {
              const statusStyle = STATUS_COLORS[leave.status] || { bg: 'bg-input', text: 'text-secondary' };
              return (
                <tr key={leave.id} className="hover:bg-primary/5 motion-safe:transition-colors cursor-pointer">
                  <td className="px-4 py-4 text-xs font-bold text-primary whitespace-nowrap">{leave.id}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-foreground whitespace-nowrap">
                    {leave.startDate} <span className="text-secondary font-normal mx-1">to</span> {leave.endDate}
                  </td>
                  <td className="px-4 py-4 text-sm text-secondary truncate max-w-xs">{leave.reason}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-secondary whitespace-nowrap">
                    {new Date(leave.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-secondary font-medium">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
