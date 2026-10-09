import TrainerProfileNotFoundView from "@/app/frontend_trainer/trainer_profile/trainer_profile_components/trainer_profile_not_found_view/TrainerProfileNotFoundView";

/**
 * @description Provides the profile route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented profile module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProfileNotFound() {
  return <div data-testid="trainer_profile-route-not_found"><TrainerProfileNotFoundView /></div>;
}
