'use client';
// RESPONSIBILITY: ApexCharts grouped bar chart for multi-member progress comparison.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressComparisonChart
// Uses dynamic import (no SSR) per web_global_design.md Rule — ApexCharts only.

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import type { ComparisonMemberSnapshot, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { COMPARISON_METRICS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';
import type { ApexOptions } from 'apexcharts';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const THEME_MEMBER_TOKENS = ['--primary', '--success', '--info', '--danger'] as const;

interface TrainerProgressComparisonChartProps {
  snapshots: ComparisonMemberSnapshot[];
  activeMetric: ComparisonMetric;
  onMetricChange: (m: ComparisonMetric) => void;
}

export default function TrainerProgressComparisonChart({ snapshots, activeMetric, onMetricChange }: TrainerProgressComparisonChartProps) {
  const metricConfig = COMPARISON_METRICS.find(m => m.value === activeMetric)!;
  const [chartColors, setChartColors] = useState<string[]>([]);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    setChartColors(THEME_MEMBER_TOKENS.map((token) => styles.getPropertyValue(token).trim()).filter(Boolean));
  }, []);

  const series = snapshots.map((s, i) => ({
    name: s.memberName,
    data: [s[activeMetric] ?? 0],
    color: chartColors[i % chartColors.length],
  }));

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 400 },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 6,
        dataLabels: { position: 'top' },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}${metricConfig.unit}`,
      style: { fontSize: '11px', colors: chartColors.length ? [chartColors[0] as string] : undefined },
      offsetY: -20,
    },
    xaxis: {
      categories: [metricConfig.label],
      labels: { style: { colors: chartColors.length ? [chartColors[0] as string] : undefined, fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: chartColors.length ? [chartColors[0] as string] : undefined, fontSize: '11px' },
        formatter: (val: number) => `${val}${metricConfig.unit}`,
      },
    },
    grid: {
      borderColor: 'var(--border)',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: { colors: chartColors.length ? chartColors[0] : undefined },
      markers: { size: 8 },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `${val}${metricConfig.unit}` },
    },
    colors: chartColors.length ? chartColors : undefined,
  };

  if (snapshots.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center text-sm text-secondary">
        Select at least one member to see the chart.
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex flex-wrap gap-2">
        {COMPARISON_METRICS.map(m => (
          <button
            key={m.value}
            onClick={() => onMetricChange(m.value)}
            className={`px-3 py-1 text-xs font-semibold rounded-full motion-safe:transition-colors ${
              activeMetric === m.value
                ? 'bg-primary text-white'
                : 'bg-input text-secondary hover:text-foreground'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <ApexChart
        type="bar"
        series={series}
        options={options}
        height={280}
      />
    </div>
  );
}
