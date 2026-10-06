import { LayoutDashboard, Users, FileBarChart, UserCog, Utensils, Dumbbell, Wrench, MessageSquare, CalendarCheck, CalendarClock, Receipt, Tags, Megaphone, Gift, Frown } from 'lucide-react';
import { ManagerAttendanceUrlConfig } from '@/app/frontend_manager/manager_attendance/manager_attendance_url_config';
import { ManagerCommunicationsUrlConfig } from '@/app/frontend_manager/manager_communications/manager_communications_url_config';
import { ManagerDashboardUrlConfig } from '@/app/frontend_manager/manager_dashboard/manager_dashboard_url_config';
import { ManagerExpensesUrlConfig } from '@/app/frontend_manager/manager_expenses/manager_expenses_url_config';
import { ManagerFinanceUrlConfig } from '@/app/frontend_manager/manager_finance/manager_finance_url_config';
import { ManagerGrievanceUrlConfig } from '@/app/frontend_manager/manager_grievance/manager_grievance_url_config';
import { ManagerHrUrlConfig } from '@/app/frontend_manager/manager_hr/manager_hr_url_config';
import { ManagerInquiriesUrlConfig } from '@/app/frontend_manager/manager_inquiries/manager_inquiries_url_config';
import { ManagerLibraryUrlConfig } from '@/app/frontend_manager/manager_library/manager_library_url_config';
import { ManagerMaintenanceUrlConfig } from '@/app/frontend_manager/manager_maintenance/manager_maintenance_url_config';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';
import { ManagerNotificationsUrlConfig } from '@/app/frontend_manager/manager_notifications/manager_notifications_url_config';
import { ManagerPlansUrlConfig } from '@/app/frontend_manager/manager_plans/manager_plans_url_config';
import { ManagerPtUrlConfig } from '@/app/frontend_manager/manager_pt/manager_pt_url_config';
import { ManagerReferralsUrlConfig } from '@/app/frontend_manager/manager_referrals/manager_referrals_url_config';
import { ManagerReportsUrlConfig } from '@/app/frontend_manager/manager_reports/manager_reports_url_config';
import { ManagerSalesUrlConfig } from '@/app/frontend_manager/manager_sales/manager_sales_url_config';
import { ManagerScheduleUrlConfig } from '@/app/frontend_manager/manager_schedule/manager_schedule_url_config';
import { ManagerWorkoutUrlConfig } from '@/app/frontend_manager/manager_workout/manager_workout_url_config';


/**
 * @description Provides the ManagerNavigationConfig implementation for the manager infrastructure module.
 * @dependencies @/app/frontend_manager/manager_attendance/manager_attendance_url_config; @/app/frontend_manager/manager_communications/manager_communications_url_config; @/app/frontend_manager/manager_dashboard/manager_dashboard_url_config; @/app/frontend_manager/manager_expenses/manager_expenses_url_config; @/app/frontend_manager/manager_finance/manager_finance_url_config
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const MANAGER_NAV_GROUPS = [
  { groupKey: 'NAV_GROUP_OVERVIEW', items: [{ href: ManagerDashboardUrlConfig.PAGES.HOME, labelKey: 'NAV_DASHBOARD', icon: LayoutDashboard }] },
  {
    groupKey: 'NAV_GROUP_OPERATIONS',
    items: [
      { href: ManagerInquiriesUrlConfig.UI.HOME, labelKey: 'NAV_INQUIRIES', icon: Users },
      { href: ManagerMembersUrlConfig.PAGES.LIST, labelKey: 'NAV_MEMBER_MANAGEMENT', icon: Users },
      { href: ManagerAttendanceUrlConfig.UI.HOME, labelKey: 'NAV_ATTENDANCE', icon: CalendarCheck },
      { href: ManagerPlansUrlConfig.PAGES.LIST, labelKey: 'NAV_MEMBERSHIP_PLANS', icon: Tags },
      { href: ManagerMaintenanceUrlConfig.PAGES.HOME, labelKey: 'NAV_MAINTENANCE', icon: Wrench },
      { href: ManagerGrievanceUrlConfig.PAGES.HOME, labelKey: 'NAV_GRIEVANCES', icon: Frown },
    ],
  },
  {
    groupKey: 'NAV_GROUP_BILLING_REPORTS',
    items: [
      { href: ManagerSalesUrlConfig.UI.HOME, labelKey: 'NAV_PAYMENT_BILLING', icon: FileBarChart },
      { href: ManagerFinanceUrlConfig.PAGES.LIST, labelKey: 'NAV_FINANCE', icon: FileBarChart },
      { href: ManagerExpensesUrlConfig.UI.HOME, labelKey: 'NAV_EXPENSES', icon: Receipt },
      { href: ManagerReportsUrlConfig.PAGES.LIST, labelKey: 'NAV_REPORTS', icon: FileBarChart },
    ],
  },
  {
    groupKey: 'NAV_GROUP_TRAINING_FITNESS',
    items: [
      { href: ManagerHrUrlConfig.PAGES.STAFF_LIST, labelKey: 'NAV_TRAINER_MANAGEMENT', icon: UserCog },
      { href: ManagerScheduleUrlConfig.UI.HOME, labelKey: 'NAV_TRAINER_SCHEDULE', icon: CalendarClock },
      { href: ManagerPtUrlConfig.UI.HOME, labelKey: 'NAV_PERSONAL_TRAINING', icon: Users },
      { href: ManagerWorkoutUrlConfig.UI.HOME, labelKey: 'NAV_WORKOUT_MANAGEMENT', icon: Dumbbell },
      { href: ManagerLibraryUrlConfig.PAGES.LIBRARY, labelKey: 'NAV_DIET_MANAGEMENT', icon: Utensils },
    ],
  },
  {
    groupKey: 'NAV_GROUP_ENGAGEMENT',
    items: [
      { href: ManagerCommunicationsUrlConfig.UI.HOME, labelKey: 'NAV_COMMUNICATIONS', icon: Megaphone },
      { href: ManagerReferralsUrlConfig.UI.HOME, labelKey: 'NAV_REFERRALS_REWARDS', icon: Gift },
      { href: ManagerNotificationsUrlConfig.UI.HOME, labelKey: 'NAV_NOTIFICATIONS', icon: MessageSquare },
    ],
  },
];

export const MANAGER_DEFAULT_HOME = ManagerDashboardUrlConfig.PAGES.HOME;
