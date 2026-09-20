import { managerAttendanceHandlers } from '@/app/manager/attendance/attendance_mocks/handlers/ManagerAttendanceMockHandlers';
import { managerCommunicationsHandlers } from '@/app/manager/communications/communications_mocks/handlers/ManagerCommunicationsMockHandlers';
import { managerDashboardHandlers } from '@/app/manager/dashboard/dashboard_mocks/handlers/ManagerDashboardMockHandlers';
import { managerExpensesHandlers } from '@/app/manager/expenses/expenses_mocks/handlers/ManagerExpensesMockHandlers';
import { managerFinanceHandlers } from '@/app/manager/finance/finance_mocks/handlers/ManagerFinanceMockHandlers';
import { managerGrievanceMockHandlers } from '@/app/manager/grievance/grievance_mocks/handlers/ManagerGrievanceMockHandlers';
import { managerHrHandlers } from '@/app/manager/hr/hr_mocks/handlers/ManagerHrMockHandlers';
import { managerInquiriesHandlers } from '@/app/manager/inquiries/inquiries_mocks/handlers/ManagerInquiriesMockHandlers';
import { managerLibraryHandlers } from '@/app/manager/library/library_mocks/handlers/ManagerLibraryMockHandlers';
import { managerMaintenanceMockHandlers } from '@/app/manager/maintenance/maintenance_mocks/handlers/ManagerMaintenanceMockHandlers';
import { managerMembersHandlers } from '@/app/manager/members/members_mocks/handlers/ManagerMembersMockHandlers';
import { managerNotificationsHandlers } from '@/app/manager/notifications/notifications_mocks/handlers/ManagerNotificationsMockHandlers';
import { managerPlansHandlers } from '@/app/manager/plans/plans_mocks/handlers/ManagerPlansMockHandlers';
import { managerProfileHandlers } from '@/app/manager/profile/profile_mocks/handlers/ManagerProfileMockHandlers';
import { managerPtHandlers } from '@/app/manager/pt/pt_mocks/handlers/ManagerPtMockHandlers';
import { managerReferralsHandlers } from '@/app/manager/referrals/referrals_mocks/handlers/ManagerReferralsMockHandlers';
import { managerReportsHandlers } from '@/app/manager/reports/reports_mocks/handlers/ManagerReportsMockHandlers';
import { managerSalesHandlers } from '@/app/manager/sales/sales_mocks/handlers/ManagerSalesMockHandlers';
import { managerScheduleHandlers } from '@/app/manager/schedule/schedule_mocks/handlers/ManagerScheduleMockHandlers';
import { managerSettingsHandlers } from '@/app/manager/settings/settings_mocks/handlers/ManagerSettingsMockHandlers';
import { managerStoreHandlers } from '@/app/manager/store/store_mocks/handlers/ManagerStoreMockHandlers';
import { managerWorkoutHandlers } from '@/app/manager/workout/workout_mocks/handlers/ManagerWorkoutMockHandlers';


export const managerHandlers = [
  ...managerAttendanceHandlers,
  ...managerMaintenanceMockHandlers,
  ...managerGrievanceMockHandlers,
  ...managerCommunicationsHandlers,
  ...managerDashboardHandlers,
  ...managerExpensesHandlers,
  ...managerFinanceHandlers,
  ...managerHrHandlers,
  ...managerInquiriesHandlers,
  ...managerLibraryHandlers,
  ...managerMembersHandlers,
  ...managerNotificationsHandlers,
  ...managerPlansHandlers,
  ...managerProfileHandlers,
  ...managerPtHandlers,
  ...managerReferralsHandlers,
  ...managerReportsHandlers,
  ...managerSalesHandlers,
  ...managerSettingsHandlers,
  ...managerStoreHandlers,
  ...managerScheduleHandlers,
  ...managerWorkoutHandlers,
];
