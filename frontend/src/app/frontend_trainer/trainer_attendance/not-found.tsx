import TrainerAttendanceNotFoundView from "@/app/frontend_trainer/trainer_attendance/trainer_attendance_components/trainer_attendance_not_found_view/TrainerAttendanceNotFoundView";

/**
 * @description Provides the attendance route not-found presentation and recovery/navigation affordances.
 * @dependencies Uses only documented attendance module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerAttendanceNotFound() {
  return <div data-testid="trainer_attendance-route-not_found"><TrainerAttendanceNotFoundView /></div>;
}
