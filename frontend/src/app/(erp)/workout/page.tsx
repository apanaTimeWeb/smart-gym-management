"use client";

import Header from '@/components/Header';
import { WorkoutProvider, useWorkoutContext } from './workout_context/WorkoutContext';
import WorkoutBanner from './workout_components/WorkoutBanner/WorkoutBanner';
import WorkoutToolbar from './workout_components/WorkoutToolbar/WorkoutToolbar';
import WorkoutPlansGrid from './workout_components/WorkoutPlansGrid/WorkoutPlansGrid';
import ExerciseTable from './workout_components/ExerciseTable/ExerciseTable';
import WorkoutModal from './workout_components/WorkoutModal/WorkoutModal';
import ExerciseModal from './workout_components/ExerciseModal/ExerciseModal';

import './workout.css';

function WorkoutContent() {
  const { tab } = useWorkoutContext();

  return (
    <div className="min-h-full pb-10 workout-module bg-[var(--bg-page)] text-[var(--workout-text-primary)]">
      <Header title="Workout Library" subtitle="Comprehensive exercise and workout plan database" />
      
      <div className="p-6 space-y-5">
        <WorkoutBanner />

        <div className="bg-[var(--workout-bg-card)] rounded-xl shadow-sm border border-[var(--workout-border)] overflow-hidden">
          <WorkoutToolbar />

          <div className="p-5">
            {tab === 'Workout Plans' ? <WorkoutPlansGrid /> : <ExerciseTable />}
          </div>
        </div>
      </div>

      <WorkoutModal />
      <ExerciseModal />
    </div>
  );
}

export default function WorkoutPage() {
  return (
    <WorkoutProvider>
      <WorkoutContent />
    </WorkoutProvider>
  );
}
