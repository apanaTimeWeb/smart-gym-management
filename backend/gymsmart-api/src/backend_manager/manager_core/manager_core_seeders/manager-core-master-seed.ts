// RESPONSIBILITY: Owns Manager master seeding orchestration without creating global ORM connections.
// FLOW: Tenant DataSource -> deterministic feature seeders -> stable idempotent rows.
import { DataSource } from 'typeorm';

import { ManagerFinanceSeeder } from '@/backend_manager/manager_modules/finance/manager-finance.seeder';
import { ManagerReportsSeeder } from '@/backend_manager/manager_modules/reports/manager-reports.seeder';
import { ManagerScheduleSeeder } from '@/backend_manager/manager_modules/schedule/manager-schedule.seeder';
import { ManagerSalesSeeder } from '@/backend_manager/manager_modules/sales/manager-sales.seeder';
import { ManagerPlansSeeder } from '@/backend_manager/manager_modules/plans/manager-plans.seeder';
import { ManagerNotificationsSeeder } from '@/backend_manager/manager_modules/notifications/manager-notifications.seeder';
import { ManagerInquiriesSeeder } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.seeder';
import { ManagerExpensesSeeder } from '@/backend_manager/manager_modules/expenses/manager-expenses.seeder';
import { ManagerMaintenanceSeeder } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.seeder';
import { ManagerStoreSeeder } from '@/backend_manager/manager_modules/store/manager-store.seeder';
import { ManagerMembersSeeder } from '@/backend_manager/manager_modules/members/manager-members.seeder';
import { ManagerGrievanceSeeder } from '@/backend_manager/manager_modules/grievance/manager-grievance.seeder';
import { ManagerDashboardSeeder } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.seeder';
import { ManagerCommunicationsSeeder } from '@/backend_manager/manager_modules/communications/manager-communications.seeder';
import { ManagerReferralsSeeder } from '@/backend_manager/manager_modules/referrals/manager-referrals.seeder';
import { ManagerSettingsSeeder } from '@/backend_manager/manager_modules/settings/manager-settings.seeder';
import { ManagerProfileSeeder } from '@/backend_manager/manager_modules/profile/manager-profile.seeder';
import { ManagerPtSeeder } from '@/backend_manager/manager_modules/pt/manager-pt.seeder';
import { ManagerWorkoutSeeder } from '@/backend_manager/manager_modules/workout/manager-workout.seeder';
import { ManagerAttendanceSeeder } from '@/backend_manager/manager_modules/attendance/manager-attendance.seeder';
import { ManagerLibrarySeeder } from '@/backend_manager/manager_modules/library/manager-library.seeder';
import { ManagerHrSeeder } from '@/backend_manager/manager_modules/hr/manager-hr.seeder';

export async function runManagerSeeds(dataSource: DataSource): Promise<void> {
  await new ManagerFinanceSeeder().seed(dataSource);
  await new ManagerReportsSeeder().seed(dataSource);
  await new ManagerScheduleSeeder().seed(dataSource);
  await new ManagerSalesSeeder().seed(dataSource);
  await new ManagerPlansSeeder().seed(dataSource);
  await new ManagerNotificationsSeeder().seed(dataSource);
  await new ManagerInquiriesSeeder().seed(dataSource);
  await new ManagerExpensesSeeder().seed(dataSource);
  await new ManagerMaintenanceSeeder().seed(dataSource);
  await new ManagerStoreSeeder().seed(dataSource);
  await new ManagerMembersSeeder().seed(dataSource);
  await new ManagerGrievanceSeeder().seed(dataSource);
  await new ManagerDashboardSeeder().seed(dataSource);
  await new ManagerCommunicationsSeeder().seed(dataSource);
  await new ManagerReferralsSeeder().seed(dataSource);
  await new ManagerSettingsSeeder().seed(dataSource);
  await new ManagerProfileSeeder().seed(dataSource);
  await new ManagerPtSeeder().seed(dataSource);
  await new ManagerWorkoutSeeder().seed(dataSource);
  await new ManagerAttendanceSeeder().seed(dataSource);
  await new ManagerLibrarySeeder().seed(dataSource);
  await new ManagerHrSeeder().seed(dataSource);
 }
