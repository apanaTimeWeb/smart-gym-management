'use client';
// RESPONSIBILITY: Renders membership distribution from dashboard API data using semantic CSS segments.
// DATA FLOW: Dashboard API → useTrainerDashboardQuery → plan distribution → responsive visualization.
import { Users } from 'lucide-react';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';
import { useTrainerDashboardStore } from '@/app/trainer/dashboard/dashboard_store/useTrainerDashboardStore';
import TrainerDashboardEmptyState from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardEmptyState/TrainerDashboardEmptyState';
export default function TrainerDashboardMembershipDistribution() {
  const { data: stats } = useTrainerDashboardQuery();
  const timeRange = useTrainerDashboardStore((state) => state.timeRange);
  if (!stats) return null;
  const multiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;
  const data = (stats.membersByPlan ?? []).map((item) => ({ ...item, value: Math.max(0, Math.round(item.count * multiplier)) }));
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <div className="rounded-xl border border-border p-5 bg-card min-h-[300px]"><div className="flex items-center gap-2 mb-5"><Users size={18} className="text-primary" /><h2 className="font-semibold text-primary">Membership Distribution</h2></div>{data.length === 0 || total === 0 ? <TrainerDashboardEmptyState type="memberships" /> : <div className="space-y-4">{data.map((item, index) => { const percentage = Math.round((item.value / total) * 100); return <div key={item.plan}><div className="flex justify-between text-sm mb-1"><span className="text-foreground">{item.plan}</span><span className="text-secondary">{percentage}%</span></div><div className="h-3 rounded-full bg-input overflow-hidden"><div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%`, opacity: 1 - index * 0.12 }} /></div></div>; })}</div>}</div>;
}
