// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Renders the top banner/hero section with module title and CTA for the Workout Library.
'use client';

import { Dumbbell } from 'lucide-react';
import { useTrainerWorkoutsQuery, useTrainerExercisesQuery } from '@/app/trainer/workout/workout_queries/useWorkoutQuery';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';

export default function TrainerWorkoutBanner() {
  const { search, category, page } = useTrainerWorkoutFilters();
  const { data: wData } = useTrainerWorkoutsQuery(search, category, page);
  const { data: eData } = useTrainerExercisesQuery(search, category, page);

 return (
 <div className="rounded-xl p-5 text-white shadow-lg shadow-info/20" style={{ background: 'linear-gradient(135deg, var(--workout-banner-gradient-start), var(--workout-banner-gradient-end))' }}>
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold">Complete Workout Database</h2>
 <p className="text-white/80 mt-1 text-sm font-medium">
 {wData?.total ?? 0} workout programs · {eData?.total ?? 0} exercises
 </p>
 </div>
 <Dumbbell size={56} className="text-info/40 transform -rotate-12" />
 </div>
 </div>
 );
}
