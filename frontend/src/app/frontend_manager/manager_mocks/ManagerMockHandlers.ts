import { managerAttendanceHandlers } from '@/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceMockHandlers';
import { managerCommunicationsHandlers } from '@/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsMockHandlers';
import { managerDashboardHandlers } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_handlers/ManagerDashboardMockHandlers';
import { managerExpensesHandlers } from '@/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpensesMockHandlers';
import { managerFinanceHandlers } from '@/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinanceMockHandlers';
import { managerGrievanceMockHandlers } from '@/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/ManagerGrievanceMockHandlers';
import { managerHrHandlers } from '@/app/frontend_manager/manager_hr/manager_hr_mocks/manager_hr_mocks_handlers/ManagerHrMockHandlers';
import { managerInquiriesHandlers } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_handlers/ManagerInquiriesMockHandlers';
import { managerLibraryHandlers } from '@/app/frontend_manager/manager_library/manager_library_mocks/manager_library_mocks_handlers/ManagerLibraryMockHandlers';
import { managerMaintenanceMockHandlers } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_handlers/ManagerMaintenanceMockHandlers';
import { managerMembersHandlers } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockHandlers';
import { managerNotificationsHandlers } from '@/app/frontend_manager/manager_notifications/manager_notifications_mocks/manager_notifications_mocks_handlers/ManagerNotificationsMockHandlers';
import { managerPlansHandlers } from '@/app/frontend_manager/manager_plans/manager_plans_mocks/manager_plans_mocks_handlers/ManagerPlansMockHandlers';
import { managerProfileHandlers } from '@/app/frontend_manager/manager_profile/manager_profile_mocks/manager_profile_mocks_handlers/ManagerProfileMockHandlers';
import { managerPtHandlers } from '@/app/frontend_manager/manager_pt/manager_pt_mocks/manager_pt_mocks_handlers/ManagerPtMockHandlers';
import { managerReferralsHandlers } from '@/app/frontend_manager/manager_referrals/manager_referrals_mocks/manager_referrals_mocks_handlers/ManagerReferralsMockHandlers';
import { managerReportsHandlers } from '@/app/frontend_manager/manager_reports/manager_reports_mocks/manager_reports_mocks_handlers/ManagerReportsMockHandlers';
import { managerSalesHandlers } from '@/app/frontend_manager/manager_sales/manager_sales_mocks/manager_sales_mocks_handlers/ManagerSalesMockHandlers';
import { managerScheduleHandlers } from '@/app/frontend_manager/manager_schedule/manager_schedule_mocks/manager_schedule_mocks_handlers/ManagerScheduleMockHandlers';
import { managerSettingsHandlers } from '@/app/frontend_manager/manager_settings/manager_settings_mocks/manager_settings_mocks_handlers/ManagerSettingsMockHandlers';
import { managerStoreHandlers } from '@/app/frontend_manager/manager_store/manager_store_mocks/manager_store_mocks_handlers/ManagerStoreMockHandlers';
import { managerWorkoutHandlers } from '@/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_handlers/ManagerWorkoutMockHandlers';


/**
 * @description Provides the ManagerMockHandlers implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceMockHandlers; @/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsMockHandlers; @/app/frontend_manager/manager_dashboard/manager_dashboard_mocks/manager_dashboard_mocks_handlers/ManagerDashboardMockHandlers; @/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpensesMockHandlers; @/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinanceMockHandlers
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
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
