"use client";
// RESPONSIBILITY: Renders the sticky impersonation banner shown when admin is viewing a branch as manager. Provides exit button.

import { LogOut, Building2, Eye } from 'lucide-react';
import { useAdminBranchesImpersonationStore } from '@/app/admin/branches/branches_store/useAdminBranchesImpersonationStore';

export default function AdminImpersonationBanner() {
  const { impersonatedBranch, stopImpersonation } = useAdminBranchesImpersonationStore();

  if (!impersonatedBranch) return null;

  return (
    <div className="sticky top-16 z-20 w-full bg-warning border-b-2 border-warning px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-warning rounded-lg">
          <Eye size={16} className="text-warning" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-warning uppercase tracking-wider">Manager View</span>
          <span className="text-secondary text-xs">—</span>
          <div className="flex items-center gap-1.5">
            <Building2 size={13} className="text-secondary" />
            <span className="text-sm font-semibold text-primary">{impersonatedBranch.name}</span>
            <span className="text-xs text-secondary">({impersonatedBranch.location})</span>
          </div>
        </div>
      </div>
      <button
        onClick={stopImpersonation}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-warning hover:bg-warning border border-warning rounded-lg text-xs font-bold text-warning motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Exit manager view"
      >
        <LogOut size={13} />
        Exit Manager View
      </button>
    </div>
  );
}