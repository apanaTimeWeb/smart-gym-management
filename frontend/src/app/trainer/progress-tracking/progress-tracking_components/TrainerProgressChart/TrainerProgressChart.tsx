// RESPONSIBILITY: Renders a responsive ApexCharts visualization for the selected progress metric.
'use client';
// DATA FLOW: useTrainerProgressLogic → TrainerProgressChart props → ApexCharts.
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { PROGRESS_CHART_METRICS } from '@/app/trainer/progress-tracking/progress-tracking_utils/TrainerProgressSharedConstants';
import type { ProgressEntry, ProgressChartMetric } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressTypes';
import type { TrainerProgressChartProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressChartProps';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const METRIC_KEY: Record<ProgressChartMetric, keyof ProgressEntry> = {
  weight: 'weightKg',
  bmi: 'bmi',
  bodyFat: 'bodyFatPercent',
  muscleMass: 'muscleMassKg',
};

export default function TrainerProgressChart({ entries, activeMetric, onMetricChange }: TrainerProgressChartProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;
    const syncTheme = () => setIsDark(rootElement.classList.contains('dark'));

    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(rootElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const key = METRIC_KEY[activeMetric];
  const values = entries.map((entry) => Number(entry[key] ?? 0));
  const labels = entries.map((entry) => entry.date.slice(5));

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Progress metric">
        {PROGRESS_CHART_METRICS.map((metric) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeMetric === metric.value}
            key={metric.value}
            onClick={() => onMetricChange(metric.value)}
            className={`px-3 py-1 text-xs font-semibold rounded-full motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page ${activeMetric === metric.value ? 'bg-primary text-on-primary' : 'bg-input text-secondary hover:text-primary'}`}
          >
            {metric.label}
          </button>
        ))}
      </div>

      {entries.length < 2 ? (
        <p className="text-sm text-secondary text-center py-6">Add at least 2 entries to see the chart.</p>
      ) : (
        <div className="overflow-x-auto" aria-label={`${activeMetric} progress chart`}>
          <ReactApexChart
            type="line"
            height={260}
            width="100%"
            series={[{ name: activeMetric, data: values }]}
            options={{
              chart: { toolbar: { show: false }, background: 'transparent', animations: { enabled: true } },
              theme: { mode: isDark ? 'dark' : 'light' },
              stroke: { curve: 'smooth', width: 3 },
              colors: ['var(--chart-primary)'],
              grid: { borderColor: 'var(--chart-grid)' },
              xaxis: { categories: labels, labels: { style: { colors: ['var(--text-secondary)'] } } },
              yaxis: { labels: { style: { colors: ['var(--text-secondary)'] } } },
              tooltip: { theme: isDark ? 'dark' : 'light' },
              markers: { size: 4 },
            }}
          />
        </div>
      )}
    </div>
  );
}
