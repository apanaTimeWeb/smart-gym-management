// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { AttendanceEntity } from '@/backend_manager/modules/backend_manager/attendance/attendance.entity';
import { CommunicationsEntity } from '@/backend_manager/modules/backend_manager/communications/communications.entity';
import { DashboardEntity } from '@/backend_manager/modules/backend_manager/dashboard/dashboard.entity';
import { ExpensesEntity } from '@/backend_manager/modules/backend_manager/expenses/expenses.entity';
import { FinanceEntity } from '@/backend_manager/modules/backend_manager/finance/finance.entity';
import { GrievanceEntity } from '@/backend_manager/modules/backend_manager/grievance/grievance.entity';
import { HrEntity } from '@/backend_manager/modules/backend_manager/hr/hr.entity';
import { InquiriesEntity } from '@/backend_manager/modules/backend_manager/inquiries/inquiries.entity';
import { LibraryEntity } from '@/backend_manager/modules/backend_manager/library/library.entity';
import { MaintenanceEntity } from '@/backend_manager/modules/backend_manager/maintenance/maintenance.entity';
import { MembersEntity } from '@/backend_manager/modules/backend_manager/members/members.entity';
import { NotificationsEntity } from '@/backend_manager/modules/backend_manager/notifications/notifications.entity';
import { PlansEntity } from '@/backend_manager/modules/backend_manager/plans/plans.entity';
import { ProfileEntity } from '@/backend_manager/modules/backend_manager/profile/profile.entity';
import { PtEntity } from '@/backend_manager/modules/backend_manager/pt/pt.entity';
import { ReferralsEntity } from '@/backend_manager/modules/backend_manager/referrals/referrals.entity';
import { ReportsEntity } from '@/backend_manager/modules/backend_manager/reports/reports.entity';
import { SalesEntity } from '@/backend_manager/modules/backend_manager/sales/sales.entity';
import { ScheduleEntity } from '@/backend_manager/modules/backend_manager/schedule/schedule.entity';
import { SettingsEntity } from '@/backend_manager/modules/backend_manager/settings/settings.entity';
import { StoreEntity } from '@/backend_manager/modules/backend_manager/store/store.entity';
import { WorkoutEntity } from '@/backend_manager/modules/backend_manager/workout/workout.entity';

export const CoreTenantEntities = [
  AttendanceEntity,
  CommunicationsEntity,
  DashboardEntity,
  ExpensesEntity,
  FinanceEntity,
  GrievanceEntity,
  HrEntity,
  InquiriesEntity,
  LibraryEntity,
  MaintenanceEntity,
  MembersEntity,
  NotificationsEntity,
  PlansEntity,
  ProfileEntity,
  PtEntity,
  ReferralsEntity,
  ReportsEntity,
  SalesEntity,
  ScheduleEntity,
  SettingsEntity,
  StoreEntity,
  WorkoutEntity,
];
