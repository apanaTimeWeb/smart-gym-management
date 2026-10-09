import TrainerProgressTrackingNotFoundView from "@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_not_found_view/TrainerProgressTrackingNotFoundView";

/**
 * @description Provides the progress tracking route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingNotFound() {
  return <div data-testid="trainer_progress_tracking-route-not_found"><TrainerProgressTrackingNotFoundView /></div>;
}
