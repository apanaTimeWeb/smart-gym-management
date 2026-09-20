"use client";
// RESPONSIBILITY: Renders the expiring memberships widget showing members expiring this week and month across all branches.

import { Clock, AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
const ADMIN_MEMBERS_ROUTE = '/admin/members';
import { useAdminDashboardLogic } from '@/app/admin/dashboard/dashboard_context/useAdminDashboardLogic';

export default function AdminDashboardExpiringWidget() {
  const { stats } = useAdminDashboardLogic();
  const expiring = stats?.expiringMemberships ?? [];
  const critical = expiring.filter((member) => member.daysLeft <= 7);

  return (
    <div className="bg-card backdrop-blur-xl border border-border rounded-2xl shadow-card p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-warning-bg rounded-xl">
            <Clock size={18} strokeWidth={2} className="text-warning" />
          </div>
          <div>
            <h2 className="text-base font-bold text-primary">Expiring Memberships</h2>
            <p className="text-xs text-secondary">Needs attention</p>
          </div>
        </div>
        {critical.length > 0 && (
          <span className="bg-danger text-on-danger text-xs font-bold px-2 py-0.5 rounded-full">
            {critical.length} This Week
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {critical.length > 0 && (
          <p className="text-xs font-bold text-danger uppercase tracking-wider mb-1 flex items-center gap-1">
            <AlertTriangle size={11} /> Expiring This Week
          </p>
        )}
        {expiring.map((m) => (
          <div key={m.id} className={`p-3 rounded-xl border flex items-center justify-between gap-3 motion-safe:transition-colors ${
            m.daysLeft <= 7 ? 'bg-danger-bg border-border' : 'bg-warning-bg border-warning'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                {m.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary truncate">{m.name}</p>
                <p className="text-xs text-secondary truncate">{m.branch} · {m.plan}</p>
              </div>
            </div>
            <span className={`text-xs font-bold whitespace-nowrap flex-shrink-0 ${m.daysLeft <= 7 ? 'text-danger' : 'text-warning'}`}>
              {m.daysLeft}d left
            </span>
          </div>
        ))}
      </div>

      <Link
        href={`${ADMIN_MEMBERS_ROUTE}?expiryFilter=this_month`}
        className="w-full mt-4 py-2 border border-border rounded-lg text-xs font-bold text-secondary hover:text-primary hover:bg-surface-highlight motion-safe:transition-colors flex items-center justify-center gap-1 motion-safe:duration-base"
      >
        View All Expiring <ChevronRight size={13} />
      </Link>
    </div>
  );
}