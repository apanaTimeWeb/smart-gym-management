// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerLibraryLoadingSkeleton from '@/app/frontend_trainer/trainer_library/trainer_library_components/trainer_library_loading_skeleton/TrainerLibraryLoadingSkeleton';
/**
 * @description Provides the library route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerLibraryLoading() { return <div data-testid="trainer_library-route-loading"><TrainerLibraryLoadingSkeleton /></div>; }
