// RESPONSIBILITY: WorkoutMain.tsx handles the logic and UI for its corresponding feature.
"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import { WorkoutProvider, useWorkoutContext } from '@/app/erp/workout/workout_context/WorkoutContext';
import WorkoutBanner from '@/app/erp/workout/workout_components/WorkoutBanner/WorkoutBanner';
import WorkoutToolbar from '@/app/erp/workout/workout_components/WorkoutToolbar/WorkoutToolbar';
import WorkoutPlansGrid from '@/app/erp/workout/workout_components/WorkoutPlansGrid/WorkoutPlansGrid';
import ExerciseTable from '@/app/erp/workout/workout_components/ExerciseTable/ExerciseTable';
import WorkoutModal from '@/app/erp/workout/workout_components/WorkoutModal/WorkoutModal';
import ExerciseModal from '@/app/erp/workout/workout_components/ExerciseModal/ExerciseModal';

import '@/app/erp/workout/workout.css';

function WorkoutContent() {
 const { tab } = useWorkoutContext();

 return (
 <div className="min-h-full pb-10 workout-module bg-background text-foreground">
 <ErpHeader title="Workout Library" subtitle="Comprehensive exercise and workout plan database" />
 
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
