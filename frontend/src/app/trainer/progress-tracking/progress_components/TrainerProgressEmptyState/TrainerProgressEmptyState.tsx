'use client';
// RESPONSIBILITY: Empty state UI for the Progress Tracking module.

import { TrendingUp } from 'lucide-react';

interface Props {
  onAdd: () => void;
}

export default function TrainerProgressEmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
        <TrendingUp className="w-7 h-7 text-secondary" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No progress entries yet</h3>
      <p className="text-sm text-secondary max-w-sm mb-6">
        Start tracking body measurements and fitness metrics for this member.
      </p>
      <button
        onClick={onAdd}
        className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 motion-safe:transition-opacity"
      >
        Add First Entry
      </button>
    </div>
  );
}
