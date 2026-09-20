// RESPONSIBILITY: Renders the top banner/hero section with module title and CTA for the Workout Library.
'use client';
import { Dumbbell } from 'lucide-react';
import { useTrainerWorkoutsQuery, useTrainerExercisesQuery } from '@/app/trainer/workout/workout_queries/TrainerUseWorkoutQuery';
import { useTrainerWorkoutFilters } from '@/app/trainer/workout/workout_utils/useTrainerWorkoutFilters';

export default function TrainerWorkoutBanner() {
  const { search, category, page, sortBy, sortDirection } = useTrainerWorkoutFilters();
  const { data: wData } = useTrainerWorkoutsQuery(search, category, page, sortBy, sortDirection);
  const { data: eData } = useTrainerExercisesQuery(search, category, page, sortBy, sortDirection);

 return (
 <div className="rounded-xl p-5 text-on-primary bg-card border border-primary shadow-card">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold">Complete Workout Database</h2>
 <p className="text-on-primary mt-1 text-sm font-medium">
 {wData?.total ?? 0} workout programs · {eData?.total ?? 0} exercises
 </p>
 </div>
 <Dumbbell size={18} className="text-info transform -rotate-12" />
 </div>
 </div>
 );
}
