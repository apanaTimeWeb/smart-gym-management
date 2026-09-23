// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { AttendanceSeeder } from '@/backend_manager/modules/backend_manager/attendance/attendance.seeder';
import { CommunicationsSeeder } from '@/backend_manager/modules/backend_manager/communications/communications.seeder';
import { DashboardSeeder } from '@/backend_manager/modules/backend_manager/dashboard/dashboard.seeder';
import { ExpensesSeeder } from '@/backend_manager/modules/backend_manager/expenses/expenses.seeder';
import { FinanceSeeder } from '@/backend_manager/modules/backend_manager/finance/finance.seeder';
import { GrievanceSeeder } from '@/backend_manager/modules/backend_manager/grievance/grievance.seeder';
import { HrSeeder } from '@/backend_manager/modules/backend_manager/hr/hr.seeder';
import { InquiriesSeeder } from '@/backend_manager/modules/backend_manager/inquiries/inquiries.seeder';
import { LibrarySeeder } from '@/backend_manager/modules/backend_manager/library/library.seeder';
import { MaintenanceSeeder } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.seeder';
import { MembersSeeder } from '@/backend_manager/modules/backend_manager/members/members.seeder';
import { NotificationsSeeder } from '@/backend_manager/modules/backend_manager/notifications/notifications.seeder';
import { PlansSeeder } from '@/backend_manager/modules/backend_manager/plans/plans.seeder';
import { ProfileSeeder } from '@/backend_manager/modules/backend_manager/profile/profile.seeder';
import { PtSeeder } from '@/backend_manager/modules/backend_manager/pt/pt.seeder';
import { ReferralsSeeder } from '@/backend_manager/modules/backend_manager/referrals/referrals.seeder';
import { ReportsSeeder } from '@/backend_manager/modules/backend_manager/reports/reports.seeder';
import { SalesSeeder } from '@/backend_manager/modules/backend_manager/sales/sales.seeder';
import { ScheduleSeeder } from '@/backend_manager/modules/backend_manager/schedule/schedule.seeder';
import { SettingsSeeder } from '@/backend_manager/modules/backend_manager/settings/settings.seeder';
import { StoreSeeder } from '@/backend_manager/modules/backend_manager/store/store.seeder';
import { WorkoutSeeder } from '@/backend_manager/modules/backend_manager/workout/workout.seeder';

export async function runManagerSeeds(): Promise<void> {
  await new AttendanceSeeder().seed();
  await new CommunicationsSeeder().seed();
  await new DashboardSeeder().seed();
  await new ExpensesSeeder().seed();
  await new FinanceSeeder().seed();
  await new GrievanceSeeder().seed();
  await new HrSeeder().seed();
  await new InquiriesSeeder().seed();
  await new LibrarySeeder().seed();
  await new MaintenanceSeeder().seed();
  await new MembersSeeder().seed();
  await new NotificationsSeeder().seed();
  await new PlansSeeder().seed();
  await new ProfileSeeder().seed();
  await new PtSeeder().seed();
  await new ReferralsSeeder().seed();
  await new ReportsSeeder().seed();
  await new SalesSeeder().seed();
  await new ScheduleSeeder().seed();
  await new SettingsSeeder().seed();
  await new StoreSeeder().seed();
  await new WorkoutSeeder().seed();
}
