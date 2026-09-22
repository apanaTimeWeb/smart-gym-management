// RESPONSIBILITY: Explicit tenant entity registry consumed by dynamic TypeORM DataSources.
// FLOW: Trusted tenant DataSource -> CoreTenantEntities -> TypeORM metadata.

import { AttendanceEntity } from '@/backend_manager/modules/manager/attendance/attendance.entity';
import { CommunicationsEntity } from '@/backend_manager/modules/manager/communications/communications.entity';
import { DashboardEntity } from '@/backend_manager/modules/manager/dashboard/dashboard.entity';
import { ExpensesEntity } from '@/backend_manager/modules/manager/expenses/expenses.entity';
import { FinanceEntity } from '@/backend_manager/modules/manager/finance/finance.entity';
import { GrievanceEntity } from '@/backend_manager/modules/manager/grievance/grievance.entity';
import { HrEntity } from '@/backend_manager/modules/manager/hr/hr.entity';
import { InquiriesEntity } from '@/backend_manager/modules/manager/inquiries/inquiries.entity';
import { LibraryEntity } from '@/backend_manager/modules/manager/library/library.entity';
import { MaintenanceEntity } from '@/backend_manager/modules/manager/maintenance/maintenance.entity';
import { MembersEntity } from '@/backend_manager/modules/manager/members/members.entity';
import { NotificationsEntity } from '@/backend_manager/modules/manager/notifications/notifications.entity';
import { PlansEntity } from '@/backend_manager/modules/manager/plans/plans.entity';
import { ProfileEntity } from '@/backend_manager/modules/manager/profile/profile.entity';
import { PtEntity } from '@/backend_manager/modules/manager/pt/pt.entity';
import { ReferralsEntity } from '@/backend_manager/modules/manager/referrals/referrals.entity';
import { ReportsEntity } from '@/backend_manager/modules/manager/reports/reports.entity';
import { SalesEntity } from '@/backend_manager/modules/manager/sales/sales.entity';
import { ScheduleEntity } from '@/backend_manager/modules/manager/schedule/schedule.entity';
import { SettingsEntity } from '@/backend_manager/modules/manager/settings/settings.entity';
import { StoreEntity } from '@/backend_manager/modules/manager/store/store.entity';
import { WorkoutEntity } from '@/backend_manager/modules/manager/workout/workout.entity';

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
