// RESPONSIBILITY: Entry component for the Workout Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { WorkoutProvider, useWorkoutContext } from '@/app/trainer/workout/workout_context/WorkoutContext';
import WorkoutBanner from '@/app/trainer/workout/workout_components/WorkoutBanner/WorkoutBanner';
import WorkoutToolbar from '@/app/trainer/workout/workout_components/WorkoutToolbar/WorkoutToolbar';
import WorkoutPlansGrid from '@/app/trainer/workout/workout_components/WorkoutPlansGrid/WorkoutPlansGrid';
import ExerciseTable from '@/app/trainer/workout/workout_components/ExerciseTable/ExerciseTable';
import WorkoutModal from '@/app/trainer/workout/workout_components/WorkoutModal/WorkoutModal';
import ExerciseModal from '@/app/trainer/workout/workout_components/ExerciseModal/ExerciseModal';


function WorkoutContent() {
 const { tab } = useWorkoutContext();

 return (
 <div className="min-h-full pb-10 workout-module bg-background text-foreground">
 <TrainerHeader title="Workout Library" subtitle="Comprehensive exercise and workout plan database" />
 
 <div className="p-6 space-y-5">
 <WorkoutBanner />

 <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
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

export default function WorkoutMain() {
 return (
 <WorkoutProvider>
 <WorkoutContent />
 </WorkoutProvider>
 );
}
