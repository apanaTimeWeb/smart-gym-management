// RESPONSIBILITY: Renders the feature-owned tenant impersonation session banner for the Superadmin shell.
'use client';
import { Building2, Eye, LogOut } from 'lucide-react';
import { useSuperadminGymGhostLoginStore } from '@/app/superadmin/gyms/gyms_store/useSuperadminGymGhostLoginStore';

export default function SuperadminGymGhostLoginBanner() {
  const { ghostTenant, exitGhostLogin } = useSuperadminGymGhostLoginStore();
  if (!ghostTenant) return null;
  return (
    <div className="sticky top-0 z-20 w-full bg-warning-bg border-b border-warning/40 px-4 py-2.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="p-1.5 bg-warning-bg rounded-md shrink-0" aria-hidden="true"><Eye size={18} strokeWidth={2} className="text-warning" /></div>
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="text-xs font-bold text-warning uppercase tracking-wider shrink-0">Ghost Login Active</span>
          <span className="text-secondary text-xs shrink-0" aria-hidden="true">—</span>
          <div className="flex items-center gap-1.5 min-w-0">
            <Building2 size={18} strokeWidth={2} className="text-secondary shrink-0" />
            <span className="text-sm font-semibold text-primary truncate">{ghostTenant.name}</span>
            <span className="text-xs text-secondary shrink-0">({ghostTenant.plan})</span>
          </div>
        </div>
      </div>
      <button type="button" onClick={() => void exitGhostLogin()} className="flex items-center gap-1.5 px-3 py-1.5 bg-warning-bg hover:bg-warning/30 border border-warning/40 rounded-md text-xs font-bold text-warning motion-safe:transition-all motion-safe:duration-base motion-safe:active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="Exit ghost login session">
        <LogOut size={18} strokeWidth={2} />
        Exit Ghost Login
      </button>
    </div>
  );
}
