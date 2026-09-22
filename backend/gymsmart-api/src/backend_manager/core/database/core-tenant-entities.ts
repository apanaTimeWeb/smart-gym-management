// RESPONSIBILITY: Explicit tenant entity registry consumed by dynamic TypeORM DataSources.
// FLOW: Trusted tenant DataSource -> CoreTenantEntities -> TypeORM metadata.

import { AttendanceEntity } from '@/modules/manager/attendance/attendance.entity';
import { CommunicationsEntity } from '@/modules/manager/communications/communications.entity';
import { DashboardEntity } from '@/modules/manager/dashboard/dashboard.entity';
import { ExpensesEntity } from '@/modules/manager/expenses/expenses.entity';
import { FinanceEntity } from '@/modules/manager/finance/finance.entity';
import { GrievanceEntity } from '@/modules/manager/grievance/grievance.entity';
import { HrEntity } from '@/modules/manager/hr/hr.entity';
import { InquiriesEntity } from '@/modules/manager/inquiries/inquiries.entity';
import { LibraryEntity } from '@/modules/manager/library/library.entity';
import { MaintenanceEntity } from '@/modules/manager/maintenance/maintenance.entity';
import { MembersEntity } from '@/modules/manager/members/members.entity';
import { NotificationsEntity } from '@/modules/manager/notifications/notifications.entity';
import { PlansEntity } from '@/modules/manager/plans/plans.entity';
import { ProfileEntity } from '@/modules/manager/profile/profile.entity';
import { PtEntity } from '@/modules/manager/pt/pt.entity';
import { ReferralsEntity } from '@/modules/manager/referrals/referrals.entity';
import { ReportsEntity } from '@/modules/manager/reports/reports.entity';
import { SalesEntity } from '@/modules/manager/sales/sales.entity';
import { ScheduleEntity } from '@/modules/manager/schedule/schedule.entity';
import { SettingsEntity } from '@/modules/manager/settings/settings.entity';
import { StoreEntity } from '@/modules/manager/store/store.entity';
import { WorkoutEntity } from '@/modules/manager/workout/workout.entity';

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
