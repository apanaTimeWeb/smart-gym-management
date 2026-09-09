'use client';

import dynamic from 'next/dynamic';
import type { ApexOptions } from 'apexcharts';
import { useDashboardContext } from '@/app/trainer/dashboard/dashboard_context/DashboardContext';
import TrainerDashboardEmptyState from '@/app/trainer/dashboard/dashboard_components/TrainerDashboardEmptyState/TrainerDashboardEmptyState';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TrainerDashboardMembershipDistribution() {
  const { stats, timeRange } = useDashboardContext();
  if (!stats) return null;

  const timeMultiplier = timeRange === 'weekly' ? 0.25 : timeRange === 'yearly' ? 12 : timeRange === 'custom' ? 1.5 : 1;

  const data = (stats.membersByPlan || []).map(p => ({
    name: p.plan,
    value: Math.round(p.count * timeMultiplier),
  }));

  const options: ApexOptions = {
    chart: { type: 'donut', toolbar: { show: false } },
    labels: data.map(d => d.name),
    colors: COLORS,
    legend: { position: 'bottom', fontSize: '12px', labels: { colors: 'hsl(var(--foreground))' } },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '65%' } } },
    tooltip: { theme: 'dark' },
    stroke: { width: 0 },
  };

  return (
    <div className="rounded-xl shadow-sm border p-5 bg-card border-border flex flex-col h-full min-h-[300px]">
      <h2 className="font-semibold mb-4 text-primary">Membership Distribution</h2>
      {data.length === 0 ? (
        <TrainerDashboardEmptyState type="memberships" />
      ) : (
        <Chart
          type="donut"
          series={data.map(d => d.value)}
          options={options}
          height={260}
        />
      )}
    </div>
  );
}
