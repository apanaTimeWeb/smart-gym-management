import { setupServer } from 'msw/node';
import { beforeEach } from 'vitest';
import { resetManagerAttendanceMockState } from '@/app/manager/attendance/attendance_mocks/handlers/ManagerAttendanceMockHandlers';
import { resetManagerCommunicationsMockState } from '@/app/manager/communications/communications_mocks/handlers/ManagerCommunicationsMockHandlers';
import { resetManagerExpensesMockState } from '@/app/manager/expenses/expenses_mocks/handlers/ManagerExpensesMockHandlers';
import { resetManagerFinanceMockState } from '@/app/manager/finance/finance_mocks/handlers/ManagerFinanceMockHandlers';
import { resetManagerGrievanceMockState } from '@/app/manager/grievance/grievance_mocks/handlers/ManagerGrievanceMockHandlers';
import { resetManagerHrMockState } from '@/app/manager/hr/hr_mocks/handlers/ManagerHrMockHandlers';
import { resetManagerInquiriesMockState } from '@/app/manager/inquiries/inquiries_mocks/handlers/ManagerInquiriesMockHandlers';
import { resetManagerLibraryMockState } from '@/app/manager/library/library_mocks/handlers/ManagerLibraryMockHandlers';
import { resetManagerMaintenanceMockState } from '@/app/manager/maintenance/maintenance_mocks/handlers/ManagerMaintenanceMockHandlers';
import { managerHandlers } from '@/app/manager/manager_mocks/ManagerMockHandlers';
import { resetManagerMembersMockState } from '@/app/manager/members/members_mocks/handlers/ManagerMembersMockHandlers';
import { resetManagerNotificationsMockState } from '@/app/manager/notifications/notifications_mocks/handlers/ManagerNotificationsMockHandlers';
import { resetManagerPlansMockState } from '@/app/manager/plans/plans_mocks/handlers/ManagerPlansMockHandlers';
import { resetManagerProfileMockState } from '@/app/manager/profile/profile_mocks/handlers/ManagerProfileMockHandlers';
import { resetManagerPtMockState } from '@/app/manager/pt/pt_mocks/handlers/ManagerPtMockHandlers';
import { resetManagerReferralsMockState } from '@/app/manager/referrals/referrals_mocks/handlers/ManagerReferralsMockHandlers';
import { resetManagerScheduleMockState } from '@/app/manager/schedule/schedule_mocks/handlers/ManagerScheduleMockHandlers';
import { resetManagerSettingsMockState } from '@/app/manager/settings/settings_mocks/handlers/ManagerSettingsMockHandlers';
import { resetManagerStoreMockState } from '@/app/manager/store/store_mocks/handlers/ManagerStoreMockHandlers';
import { resetManagerWorkoutMockState } from '@/app/manager/workout/workout_mocks/handlers/ManagerWorkoutMockHandlers';


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
