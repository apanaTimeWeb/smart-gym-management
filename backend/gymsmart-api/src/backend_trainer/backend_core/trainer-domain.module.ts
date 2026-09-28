// RESPONSIBILITY: Groups the eleven Trainer feature modules into the Trainer role/domain container without becoming the AI repair boundary.
// FLOW: AppModule → TrainerDomainModule → isolated Trainer feature modules.

import { Module } from '@nestjs/common';
import { TrainerAttendanceModule } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/trainer-attendance.module';
import { TrainerDashboardModule } from '@/backend_trainer/backend_trainer_modules/trainer_dashboard/trainer-dashboard.module';
import { TrainerEarningsModule } from '@/backend_trainer/backend_trainer_modules/trainer_earnings/trainer-earnings.module';
import { TrainerLibraryModule } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library.module';
import { TrainerMembersModule } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members.module';
import { TrainerNotificationsModule } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications.module';
import { TrainerProfileModule } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile.module';
import { TrainerProgressTrackingModule } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/trainer-progress-tracking.module';
import { TrainerScheduleModule } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule.module';
import { TrainerSessionsModule } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions.module';
import { TrainerWorkoutModule } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.module';


/**
 * Intent: Defines the TrainerDomainModule boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Module({
  imports: [TrainerAttendanceModule, TrainerDashboardModule, TrainerEarningsModule, TrainerLibraryModule, TrainerMembersModule, TrainerNotificationsModule, TrainerProfileModule, TrainerProgressTrackingModule, TrainerScheduleModule, TrainerSessionsModule, TrainerWorkoutModule],
  exports: [TrainerAttendanceModule, TrainerDashboardModule, TrainerEarningsModule, TrainerLibraryModule, TrainerMembersModule, TrainerNotificationsModule, TrainerProfileModule, TrainerProgressTrackingModule, TrainerScheduleModule, TrainerSessionsModule, TrainerWorkoutModule],
})
export class TrainerDomainModule {}
