'use client';
// RESPONSIBILITY: Renders membership distribution returned by the Dashboard server contract.
// DATA FLOW: Dashboard API → useTrainerDashboardQuery → member-plan distribution → responsive visualization.
import { Users } from 'lucide-react';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import TrainerDashboardEmptyState from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardEmptyState/TrainerDashboardEmptyState';

export default function TrainerDashboardMembershipDistribution() {
  const { data: stats } = useTrainerDashboardQuery();
  if (!stats) return null;
  const data = stats.membersByPlan ?? [];
  const total = data.reduce((sum, item) => sum + item.count, 0);
  return (
    <div className="rounded-xl border border-border p-5 bg-card min-h-72">
      <div className="flex items-center gap-2 mb-5"><Users size={18} className="text-primary" /><h2 className="font-semibold text-primary">Membership Distribution</h2></div>
      {data.length === 0 || total === 0 ? <TrainerDashboardEmptyState type="memberships" /> : (
        <div className="space-y-4">
          {data.map((item, index) => {
            const percentage = Math.round((item.count / total) * 100);
            return (
              <div key={item.plan}>
                <div className="flex justify-between text-sm mb-1"><span className="text-primary">{item.plan}</span><span className="text-secondary">{percentage}%</span></div>
                <div className="h-3 rounded-full bg-input overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%`, opacity: 1 - index * 0.12 }} /></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
