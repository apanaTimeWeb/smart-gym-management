'use client';
// RESPONSIBILITY: ApexCharts grouped bar chart for multi-member progress comparison.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressComparisonChart
// Uses dynamic import (no SSR) per web_global_design.md Rule — ApexCharts only.

import dynamic from 'next/dynamic';
import type { ComparisonMemberSnapshot, ComparisonMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { COMPARISON_METRICS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Gold-anchored palette for up to 4 members
const MEMBER_COLORS = ['#FACC15', '#34D399', '#60A5FA', '#F87171'];

interface Props {
  snapshots: ComparisonMemberSnapshot[];
  activeMetric: ComparisonMetric;
  onMetricChange: (m: ComparisonMetric) => void;
}

export default function TrainerProgressComparisonChart({ snapshots, activeMetric, onMetricChange }: Props) {
  const metricConfig = COMPARISON_METRICS.find(m => m.value === activeMetric)!;

  const series = snapshots.map((s, i) => ({
    name: s.memberName,
    data: [s[activeMetric] ?? 0],
    color: MEMBER_COLORS[i % MEMBER_COLORS.length] || '#FACC15',
  }));

  const options: ApexCharts.ApexOptions = {
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
      style: { fontSize: '11px', colors: ['#94A3B8'] },
      offsetY: -20,
    },
    xaxis: {
      categories: [metricConfig.label],
      labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { colors: '#94A3B8', fontSize: '11px' },
        formatter: (val: number) => `${val}${metricConfig.unit}`,
      },
    },
    grid: {
      borderColor: '#1E293B',
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: { colors: '#94A3B8' },
      markers: { size: 8 },
    },
    tooltip: {
      theme: 'dark',
      y: { formatter: (val: number) => `${val}${metricConfig.unit}` },
    },
    colors: snapshots.map((_, i) => MEMBER_COLORS[i % MEMBER_COLORS.length] || '#FACC15'),
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
