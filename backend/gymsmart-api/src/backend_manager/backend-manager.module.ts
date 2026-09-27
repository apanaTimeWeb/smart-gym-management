// RESPONSIBILITY: Owns the backend application NestJS module registration boundary.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { Module } from '@nestjs/common';

import { ManagerAttendanceModule } from '@/backend_manager/manager_modules/attendance/manager-attendance.module';
import { ManagerCommunicationsModule } from '@/backend_manager/manager_modules/communications/manager-communications.module';
import { ManagerDashboardModule } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.module';
import { ManagerExpensesModule } from '@/backend_manager/manager_modules/expenses/manager-expenses.module';
import { ManagerFinanceModule } from '@/backend_manager/manager_modules/finance/manager-finance.module';
import { ManagerGrievanceModule } from '@/backend_manager/manager_modules/grievance/manager-grievance.module';
import { ManagerHrModule } from '@/backend_manager/manager_modules/hr/manager-hr.module';
import { ManagerInquiriesModule } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.module';
import { ManagerLibraryModule } from '@/backend_manager/manager_modules/library/manager-library.module';
import { ManagerMaintenanceModule } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.module';
import { ManagerMembersModule } from '@/backend_manager/manager_modules/members/manager-members.module';
import { ManagerNotificationsModule } from '@/backend_manager/manager_modules/notifications/manager-notifications.module';
import { ManagerPlansModule } from '@/backend_manager/manager_modules/plans/manager-plans.module';
import { ManagerProfileModule } from '@/backend_manager/manager_modules/profile/manager-profile.module';
import { ManagerPtModule } from '@/backend_manager/manager_modules/pt/manager-pt.module';
import { ManagerReferralsModule } from '@/backend_manager/manager_modules/referrals/manager-referrals.module';
import { ManagerReportsModule } from '@/backend_manager/manager_modules/reports/manager-reports.module';
import { ManagerSalesModule } from '@/backend_manager/manager_modules/sales/manager-sales.module';
import { ManagerScheduleModule } from '@/backend_manager/manager_modules/schedule/manager-schedule.module';
import { ManagerSettingsModule } from '@/backend_manager/manager_modules/settings/manager-settings.module';
import { ManagerStoreModule } from '@/backend_manager/manager_modules/store/manager-store.module';
import { ManagerWorkoutModule } from '@/backend_manager/manager_modules/workout/manager-workout.module';

import { ManagerCoreModule } from '@/backend_manager/manager_core/manager-core.module';

@Module({
  imports: [ManagerCoreModule, ManagerAttendanceModule, ManagerCommunicationsModule, ManagerDashboardModule, ManagerExpensesModule, ManagerFinanceModule, ManagerGrievanceModule, ManagerHrModule, ManagerInquiriesModule, ManagerLibraryModule, ManagerMaintenanceModule, ManagerMembersModule, ManagerNotificationsModule, ManagerPlansModule, ManagerProfileModule, ManagerPtModule, ManagerReferralsModule, ManagerReportsModule, ManagerSalesModule, ManagerScheduleModule, ManagerSettingsModule, ManagerStoreModule, ManagerWorkoutModule],
})
export class BackendManagerModule {}
