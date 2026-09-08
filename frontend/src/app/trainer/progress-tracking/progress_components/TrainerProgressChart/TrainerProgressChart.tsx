'use client';
// RESPONSIBILITY: Renders a simple SVG line chart for a selected progress metric.
// DATA FLOW: useTrainerProgressLogic → TrainerProgressChart

import type { ProgressEntry, ProgressChartMetric } from '@/app/trainer/progress-tracking/progress_types/TrainerProgressTypes';
import { PROGRESS_CHART_METRICS } from '@/app/trainer/progress-tracking/progress_utils/TrainerProgressSharedConstants';

interface Props {
  entries: ProgressEntry[];
  activeMetric: ProgressChartMetric;
  onMetricChange: (m: ProgressChartMetric) => void;
}

const METRIC_KEY: Record<ProgressChartMetric, keyof ProgressEntry> = {
  weight: 'weightKg',
  bmi: 'bmi',
  bodyFat: 'bodyFatPercent',
  muscleMass: 'muscleMassKg',
};

export default function TrainerProgressChart({ entries, activeMetric, onMetricChange }: Props) {
  const key = METRIC_KEY[activeMetric];
  const values = entries.map((e) => Number(e[key] ?? 0));
  const labels = entries.map((e) => e.date.slice(5)); // MM-DD

  const W = 480;
  const H = 140;
  const PAD = 24;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const toX = (i: number) => PAD + (i / Math.max(values.length - 1, 1)) * (W - PAD * 2);
  const toY = (v: number) => PAD + (1 - (v - min) / range) * (H - PAD * 2);

  const points = values.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');

  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      {/* Metric tabs */}
      <div className="flex flex-wrap gap-2">
        {PROGRESS_CHART_METRICS.map((m) => (
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

      {entries.length < 2 ? (
        <p className="text-sm text-secondary text-center py-6">Add at least 2 entries to see the chart.</p>
      ) : (
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36" aria-label={`${activeMetric} chart`}>
            <polyline
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              points={points}
              className="motion-safe:transition-all"
            />
            {values.map((v, i) => (
              <g key={i}>
                <circle cx={toX(i)} cy={toY(v)} r="4" fill="var(--color-primary)" />
                <text x={toX(i)} y={H - 4} textAnchor="middle" fontSize="9" fill="var(--color-secondary)">
                  {labels[i]}
                </text>
                <text x={toX(i)} y={toY(v) - 8} textAnchor="middle" fontSize="9" fill="var(--color-foreground)">
                  {v}
                </text>
              </g>
            ))}
          </svg>
        </div>
      )}
    </div>
  );
}
