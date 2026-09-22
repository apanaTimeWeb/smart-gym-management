// RESPONSIBILITY: Defines the single infrastructure-level registry used by dynamic tenant TypeORM DataSources.
// FLOW: CoreTenantDataSourceResolver → explicit tenant entity registry.


export { CoreAuditLogEntity } from '@/backend_trainer/core/database/core-audit-log.entity';
export { AttendanceRecordEntity } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.entity';
export { LibraryDietPlanEntity } from '@/backend_trainer/modules/backend_trainer/library/library-diet-plan.entity';
export { LibraryDietPlanAssignmentEntity } from '@/backend_trainer/modules/backend_trainer/library/library-diet-plan-assignment.entity';
export { EarningsHistoryEntity } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-history.entity';
export { EarningsPayoutEntity } from '@/backend_trainer/modules/backend_trainer/earnings/earnings-payout.entity';
export { MembersMemberEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member.entity';
export { MembersMemberNoteEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.entity';
export { NotificationsNotificationEntity } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-notification.entity';
export { NotificationsNotificationPreferenceEntity } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-notification-preference.entity';
export { ProgressTrackingProgressEntryEntity } from '@/backend_trainer/modules/backend_trainer/progress-tracking/progress-tracking-progress-entry.entity';
export { ScheduleLeaveRequestEntity } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-leave-request.entity';
export { ScheduleWeeklyAvailabilityEntity } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-weekly-availability.entity';
export { SessionsSessionEntity } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-session.entity';
export { WorkoutExerciseEntity } from '@/backend_trainer/modules/backend_trainer/workout/workout-exercise.entity';
export { WorkoutEntity } from '@/backend_trainer/modules/backend_trainer/workout/workout.entity';
export { ProfileTrainerProfileEntity } from '@/backend_trainer/modules/backend_trainer/profile/profile-trainer-profile.entity';
