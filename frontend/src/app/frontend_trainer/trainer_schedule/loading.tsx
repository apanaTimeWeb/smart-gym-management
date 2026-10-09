// RESPONSIBILITY: Renders the owning Trainer route loading state using the module design-system patterns.
import TrainerScheduleLoadingSkeleton from '@/app/frontend_trainer/trainer_schedule/trainer_schedule_components/trainer_schedule_loading_skeleton/TrainerScheduleLoadingSkeleton';
/**
 * @description Provides the schedule route loading state while preserving the global shell geometry and accessibility expectations.
 * @dependencies Uses only documented schedule module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerScheduleLoading() { return <div data-testid="trainer_schedule-route-loading"><TrainerScheduleLoadingSkeleton /></div>; }
