// RESPONSIBILITY: Renders the embedded leave-request history owned by the Schedule feature.
'use client';
// DATA FLOW: TanStack Query schedule response → leave rows → keyboard/touch expansion.
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTrainerScheduleQuery } from '@/app/trainer/schedule/schedule_queries/useTrainerScheduleQuery';
import { useTrainerScheduleStore } from '@/app/trainer/schedule/schedule_store/useTrainerScheduleStore';
import TrainerScheduleEmptyState from '@/app/trainer/schedule/schedule_components/TrainerScheduleEmptyState/TrainerScheduleEmptyState';
import { TRAINER_SCHEDULE_STATUS_STYLES, TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE } from '@/app/trainer/schedule/schedule_utils/TrainerScheduleSharedConstants';
import TrainerScheduleLoadingSkeleton from '@/app/trainer/schedule/schedule_components/TrainerScheduleLoadingSkeleton/TrainerScheduleLoadingSkeleton';
import { formatDate } from '@/lib/formatters';

const TABLE_COLUMNS = 5;

export default function TrainerLeaveRequests() {
  const { data, isPending, isError, refetch } = useTrainerScheduleQuery();
  const openLeaveModal = useTrainerScheduleStore((state) => state.openLeaveModal);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isPending) return <TrainerScheduleLoadingSkeleton />;
  if (isError || !data) {
    return <div className="p-6" role="alert"><div className="rounded-xl border border-danger bg-danger-bg p-5"><p className="text-sm font-semibold text-danger">Unable to load leave requests.</p><button type="button" onClick={() => void refetch()} className="mt-3 min-h-11 min-w-28 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-danger text-on-danger motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Retry</button></div></div>;
  }

  const leaveRequests = data.leaves ?? [];
  return (
    <div className="flex flex-col h-full min-h-96">
      <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-floating">
        <h2 className="text-lg font-bold text-primary">Time Off Requests</h2>
        <button type="button" onClick={openLeaveModal} className="min-h-11 min-w-36 inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><Plus size={18} />Request Leave</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-highlight"><tr>{['ID','Date Range','Reason','Status','Requested On'].map((label) => <th key={label} scope="col" className="text-left text-xs font-bold text-secondary uppercase tracking-wider px-4 py-3 whitespace-nowrap">{label}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {leaveRequests.length === 0 ? (
              <tr><td colSpan={TABLE_COLUMNS} className="p-0 border-b-0"><TrainerScheduleEmptyState /></td></tr>
            ) : leaveRequests.map((leave) => {
              const expanded = expandedId === leave.id;
              const statusStyle = TRAINER_SCHEDULE_STATUS_STYLES[leave.status] ?? TRAINER_SCHEDULE_DEFAULT_STATUS_STYLE;
              return (
                <tbody key={`leave-group-${leave.id}`} className="contents">
                  <tr tabIndex={0} aria-expanded={expanded} onClick={() => setExpandedId((current) => current === leave.id ? null : leave.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setExpandedId((current) => current === leave.id ? null : leave.id); } }} className="cursor-pointer hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary motion-safe:transition-colors">
                    <td className="px-4 py-4 text-xs font-bold text-primary whitespace-nowrap">{leave.id}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-primary whitespace-nowrap">{formatDate(leave.startDate)} <span className="text-secondary font-normal mx-1">to</span> {formatDate(leave.endDate)}</td>
                    <td className="px-4 py-4 text-sm text-secondary truncate max-w-xs">{leave.reason}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold ${statusStyle.bg} ${statusStyle.text}`}>{leave.status}</span></td>
                    <td className="px-4 py-4 text-xs text-secondary whitespace-nowrap">{formatDate(leave.createdAt)}</td>
                  </tr>
                  {expanded && <tr className="bg-surface-highlight"><td colSpan={TABLE_COLUMNS} className="px-4 py-3 text-sm text-secondary"><strong className="text-primary">Request details:</strong> {leave.reason}</td></tr>}
                </tbody>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="px-4 py-3 text-xs text-secondary border-t border-border">Leave history is delivered as part of the Schedule response and is intentionally a bounded embedded view; pagination, filtering, and sorting are not separate backend controls for this section.</p>
    </div>
  );
}
