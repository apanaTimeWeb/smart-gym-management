// RESPONSIBILITY: Renders the empty state for the sessions list when no sessions are found for the selected date/filter.
'use client';
import { Calendar } from 'lucide-react';
import type { TrainerSessionsEmptyStateProps } from '@/app/trainer/sessions/sessions_types/TrainerSessionsEmptyStateProps';

export default function TrainerSessionsEmptyState({ onSchedule }: TrainerSessionsEmptyStateProps) {
  return (
    <div className="bg-card rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center">
        <Calendar size={18} className="text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-primary">No Sessions Scheduled</h3>
        <p className="text-sm text-secondary mt-1 max-w-xs mx-auto">
          You have no sessions for this day or filter. Schedule a PT session or group class to get started.
        </p>
      </div>
      <button
        type="button"
        onClick={onSchedule}
        className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
      >
        + Schedule Session
      </button>
    </div>
  );
}
