// RESPONSIBILITY: Empty state UI for the Progress Tracking module.
'use client';

import { TrendingUp } from 'lucide-react';
import type { TrainerProgressEmptyStateProps } from '@/app/trainer/progress-tracking/progress-tracking_types/TrainerProgressEmptyStateProps';



export default function TrainerProgressEmptyState({ onAdd }: TrainerProgressEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-14 h-14 rounded-full bg-surface-highlight flex items-center justify-center mb-4">
        <TrendingUp className="w-7 h-7 text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-primary mb-1">No progress entries yet</h3>
      <p className="text-sm text-secondary max-w-sm mb-6">
        Start tracking body measurements and fitness metrics for this member.
      </p>
      <button type="button"
        onClick={onAdd}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-opacity"
      >
        Add First Entry
      </button>
    </div>
  );
}
