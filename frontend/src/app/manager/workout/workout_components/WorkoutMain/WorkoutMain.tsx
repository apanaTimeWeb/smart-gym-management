// RESPONSIBILITY: Entry component for the Workout Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { WorkoutProvider, useWorkoutContext } from '@/app/manager/workout/workout_context/WorkoutContext';
import WorkoutBanner from '@/app/manager/workout/workout_components/WorkoutBanner/WorkoutBanner';
import WorkoutToolbar from '@/app/manager/workout/workout_components/WorkoutToolbar/WorkoutToolbar';
import WorkoutPlansGrid from '@/app/manager/workout/workout_components/WorkoutPlansGrid/WorkoutPlansGrid';
import ExerciseTable from '@/app/manager/workout/workout_components/ExerciseTable/ExerciseTable';
import WorkoutModal from '@/app/manager/workout/workout_components/WorkoutModal/WorkoutModal';
import ExerciseModal from '@/app/manager/workout/workout_components/ExerciseModal/ExerciseModal';


function WorkoutContent() {
 const { tab } = useWorkoutContext();

 return (
 <div className="min-h-full pb-10 workout-module bg-background text-foreground">
 <ManagerHeader title="Workout Library" subtitle="Comprehensive exercise and workout plan database" />
 
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
