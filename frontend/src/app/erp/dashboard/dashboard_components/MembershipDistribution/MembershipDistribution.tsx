"use client";

import { useDashboardContext } from '@/app/erp/dashboard/dashboard_context/DashboardContext';
import { DASHBOARD_PLAN_BG_COLORS } from '@/app/erp/dashboard/dashboard_utils/DashboardSharedConstants';

export default function MembershipDistribution() {
 const { stats } = useDashboardContext();
 if (!stats) return null;
 const s = stats;

 const total = (s.membersByPlan || []).reduce((a, b) => a + b.count, 0);

 return (
 <div className="rounded-xl shadow-sm border p-5 dashboard-module" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}>
 <h2 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Membership Distribution</h2>
 <div className="flex flex-wrap gap-3">
 {(s.membersByPlan || []).map((p) => {
 const pct = total > 0 ? Math.round((p.count / total) * 100) : 0;
 const bgStyle = DASHBOARD_PLAN_BG_COLORS[p.plan] || 'var(--dashboard-plan-default-bg)';
 return (
 <div key={p.plan} className="flex-1 min-w-[150px] rounded-lg p-4" style={{ backgroundColor: 'var(--bg-input)' }}>
 <div className="flex items-center gap-2 mb-2">
 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: bgStyle }} />
 <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{p.plan}</span>
 </div>
 <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{p.count}</div>
 <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
 <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: bgStyle }} />
 </div>
 <div className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{pct}% of total</div>
 </div>
 );
 })}
 {(s.membersByPlan || []).length === 0 && (
 <p className="text-sm py-4" style={{ color: 'var(--text-secondary)' }}>No data available yet.</p>
 )}
 </div>
 </div>
 );
}
