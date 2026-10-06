import { setupServer } from 'msw/node';
import { beforeEach } from 'vitest';
import { resetManagerAttendanceMockState } from '@/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceMockHandlers';
import { resetManagerCommunicationsMockState } from '@/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsMockHandlers';
import { resetManagerExpensesMockState } from '@/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpensesMockHandlers';
import { resetManagerFinanceMockState } from '@/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinanceMockHandlers';
import { resetManagerGrievanceMockState } from '@/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/ManagerGrievanceMockHandlers';
import { resetManagerHrMockState } from '@/app/frontend_manager/manager_hr/manager_hr_mocks/manager_hr_mocks_handlers/ManagerHrMockHandlers';
import { resetManagerInquiriesMockState } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_handlers/ManagerInquiriesMockHandlers';
import { resetManagerLibraryMockState } from '@/app/frontend_manager/manager_library/manager_library_mocks/manager_library_mocks_handlers/ManagerLibraryMockHandlers';
import { resetManagerMaintenanceMockState } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_mocks/manager_maintenance_mocks_handlers/ManagerMaintenanceMockHandlers';
import { resetManagerMembersMockState } from '@/app/frontend_manager/manager_members/manager_members_mocks/manager_members_mocks_handlers/ManagerMembersMockHandlers';
import { managerHandlers } from '@/app/frontend_manager/manager_mocks/ManagerMockHandlers';
import { resetManagerNotificationsMockState } from '@/app/frontend_manager/manager_notifications/manager_notifications_mocks/manager_notifications_mocks_handlers/ManagerNotificationsMockHandlers';
import { resetManagerPlansMockState } from '@/app/frontend_manager/manager_plans/manager_plans_mocks/manager_plans_mocks_handlers/ManagerPlansMockHandlers';
import { resetManagerProfileMockState } from '@/app/frontend_manager/manager_profile/manager_profile_mocks/manager_profile_mocks_handlers/ManagerProfileMockHandlers';
import { resetManagerPtMockState } from '@/app/frontend_manager/manager_pt/manager_pt_mocks/manager_pt_mocks_handlers/ManagerPtMockHandlers';
import { resetManagerReferralsMockState } from '@/app/frontend_manager/manager_referrals/manager_referrals_mocks/manager_referrals_mocks_handlers/ManagerReferralsMockHandlers';
import { resetManagerScheduleMockState } from '@/app/frontend_manager/manager_schedule/manager_schedule_mocks/manager_schedule_mocks_handlers/ManagerScheduleMockHandlers';
import { resetManagerSettingsMockState } from '@/app/frontend_manager/manager_settings/manager_settings_mocks/manager_settings_mocks_handlers/ManagerSettingsMockHandlers';
import { resetManagerStoreMockState } from '@/app/frontend_manager/manager_store/manager_store_mocks/manager_store_mocks_handlers/ManagerStoreMockHandlers';
import { resetManagerWorkoutMockState } from '@/app/frontend_manager/manager_workout/manager_workout_mocks/manager_workout_mocks_handlers/ManagerWorkoutMockHandlers';


/**
 * @description Provides the ManagerMswTestServer implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_mocks/manager_attendance_mocks_handlers/ManagerAttendanceMockHandlers; @/app/frontend_manager/manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/ManagerCommunicationsMockHandlers; @/app/frontend_manager/manager_expenses/manager_expenses_mocks/manager_expenses_mocks_handlers/ManagerExpensesMockHandlers; @/app/frontend_manager/manager_finance/manager_finance_mocks/manager_finance_mocks_handlers/ManagerFinanceMockHandlers; @/app/frontend_manager/manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/ManagerGrievanceMockHandlers
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerMswServer = setupServer(...managerHandlers);

beforeEach(() => {
  resetManagerAttendanceMockState();
  resetManagerCommunicationsMockState();
  resetManagerExpensesMockState();
  resetManagerFinanceMockState();
  resetManagerGrievanceMockState();
  resetManagerHrMockState();
  resetManagerInquiriesMockState();
  resetManagerLibraryMockState();
  resetManagerMaintenanceMockState();
  resetManagerMembersMockState();
  resetManagerNotificationsMockState();
  resetManagerPlansMockState();
  resetManagerProfileMockState();
  resetManagerPtMockState();
  resetManagerReferralsMockState();
  resetManagerScheduleMockState();
  resetManagerSettingsMockState();
  resetManagerStoreMockState();
  resetManagerWorkoutMockState();
});
