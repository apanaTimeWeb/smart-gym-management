'use client';
// RESPONSIBILITY: Renders the dashboard goal-completion trend from TanStack Query data without owning server state.
// DATA FLOW: Dashboard API → useTrainerDashboardQuery → chart data → responsive SVG visualization.
import { Target } from 'lucide-react';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';

export default function TrainerDashboardGoalTrendChart() {
  const { data: stats, isPending, isError } = useTrainerDashboardQuery();
  if (isPending) return <div className="bg-card rounded-xl border border-border p-5 min-h-72 motion-safe:animate-pulse" aria-label="Loading goal trend" />;
  if (isError || !stats?.goalCompletionTrend?.length) return <div className="bg-card rounded-xl border border-border p-5 min-h-72 flex items-center justify-center"><p className="text-secondary text-sm">No goal completion data available.</p></div>;
  const values = stats.goalCompletionTrend.map((point) => point.rate);
  const max = Math.max(...values, 100);
  const min = Math.min(...values, 0);
  const width = 760; const height = 220; const pad = 24;
  const step = values.length > 1 ? (width - pad * 2) / (values.length - 1) : width - pad * 2;
  const points = stats.goalCompletionTrend.map((point, index) => {
    const x = pad + index * step;
    const y = height - pad - ((point.rate - min) / Math.max(max - min, 1)) * (height - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <div className="bg-card rounded-xl border border-border p-5 min-h-72">
      <div className="flex items-center gap-2 mb-4"><Target size={18} className="text-primary" /><h3 className="text-base font-bold text-foreground">Goal Completion Trend</h3></div>
      <div className="w-full overflow-x-auto" role="img" aria-label="Goal completion trend chart">
        <svg viewBox={`0 0 ${width} ${height + 40}`} className="w-full min-w-full h-56" preserveAspectRatio="none">
          <polyline points={points} fill="none" stroke="currentColor" className="text-primary" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {stats.goalCompletionTrend.map((point, index) => { const x = pad + index * step; const y = height - pad - ((point.rate - min) / Math.max(max - min, 1)) * (height - pad * 2); return <g key={point.month}><circle cx={x} cy={y} r="5" fill="currentColor" className="text-primary" /><text x={x} y={height + 20} textAnchor="middle" className="fill-secondary text-xs">{point.month}</text></g>; })}
        </svg>
      </div>
    </div>
  );
}
