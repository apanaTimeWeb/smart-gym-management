// RESPONSIBILITY: Manager role domain container registering isolated feature modules only.
// FLOW: CoreAppModule -> ManagerDomainModule -> individual feature module boundaries.
import { Module } from '@nestjs/common';

import { AttendanceModule } from '@/modules/manager/attendance/attendance-module';
import { CommunicationsModule } from '@/modules/manager/communications/communications-module';
import { DashboardModule } from '@/modules/manager/dashboard/dashboard-module';
import { ExpensesModule } from '@/modules/manager/expenses/expenses-module';
import { FinanceModule } from '@/modules/manager/finance/finance-module';
import { GrievanceModule } from '@/modules/manager/grievance/grievance-module';
import { HrModule } from '@/modules/manager/hr/hr-module';
import { InquiriesModule } from '@/modules/manager/inquiries/inquiries-module';
import { LibraryModule } from '@/modules/manager/library/library-module';
import { MaintenanceModule } from '@/modules/manager/maintenance/maintenance-module';
import { MembersModule } from '@/modules/manager/members/members-module';
import { NotificationsModule } from '@/modules/manager/notifications/notifications-module';
import { PlansModule } from '@/modules/manager/plans/plans-module';
import { ProfileModule } from '@/modules/manager/profile/profile-module';
import { PtModule } from '@/modules/manager/pt/pt-module';
import { ReferralsModule } from '@/modules/manager/referrals/referrals-module';
import { ReportsModule } from '@/modules/manager/reports/reports-module';
import { SalesModule } from '@/modules/manager/sales/sales-module';
import { ScheduleModule } from '@/modules/manager/schedule/schedule-module';
import { SettingsModule } from '@/modules/manager/settings/settings-module';
import { StoreModule } from '@/modules/manager/store/store-module';
import { WorkoutModule } from '@/modules/manager/workout/workout-module';

@Module({
  imports: [AttendanceModule, CommunicationsModule, DashboardModule, ExpensesModule, FinanceModule, GrievanceModule, HrModule, InquiriesModule, LibraryModule, MaintenanceModule, MembersModule, NotificationsModule, PlansModule, ProfileModule, PtModule, ReferralsModule, ReportsModule, SalesModule, ScheduleModule, SettingsModule, StoreModule, WorkoutModule],
})
export class ManagerDomainModule {}
