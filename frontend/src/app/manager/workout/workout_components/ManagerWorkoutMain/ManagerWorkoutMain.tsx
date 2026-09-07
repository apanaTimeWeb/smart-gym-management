// RESPONSIBILITY: Entry component for the Workout Library module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import { WorkoutProvider, useWorkoutContext } from '@/app/manager/workout/workout_context/ManagerWorkoutContext';
import ManagerWorkoutBanner from '@/app/manager/workout/workout_components/ManagerWorkoutBanner/ManagerWorkoutBanner';
import ManagerWorkoutToolbar from '@/app/manager/workout/workout_components/ManagerWorkoutToolbar/ManagerWorkoutToolbar';
import ManagerWorkoutPlansGrid from '@/app/manager/workout/workout_components/ManagerWorkoutPlansGrid/ManagerWorkoutPlansGrid';
import ManagerWorkoutExerciseTable from '@/app/manager/workout/workout_components/ManagerWorkoutExerciseTable/ManagerWorkoutExerciseTable';
import ManagerWorkoutModal from '@/app/manager/workout/workout_components/ManagerWorkoutModal/ManagerWorkoutModal';
import ManagerWorkoutExerciseModal from '@/app/manager/workout/workout_components/ManagerWorkoutExerciseModal/ManagerWorkoutExerciseModal';


function WorkoutContent() {
 const { tab } = useWorkoutContext();

 return (
 <div className="min-h-full pb-10 workout-module bg-background text-foreground">
 <ManagerHeader title="Workout Management" subtitle="Comprehensive exercise and workout plan database" />
 
 <div className="p-6 space-y-5">
 <ManagerWorkoutBanner />

  <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
    <div className="border-b border-border flex gap-4 p-4">
      <button onClick={() => {}} className="px-4 py-2 font-semibold text-primary border-b-2 border-primary">View Workout Plans</button>
      <button onClick={() => {}} className="px-4 py-2 text-secondary hover:text-foreground">View Assigned Plans</button>
      <button onClick={() => {}} className="px-4 py-2 text-secondary hover:text-foreground">Exercise Library</button>
    </div>
    <ManagerWorkoutToolbar />

    <div className="p-5">
    {tab === 'Workout Plans' ? <ManagerWorkoutPlansGrid /> : <ManagerWorkoutExerciseTable />}
 </div>
 </div>
 </div>

 <ManagerWorkoutModal />
 <ManagerWorkoutExerciseModal />
 </div>
 );
}

export default function ManagerWorkoutMain() {
 return (
 <WorkoutProvider>
 <WorkoutContent />
 </WorkoutProvider>
 );
}
