// RESPONSIBILITY: Renders the dashboard goal-completion trend from TanStack Query data without owning server state.
'use client';
// DATA FLOW: Dashboard API → useTrainerDashboardQuery → chart data → ApexCharts.
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTrainerDashboardQuery } from '@/app/trainer/dashboard/dashboard_queries/useTrainerDashboardQuery';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function TrainerDashboardGoalTrendChart() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;
    const syncTheme = () => setIsDark(rootElement.classList.contains('dark'));

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const { data: stats, isPending, isError } = useTrainerDashboardQuery();

  if (isPending) {
    return <div className="bg-card rounded-xl border border-border p-5 min-h-72 motion-safe:animate-pulse" aria-label="Loading goal trend" />;
  }

  if (isError || !stats?.goalCompletionTrend?.length) {
    return <div className="bg-card rounded-xl border border-border p-5 min-h-72 flex items-center justify-center"><p className="text-secondary text-sm">No goal completion data available.</p></div>;
  }

  const trend = stats.goalCompletionTrend;
  const values = trend.map((point) => point.rate);

  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <ReactApexChart
        type="line"
        height={280}
        width="100%"
        series={[{ name: 'Goal Completion', data: values }]}
        options={{
          chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: true } },
          theme: { mode: isDark ? 'dark' : 'light' },
          stroke: { curve: 'smooth', width: 3 },
          colors: ['var(--chart-primary)'],
          grid: { borderColor: 'var(--chart-grid)' },
          xaxis: { categories: trend.map((point) => point.month), labels: { style: { colors: ['var(--text-secondary)'] } } },
          yaxis: { min: 0, max: 100, labels: { style: { colors: ['var(--text-secondary)'] } } },
          tooltip: { theme: isDark ? 'dark' : 'light', y: { formatter: (value: number) => `${value}%` } },
        }}
      />
    </div>
  );
}
