import TrainerLibraryNotFoundView from "@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_not_found_view/TrainerLibraryNotFoundView";

/**
 * @description Provides the library route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryNotFound() {
  return <div data-testid="trainer_library-route-not_found"><TrainerLibraryNotFoundView /></div>;
}
