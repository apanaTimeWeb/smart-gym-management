"use client";
// RESPONSIBILITY: Consolidated cross-branch view of gym-specific blacklist entries.
// Shows all branch-scoped bans in one place and allows admin to propagate any entry to all branches.

import { Building2, Globe, ArrowUpRight, Trash2 } from 'lucide-react';
import { maskSensitiveData } from '@/app/admin/admin_layout/admin_utils/AdminMaskSensitiveData';
import { displayValue } from '@/app/admin/admin_layout/admin_utils/AdminDisplayValue';
import { useAdminBlacklistLogic } from '@/app/admin/blacklist/blacklist_context/useAdminBlacklistLogic';
import type { BlacklistedMember } from '@/app/admin/blacklist/blacklist_types/AdminBlacklistTypes';
import AdminTableSkeleton from '@/app/admin/admin_layout/AdminShared/AdminTableSkeleton';
import AdminBlacklistCrossGymEmptyState from '@/app/admin/blacklist/blacklist_components/AdminBlacklistCrossGymEmptyState/AdminBlacklistCrossGymEmptyState';

const HEADERS = ['Member', 'Contact', 'Reason', 'Banned At Branches', 'Blacklisted By', 'Date', 'Actions'];

export default function AdminBlacklistCrossGymView() {
  const { gymSpecificEntries, status, propagateToAllBranches, removeFromBlacklist, propagating } = useAdminBlacklistLogic();

  if (status === 'pending') return <AdminTableSkeleton rows={4} cols={HEADERS.length} />;

  if (gymSpecificEntries.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-12 flex flex-col items-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-success-bg flex items-center justify-center">
          <Globe size={22} className="text-success" />
        </div>
        <p className="text-base font-semibold text-primary">No gym-specific bans</p>
        <p className="text-sm text-secondary max-w-sm">
          All active bans are already global. Gym-specific bans will appear here so you can review and propagate them across all branches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 px-4 py-3 bg-warning-bg border border-warning rounded-xl">
        <Building2 size={16} className="text-warning mt-0.5 shrink-0" />
        <p className="text-sm text-warning">
          <span className="font-semibold">{gymSpecificEntries.length} gym-specific ban{gymSpecificEntries.length !== 1 ? 's' : ''}</span> found.
          These members are blocked only at specific branches. Use <span className="font-semibold">Propagate to All</span> to upgrade any entry to a global ban.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table data-admin-responsive-table className="w-full">
            <thead>
              <tr className="bg-warning-bg">
                {HEADERS.map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {gymSpecificEntries.length === 0 ? <tr><td colSpan={HEADERS.length}><AdminBlacklistCrossGymEmptyState /></td></tr> : gymSpecificEntries.map((m: BlacklistedMember) => (
                <tr key={m.id} className="hover:bg-warning-bg motion-safe:transition-colors group motion-safe:duration-base">
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-primary">{m.memberName}</p>
                    <p className="text-xs text-secondary">ID: {m.memberId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-primary">{maskSensitiveData(m.memberPhone)}</p>
                    <p className="text-xs text-secondary truncate max-w-40">{displayValue(m.memberEmail)}</p>
                  </td>
                  <td className="px-4 py-3 max-w-56">
                    <p className="text-sm text-primary line-clamp-2">{m.reason}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {m.assignedGymNames.map((gym: string) => (
                        <span key={gym} className="inline-flex items-center gap-1 px-2 py-0.5 bg-warning text-on-primary rounded-full text-xs font-medium">
                          <Building2 size={10} />
                          {gym}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-secondary">{m.blacklistedBy}</td>
                  <td className="px-4 py-3 text-sm text-secondary whitespace-nowrap">{m.blacklistedAt}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 motion-safe:transition-opacity motion-safe:duration-base">
                      <button
                        onClick={() => propagateToAllBranches(m.id, m.memberName)}
                        disabled={propagating}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-danger text-on-danger text-xs font-semibold hover:opacity-80 motion-safe:transition-opacity disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap motion-safe:duration-base"
                        aria-label="Propagate ban to all branches"
                      >
                        <ArrowUpRight size={13} />
                        Propagate to All
                      </button>
                      <button
                        onClick={() => removeFromBlacklist(m.id, m.memberName)}
                        className="p-1.5 rounded-lg hover:bg-danger-bg text-secondary hover:text-danger motion-safe:transition-colors motion-safe:duration-base"
                        aria-label="Remove from blacklist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
