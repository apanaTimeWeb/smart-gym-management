// RESPONSIBILITY: Manager role domain container registering isolated feature modules only.
// FLOW: CoreAppModule -> ManagerDomainModule -> individual feature module boundaries.
import { Module } from '@nestjs/common';

import { AttendanceModule } from '@/backend_manager/modules/manager/attendance/attendance-module';
import { CommunicationsModule } from '@/backend_manager/modules/manager/communications/communications-module';
import { DashboardModule } from '@/backend_manager/modules/manager/dashboard/dashboard-module';
import { ExpensesModule } from '@/backend_manager/modules/manager/expenses/expenses-module';
import { FinanceModule } from '@/backend_manager/modules/manager/finance/finance-module';
import { GrievanceModule } from '@/backend_manager/modules/manager/grievance/grievance-module';
import { HrModule } from '@/backend_manager/modules/manager/hr/hr-module';
import { InquiriesModule } from '@/backend_manager/modules/manager/inquiries/inquiries-module';
import { LibraryModule } from '@/backend_manager/modules/manager/library/library-module';
import { MaintenanceModule } from '@/backend_manager/modules/manager/maintenance/maintenance-module';
import { MembersModule } from '@/backend_manager/modules/manager/members/members-module';
import { NotificationsModule } from '@/backend_manager/modules/manager/notifications/notifications-module';
import { PlansModule } from '@/backend_manager/modules/manager/plans/plans-module';
import { ProfileModule } from '@/backend_manager/modules/manager/profile/profile-module';
import { PtModule } from '@/backend_manager/modules/manager/pt/pt-module';
import { ReferralsModule } from '@/backend_manager/modules/manager/referrals/referrals-module';
import { ReportsModule } from '@/backend_manager/modules/manager/reports/reports-module';
import { SalesModule } from '@/backend_manager/modules/manager/sales/sales-module';
import { ScheduleModule } from '@/backend_manager/modules/manager/schedule/schedule-module';
import { SettingsModule } from '@/backend_manager/modules/manager/settings/settings-module';
import { StoreModule } from '@/backend_manager/modules/manager/store/store-module';
import { WorkoutModule } from '@/backend_manager/modules/manager/workout/workout-module';

@Module({
  imports: [AttendanceModule, CommunicationsModule, DashboardModule, ExpensesModule, FinanceModule, GrievanceModule, HrModule, InquiriesModule, LibraryModule, MaintenanceModule, MembersModule, NotificationsModule, PlansModule, ProfileModule, PtModule, ReferralsModule, ReportsModule, SalesModule, ScheduleModule, SettingsModule, StoreModule, WorkoutModule],
})
export class ManagerDomainModule {}
