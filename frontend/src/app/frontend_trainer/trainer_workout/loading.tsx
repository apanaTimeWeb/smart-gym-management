// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerWorkoutLoadingSkeleton from '@/app/frontend_trainer/trainer_workout/trainer_workout_components/trainer_workout_loading_skeleton/TrainerWorkoutLoadingSkeleton';
/**
 * @description Provides the workout route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented workout module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerWorkoutLoading() { return <div data-testid="trainer_workout-route-loading"><TrainerWorkoutLoadingSkeleton /></div>; }
