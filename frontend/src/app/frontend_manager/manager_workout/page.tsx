// RESPONSIBILITY: Renders the manager_workout route boundary (WorkoutPage) and delegates feature behavior to module-owned components/hooks; it does not own transport logic.
import { Suspense } from 'react';
import ManagerWorkoutLoading from '@/app/frontend_manager/manager_workout/loading';
import ManagerWorkoutMain from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_main/ManagerWorkoutMain';


/** @description Route-level WorkoutPage for the Manager frontend module. */
export default function WorkoutPage() {
 return (
    <Suspense fallback={<ManagerWorkoutLoading />}>
      <ManagerWorkoutMain />
    </Suspense>
  );
}
