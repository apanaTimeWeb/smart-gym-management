// RESPONSIBILITY: Renders the top banner/hero section with module title and CTA for the Workout Library.
'use client';
import { Dumbbell } from 'lucide-react';
import { useWorkoutPlansQuery, useExercisesQuery } from '@/app/manager/workout/workout_hooks/ManagerUseManagerWorkoutQueries';


export default function ManagerWorkoutBanner() {
 const { data: workoutData } = useWorkoutPlansQuery({ page: '1' });
 const { data: exerciseData } = useExercisesQuery({ page: '1' });

 const totalWorkouts = workoutData?.total || 0;
 const totalExercises = exerciseData?.total || 0;

 return (
 <div className="rounded-xl p-5 text-on-primary shadow-card shadow-card bg-card border border-border">
 <div className="flex items-center justify-between">
 <div>
 <h2 className="text-xl font-bold">Complete Workout Database</h2>
 <p className="text-on-primary mt-1 text-sm font-medium">
 {totalWorkouts} workout programs · {totalExercises} exercises
 </p>
 </div>
 <Dumbbell size={56} className="text-info motion-safe:-rotate-12" />
 </div>
 </div>
 );
}
