// RESPONSIBILITY: Defines the single infrastructure-level registry used by dynamic tenant TypeORM DataSources.
// FLOW: CoreTenantDatasourceResolver → explicit tenant entity registry.


export { CoreAuditLogEntity } from '@/backend_trainer/backend_core/core_database/core-audit-log.entity';
export { CoreImmutableDomainEventEntity } from '@/backend_trainer/backend_core/core_audit/core-immutable-domain-event.entity';
export { TrainerAttendanceRecordEntity } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance-record.entity';
export { TrainerLibraryDietPlanEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan.entity';
export { TrainerLibraryDietPlanAssignmentEntity } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-diet-plan-assignment.entity';
export { TrainerEarningsHistoryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-history.entity';
export { TrainerEarningsPayoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings-payout.entity';
export { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';
export { TrainerMembersMemberNoteEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.entity';
export { TrainerNotificationsNotificationEntity } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.entity';
export { TrainerNotificationsNotificationPreferenceEntity } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification-preference.entity';
export { TrainerProgressTrackingProgressEntryEntity } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking-progress-entry.entity';
export { TrainerScheduleLeaveRequestEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave-request.entity';
export { TrainerScheduleWeeklyAvailabilityEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-weekly-availability.entity';
export { TrainerSessionsSessionEntity } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-session.entity';
export { TrainerWorkoutExerciseEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.entity';
export { TrainerWorkoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.entity';
export { TrainerProfileTrainerProfileEntity } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-trainer-profile.entity';
