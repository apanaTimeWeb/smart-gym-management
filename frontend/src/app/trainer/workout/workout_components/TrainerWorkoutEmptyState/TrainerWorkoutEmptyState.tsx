'use client';
// RESPONSIBILITY: Renders the empty state for the workout library.
import { Dumbbell, Plus } from 'lucide-react';

interface TrainerWorkoutEmptyStateProps {
  onAdd: () => void;
}

export default function TrainerWorkoutEmptyState({ onAdd }: TrainerWorkoutEmptyStateProps) {
  return (
    <div className="bg-card rounded-xl border border-dashed border-border p-12 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary-subtle flex items-center justify-center">
        <Dumbbell size={30} className="text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-primary">No Workout Plans</h3>
        <p className="text-sm text-secondary mt-1 max-w-xs mx-auto">
          You haven't created any workout plans yet. Build your first plan to assign to members.
        </p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="mt-2 flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:opacity-90 motion-safe:transition-all motion-safe:duration-base"
      >
        <Plus size={16} /> Create Plan
      </button>
    </div>
  );
}
