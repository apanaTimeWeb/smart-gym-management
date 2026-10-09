// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerProgressTrackingLoadingSkeleton from '@/app/frontend_trainer/trainer_progress_tracking/trainer_progress_tracking_components/trainer_progress_tracking_loading_skeleton/TrainerProgressTrackingLoadingSkeleton';
/**
 * @description Provides the progress tracking route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented progress tracking module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerProgressTrackingLoading() { return <div data-testid="trainer_progress_tracking-route-loading"><TrainerProgressTrackingLoadingSkeleton /></div>; }
