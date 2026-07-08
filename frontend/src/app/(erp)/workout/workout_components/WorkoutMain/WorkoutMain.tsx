"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import { WorkoutProvider, useWorkoutContext } from '../../workout_context/WorkoutContext';
import WorkoutBanner from '../WorkoutBanner/WorkoutBanner';
import WorkoutToolbar from '../WorkoutToolbar/WorkoutToolbar';
import WorkoutPlansGrid from '../WorkoutPlansGrid/WorkoutPlansGrid';
import ExerciseTable from '../ExerciseTable/ExerciseTable';
import WorkoutModal from '../WorkoutModal/WorkoutModal';
import ExerciseModal from '../ExerciseModal/ExerciseModal';

import '../../workout.css';

function WorkoutContent() {
 const { tab } = useWorkoutContext();

 return (
 <div className="min-h-full pb-10 workout-module bg-[var(--bg-page)] text-[var(--workout-text-primary)]">
 <ErpHeader title="Workout Library" subtitle="Comprehensive exercise and workout plan database" />
 
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

export default function WorkoutMain() {
 return (
 <WorkoutProvider>
 <WorkoutContent />
 </WorkoutProvider>
 );
}
