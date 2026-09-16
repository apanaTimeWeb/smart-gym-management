import { Suspense } from 'react';
// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Workout Library module entry point.
import ManagerWorkoutMain from '@/app/manager/workout/workout_components/ManagerWorkoutMain/ManagerWorkoutMain';

export default function WorkoutPage() {
 return (
    <Suspense fallback={<div className="p-6 flex justify-center text-secondary">Loading...</div>}>
      <ManagerWorkoutMain />
    </Suspense>
  );
}
