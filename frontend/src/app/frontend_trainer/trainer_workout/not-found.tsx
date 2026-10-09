import TrainerWorkoutNotFoundView from "@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_not_found_view/TrainerWorkoutNotFoundView";

/**
 * @description Provides the workout route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutNotFound() {
  return <div data-testid="trainer_workout-route-not_found"><TrainerWorkoutNotFoundView /></div>;
}
