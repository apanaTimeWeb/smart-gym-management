// RESPONSIBILITY: Owns backend core module infrastructure/code contract.
// FLOW: Module-owned input/configuration → focused backend behavior → typed output.
import { ManagerCoreAuditLogEntity } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.entity';
import { ManagerCoreImmutableEventLogEntity } from '@/backend_manager/manager_core/manager_core_events/manager-core-immutable-event-log.entity';
import { ManagerFinanceLedgerEntity } from '@/backend_manager/manager_modules/finance/finance_ledger/manager-finance-ledger.entity';
import { ManagerAttendanceEntity } from '@/backend_manager/manager_modules/attendance/manager-attendance.entity';
import { ManagerCommunicationsEntity } from '@/backend_manager/manager_modules/communications/manager-communications.entity';
import { ManagerCommunicationsDeliveryJobEntity } from '@/backend_manager/manager_modules/communications/communications_repositories/manager-communications-delivery-job.entity';
import { ManagerDashboardEntity } from '@/backend_manager/manager_modules/dashboard/manager-dashboard.entity';
import { ManagerExpensesEntity } from '@/backend_manager/manager_modules/expenses/manager-expenses.entity';
import { ManagerFinanceEntity } from '@/backend_manager/manager_modules/finance/manager-finance.entity';
import { ManagerGrievanceEntity } from '@/backend_manager/manager_modules/grievance/manager-grievance.entity';
import { ManagerHrEntity } from '@/backend_manager/manager_modules/hr/manager-hr.entity';
import { ManagerInquiriesEntity } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.entity';
import { ManagerLibraryEntity } from '@/backend_manager/manager_modules/library/manager-library.entity';
import { ManagerMaintenanceEntity } from '@/backend_manager/manager_modules/maintenance/manager-maintenance.entity';
import { ManagerMembersEntity } from '@/backend_manager/manager_modules/members/manager-members.entity';
import { ManagerNotificationsEntity } from '@/backend_manager/manager_modules/notifications/manager-notifications.entity';
import { ManagerPlansEntity } from '@/backend_manager/manager_modules/plans/manager-plans.entity';
import { ManagerProfileEntity } from '@/backend_manager/manager_modules/profile/manager-profile.entity';
import { ManagerPtEntity } from '@/backend_manager/manager_modules/pt/manager-pt.entity';
import { ManagerReferralsEntity } from '@/backend_manager/manager_modules/referrals/manager-referrals.entity';
import { ManagerReportsEntity } from '@/backend_manager/manager_modules/reports/manager-reports.entity';
import { ManagerSalesEntity } from '@/backend_manager/manager_modules/sales/manager-sales.entity';
import { ManagerScheduleEntity } from '@/backend_manager/manager_modules/schedule/manager-schedule.entity';
import { ManagerSettingsEntity } from '@/backend_manager/manager_modules/settings/manager-settings.entity';
import { ManagerStoreEntity } from '@/backend_manager/manager_modules/store/manager-store.entity';
import { ManagerWorkoutEntity } from '@/backend_manager/manager_modules/workout/manager-workout.entity';

export const ManagerCoreTenantEntities = [
  ManagerCoreAuditLogEntity,
  ManagerCoreImmutableEventLogEntity,
  ManagerFinanceLedgerEntity,
  ManagerAttendanceEntity,
  ManagerCommunicationsEntity,
  ManagerCommunicationsDeliveryJobEntity,
  ManagerDashboardEntity,
  ManagerExpensesEntity,
  ManagerFinanceEntity,
  ManagerGrievanceEntity,
  ManagerHrEntity,
  ManagerInquiriesEntity,
  ManagerLibraryEntity,
  ManagerMaintenanceEntity,
  ManagerMembersEntity,
  ManagerNotificationsEntity,
  ManagerPlansEntity,
  ManagerProfileEntity,
  ManagerPtEntity,
  ManagerReferralsEntity,
  ManagerReportsEntity,
  ManagerSalesEntity,
  ManagerScheduleEntity,
  ManagerSettingsEntity,
  ManagerStoreEntity,
  ManagerWorkoutEntity,
];
