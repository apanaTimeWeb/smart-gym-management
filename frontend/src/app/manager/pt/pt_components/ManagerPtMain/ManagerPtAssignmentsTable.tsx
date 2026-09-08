// RESPONSIBILITY: Data table to track active PT assignments and mark sessions.
'use client';

import { Loader2, Dumbbell, FileWarning, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PtAssignment } from '@/app/manager/pt/pt_types/ManagerPtTypes';

interface ManagerPtAssignmentsTableProps {
  assignments: PtAssignment[];
  markingId: string | null;
  onMarkSession: (id: string) => void;
  isLoading?: boolean;
}

export default function ManagerPtAssignmentsTable({ assignments, markingId, onMarkSession, isLoading }: ManagerPtAssignmentsTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Active Assignments Tracking</h2>
        <span className="text-xs text-secondary font-medium">{assignments.length} Total</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-primary/5 border-b border-border">
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Member</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Trainer</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider">Package</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider min-w-40">Progress</th>
              <th className="py-3 px-4 text-[11px] font-semibold text-secondary uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <Loader2 size={24} className="mx-auto text-primary motion-safe:animate-spin" />
                </td>
              </tr>
            ) : assignments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <FileWarning size={48} className="text-disabled" strokeWidth={1} />
                    <div>
                      <p className="text-base font-semibold text-foreground">No active assignments</p>
                      <p className="text-sm text-secondary mt-1">Assign a trainer to a member to start tracking.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              assignments.map((a) => {
                const pct = Math.round((a.completedSessions / a.totalSessions) * 100);
                const isMarking = markingId === a.id;
                const isDone = a.completedSessions >= a.totalSessions;
                
                return (
                  <tr key={a.id} className="hover:bg-input/50 motion-safe:transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{a.memberName}</td>
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
                        <span className="text-xs font-bold text-foreground whitespace-nowrap w-10 text-right">
                          {a.completedSessions}/{a.totalSessions}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => onMarkSession(a.id)}
                        disabled={isMarking || isDone}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-input hover:bg-primary/10 hover:text-primary hover:border-primary border border-transparent text-foreground rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {isMarking && <Loader2 size={12} className="motion-safe:animate-spin" />}
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
          Showing 1–{assignments.length} of {assignments.length} results
        </p>
        <div className="flex items-center gap-2">
          <select 
            className="bg-input border border-border rounded-md text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary motion-safe:transition-colors cursor-pointer"
            defaultValue="10"
          >
            <option value="10">10 / page</option>
            <option value="25">25 / page</option>
          </select>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded-md border border-border text-disabled cursor-not-allowed bg-input/50" disabled>
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-md border border-border text-disabled cursor-not-allowed bg-input/50" disabled>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
