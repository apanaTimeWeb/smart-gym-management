// RESPONSIBILITY: Deterministic Manager seed orchestration in frontend domain order.
// FLOW: Master seed script -> feature seeders -> idempotent seed operations.

import { AttendanceSeeder } from '@/modules/manager/attendance/attendance.seeder';
import { CommunicationsSeeder } from '@/modules/manager/communications/communications.seeder';
import { DashboardSeeder } from '@/modules/manager/dashboard/dashboard.seeder';
import { ExpensesSeeder } from '@/modules/manager/expenses/expenses.seeder';
import { FinanceSeeder } from '@/modules/manager/finance/finance.seeder';
import { GrievanceSeeder } from '@/modules/manager/grievance/grievance.seeder';
import { HrSeeder } from '@/modules/manager/hr/hr.seeder';
import { InquiriesSeeder } from '@/modules/manager/inquiries/inquiries.seeder';
import { LibrarySeeder } from '@/modules/manager/library/library.seeder';
import { MaintenanceSeeder } from '@/modules/manager/maintenance/maintenance.seeder';
import { MembersSeeder } from '@/modules/manager/members/members.seeder';
import { NotificationsSeeder } from '@/modules/manager/notifications/notifications.seeder';
import { PlansSeeder } from '@/modules/manager/plans/plans.seeder';
import { ProfileSeeder } from '@/modules/manager/profile/profile.seeder';
import { PtSeeder } from '@/modules/manager/pt/pt.seeder';
import { ReferralsSeeder } from '@/modules/manager/referrals/referrals.seeder';
import { ReportsSeeder } from '@/modules/manager/reports/reports.seeder';
import { SalesSeeder } from '@/modules/manager/sales/sales.seeder';
import { ScheduleSeeder } from '@/modules/manager/schedule/schedule.seeder';
import { SettingsSeeder } from '@/modules/manager/settings/settings.seeder';
import { StoreSeeder } from '@/modules/manager/store/store.seeder';
import { WorkoutSeeder } from '@/modules/manager/workout/workout.seeder';

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
