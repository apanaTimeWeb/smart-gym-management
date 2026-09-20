'use client';
// RESPONSIBILITY: Data table to track active PT assignments and mark sessions.
import type { ManagerPtAssignmentsTableProps } from '@/app/manager/pt/pt_types/ManagerPtAssignmentsTableTypes';
import { Loader2, Dumbbell, ChevronLeft, ChevronRight } from 'lucide-react';
import ManagerPtAssignmentsEmptyState from '@/app/manager/pt/pt_components/ManagerPtMain/ManagerPtAssignmentsEmptyState';

const PT_ASSIGNMENTS_COLUMN_COUNT = 5;



export default function ManagerPtAssignmentsTable({ assignments, totalAssignments = assignments.length, currentPage = 1, totalPages = 1, onPageChange = () => undefined, markingId, onMarkSession, isLoading }: ManagerPtAssignmentsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-semibold text-primary">Active Assignments Tracking</h2>
        <span className="text-xs text-secondary font-medium">{totalAssignments} Total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-176">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">Member</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">Trainer</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">Package</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider min-w-40">Progress</th>
              <th className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={PT_ASSIGNMENTS_COLUMN_COUNT} className="py-16 text-center">
                  <Loader2 size={18} className="mx-auto text-primary motion-safe:animate-spin" />
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={PT_ASSIGNMENTS_COLUMN_COUNT}>
                  <ManagerPtAssignmentsEmptyState />
                </td>
              </tr>
            ) : (
              assignments.map((a) => {
                const pct = Math.round((a.completedSessions / a.totalSessions) * 100);
                const isMarking = markingId === a.id;
                const isDone = a.completedSessions >= a.totalSessions;
                
                return (
                  <tr key={a.id} className="hover:bg-input/50 motion-safe:transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-primary">{a.memberName}</td>
                    <td className="py-3 px-4 text-sm text-secondary">{a.trainerName}</td>
                    <td className="py-3 px-4 text-sm text-secondary">{a.packageName} ({a.totalSessions}s)</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full motion-safe:transition-all motion-safe:duration-500 ${isDone ? 'bg-success' : 'bg-primary'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-primary whitespace-nowrap w-10 text-right">
                          {a.completedSessions}/{a.totalSessions}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onMarkSession(a.id)}
                        disabled={isMarking || isDone}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-input hover:bg-primary/10 hover:text-primary hover:border-primary border border-transparent text-primary rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {isMarking && <Loader2 size={18} className="motion-safe:animate-spin" />}
                        {isDone ? 'Completed' : 'Mark Session'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-card">
        <p className="text-xs text-secondary font-medium">
          Showing {assignments.length === 0 ? 0 : ((currentPage - 1) * 10) + 1}–{Math.min(currentPage * 10, totalAssignments)} of {totalAssignments} results
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-secondary">10 / page</span>
          <div className="flex items-center gap-1">
            <button onClick={() => onPageChange(Math.max(1, currentPage - 1))} disabled={currentPage <= 1} aria-label="Previous page" className="p-1 rounded-md border border-border text-secondary bg-input/50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft size={18} />
            </button>
            <span className="text-xs text-secondary">{currentPage} / {totalPages}</span>
            <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage >= totalPages} aria-label="Next page" className="p-1 rounded-md border border-border text-secondary bg-input/50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
