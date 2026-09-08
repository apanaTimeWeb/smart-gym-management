'use client';
// RESPONSIBILITY: Sticky banner shown at the top of every superadmin page when a ghost-login
// (tenant impersonation) session is active. Provides a one-click exit back to superadmin.
// DATA FLOW: useSuperadminGhostLoginStore → SuperadminGhostLoginBanner → exit action

import { Eye, LogOut, Building2 } from 'lucide-react';
import { useSuperadminGhostLoginStore } from '@/app/superadmin/superadmin_components/SuperadminLayout/useSuperadminGhostLoginStore';

export default function SuperadminGhostLoginBanner() {
  const { ghostTenant, exitGhostLogin } = useSuperadminGhostLoginStore();

  if (!ghostTenant) return null;

  return (
    <div className="sticky top-0 z-50 w-full bg-warning/15 border-b-2 border-warning/40 px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="p-1.5 bg-warning/20 rounded-lg shrink-0">
          <Eye size={16} className="text-warning" />
        </div>
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-xs font-bold text-warning uppercase tracking-wider shrink-0">Ghost Login Active</span>
          <span className="text-secondary text-xs shrink-0">—</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <Building2 size={13} className="text-secondary shrink-0" />
            <span className="text-sm font-semibold text-foreground truncate">{ghostTenant.name}</span>
            <span className="text-xs text-secondary shrink-0">({ghostTenant.plan})</span>
          </div>
        </div>
      </div>
      <button
        onClick={exitGhostLogin}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-warning/20 hover:bg-warning/30 border border-warning/40 rounded-lg text-xs font-bold text-warning motion-safe:transition-all motion-safe:duration-200 active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning"
        aria-label="Exit ghost login session"
      >
        <LogOut size={13} />
        Exit Ghost Login
      </button>
    </div>
  );
}
