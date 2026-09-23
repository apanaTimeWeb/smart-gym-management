// RESPONSIBILITY: Owns the backend application NestJS module registration boundary.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { AttendanceModule } from '@/backend_manager/modules/backend_manager/attendance/attendance-module';
import { CommunicationsModule } from '@/backend_manager/modules/backend_manager/communications/communications-module';
import { DashboardModule } from '@/backend_manager/modules/backend_manager/dashboard/dashboard-module';
import { ExpensesModule } from '@/backend_manager/modules/backend_manager/expenses/expenses-module';
import { FinanceModule } from '@/backend_manager/modules/backend_manager/finance/finance-module';
import { GrievanceModule } from '@/backend_manager/modules/backend_manager/grievance/grievance-module';
import { HrModule } from '@/backend_manager/modules/backend_manager/hr/hr-module';
import { InquiriesModule } from '@/backend_manager/modules/backend_manager/inquiries/inquiries-module';
import { LibraryModule } from '@/backend_manager/modules/backend_manager/library/library-module';
import { MaintenanceModule } from '@/backend_manager/modules/backend_manager/maintenance/maintenance-module';
import { MembersModule } from '@/backend_manager/modules/backend_manager/members/members-module';
import { NotificationsModule } from '@/backend_manager/modules/backend_manager/notifications/notifications-module';
import { PlansModule } from '@/backend_manager/modules/backend_manager/plans/plans-module';
import { ProfileModule } from '@/backend_manager/modules/backend_manager/profile/profile-module';
import { PtModule } from '@/backend_manager/modules/backend_manager/pt/pt-module';
import { ReferralsModule } from '@/backend_manager/modules/backend_manager/referrals/referrals-module';
import { ReportsModule } from '@/backend_manager/modules/backend_manager/reports/reports-module';
import { SalesModule } from '@/backend_manager/modules/backend_manager/sales/sales-module';
import { ScheduleModule } from '@/backend_manager/modules/backend_manager/schedule/schedule-module';
import { SettingsModule } from '@/backend_manager/modules/backend_manager/settings/settings-module';
import { StoreModule } from '@/backend_manager/modules/backend_manager/store/store-module';
import { WorkoutModule } from '@/backend_manager/modules/backend_manager/workout/workout-module';

import { ManagerCoreModule } from '@/backend_manager/core/manager-core.module';

@Module({
  imports: [ManagerCoreModule, AttendanceModule, CommunicationsModule, DashboardModule, ExpensesModule, FinanceModule, GrievanceModule, HrModule, InquiriesModule, LibraryModule, MaintenanceModule, MembersModule, NotificationsModule, PlansModule, ProfileModule, PtModule, ReferralsModule, ReportsModule, SalesModule, ScheduleModule, SettingsModule, StoreModule, WorkoutModule],
})
export class ManagerDomainModule {}
