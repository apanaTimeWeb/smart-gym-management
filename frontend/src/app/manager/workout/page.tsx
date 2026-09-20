// RESPONSIBILITY: Server Component — fetches initial SSR data and renders the Workout Library module entry point.
import { Suspense } from 'react';
import ManagerWorkoutLoading from '@/app/manager/workout/loading';
import ManagerWorkoutMain from '@/app/manager/workout/workout_components/ManagerWorkoutMain/ManagerWorkoutMain';


export default function WorkoutPage() {
 return (
    <Suspense fallback={<ManagerWorkoutLoading />}>
      <ManagerWorkoutMain />
    </Suspense>
  );
}
