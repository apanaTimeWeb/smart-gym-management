import { Module } from '@nestjs/common';
import { AttendanceModule } from '@/backend_trainer/modules/backend_trainer/attendance/attendance.module';
import { DashboardModule } from '@/backend_trainer/modules/backend_trainer/dashboard/dashboard.module';
import { EarningsModule } from '@/backend_trainer/modules/backend_trainer/earnings/earnings.module';
import { LibraryModule } from '@/backend_trainer/modules/backend_trainer/library/library.module';
import { MembersModule } from '@/backend_trainer/modules/backend_trainer/members/members.module';
import { NotificationsModule } from '@/backend_trainer/modules/backend_trainer/notifications/notifications.module';
import { ProfileModule } from '@/backend_trainer/modules/backend_trainer/profile/profile.module';
import { ProgressTrackingModule } from '@/backend_trainer/modules/backend_trainer/progress-tracking/progress-tracking.module';
import { ScheduleModule } from '@/backend_trainer/modules/backend_trainer/schedule/schedule.module';
import { SessionsModule } from '@/backend_trainer/modules/backend_trainer/sessions/sessions.module';
import { WorkoutModule } from '@/backend_trainer/modules/backend_trainer/workout/workout.module';

@Module({
  imports: [
    AttendanceModule,
    DashboardModule,
    EarningsModule,
    LibraryModule,
    MembersModule,
    NotificationsModule,
    ProfileModule,
    ProgressTrackingModule,
    ScheduleModule,
    SessionsModule,
    WorkoutModule,
  ],
  exports: [
    AttendanceModule,
    DashboardModule,
    EarningsModule,
    LibraryModule,
    MembersModule,
    NotificationsModule,
    ProfileModule,
    ProgressTrackingModule,
    ScheduleModule,
    SessionsModule,
    WorkoutModule,
  ]
})
export class TrainerDomainModule {}
