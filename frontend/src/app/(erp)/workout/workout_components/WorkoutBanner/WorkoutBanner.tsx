"use client";

import { Dumbbell } from 'lucide-react';
import { useWorkoutContext } from '../../workout_context/WorkoutContext';

export default function WorkoutBanner() {
  const { workouts, exercises } = useWorkoutContext();

  return (
    <div className="rounded-xl p-5 text-white shadow-lg shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Complete Workout Database</h2>
          <p className="text-blue-100 mt-1 text-sm font-medium">
            {workouts.length} workout programs · {exercises.length} exercises
          </p>
        </div>
        <Dumbbell size={56} className="text-blue-300/40 transform -rotate-12" />
      </div>
    </div>
  );
}
