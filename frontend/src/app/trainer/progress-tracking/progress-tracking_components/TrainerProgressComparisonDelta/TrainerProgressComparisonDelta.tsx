// RESPONSIBILITY: Renders one comparison delta value with semantic trend styling.
'use client';
import type { TrainerProgressComparisonDeltaProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressComparisonDeltaProps';
import { formatNumber } from '@/lib/formatters';


export default function TrainerProgressComparisonDelta({ value, lowerIsBetter }: TrainerProgressComparisonDeltaProps) {
  if (value === null) return <span className="text-secondary">—</span>;
  const positive = lowerIsBetter ? value < 0 : value > 0;
  const neutral = value === 0;
  const sign = value > 0 ? '+' : '';
  return (
    <span className={neutral ? 'text-secondary' : positive ? 'text-success font-semibold' : 'text-danger font-semibold'}>
      {sign}{formatNumber(value)}
    </span>
  );
}
