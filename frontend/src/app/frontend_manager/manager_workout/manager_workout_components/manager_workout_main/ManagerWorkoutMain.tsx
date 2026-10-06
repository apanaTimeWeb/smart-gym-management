// RESPONSIBILITY: Renders ManagerWorkoutMain's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
"use client";

import { ManagerWorkoutContent } from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_main/manager_workout_content/ManagerWorkoutContent';

/** @description Entry component for the Workout Library module. Wraps the UI in the hook-based state facade and handles page layout. @dependencies Local dependencies are owned by this feature module (1 documented module/import dependencies).. @edge-case Preserves the documented interaction and boundary states. */
export default function ManagerWorkoutMain() {
  return <ManagerWorkoutContent />;
}
