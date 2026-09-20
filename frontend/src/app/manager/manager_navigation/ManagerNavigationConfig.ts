// RESPONSIBILITY: Role-container navigation configuration only. Business destination paths are owned by feature URL configs.
import { LayoutDashboard, Users, FileBarChart, UserCog, Utensils, Dumbbell, Wrench, MessageSquare, CalendarCheck, CalendarClock, Receipt, Tags, Megaphone, Gift, Frown } from 'lucide-react';
import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { ManagerCommunicationsUrlConfig } from '@/app/manager/communications/communications_url_config';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { ManagerExpensesUrlConfig } from '@/app/manager/expenses/expenses_url_config';
import { ManagerFinanceUrlConfig } from '@/app/manager/finance/finance_url_config';
import { ManagerGrievanceUrlConfig } from '@/app/manager/grievance/grievance_url_config';
import { ManagerHrUrlConfig } from '@/app/manager/hr/hr_url_config';
import { ManagerInquiriesUrlConfig } from '@/app/manager/inquiries/inquiries_url_config';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import { ManagerMaintenanceUrlConfig } from '@/app/manager/maintenance/maintenance_url_config';
import { ManagerMembersUrlConfig } from '@/app/manager/members/members_url_config';
import { ManagerNotificationsUrlConfig } from '@/app/manager/notifications/notifications_url_config';
import { ManagerPlansUrlConfig } from '@/app/manager/plans/plans_url_config';
import { ManagerPtUrlConfig } from '@/app/manager/pt/pt_url_config';
import { ManagerReferralsUrlConfig } from '@/app/manager/referrals/referrals_url_config';
import { ManagerReportsUrlConfig } from '@/app/manager/reports/reports_url_config';
import { ManagerSalesUrlConfig } from '@/app/manager/sales/sales_url_config';
import { ManagerScheduleUrlConfig } from '@/app/manager/schedule/schedule_url_config';
import { ManagerWorkoutUrlConfig } from '@/app/manager/workout/workout_url_config';


export const MANAGER_NAV_GROUPS = [
  { group: 'Overview', items: [{ href: ManagerDashboardUrlConfig.PAGES.HOME, label: 'Dashboard', icon: LayoutDashboard }] },
  {
    group: 'Operations',
    items: [
      { href: ManagerInquiriesUrlConfig.UI.HOME, label: 'Inquiries', icon: Users },
      { href: ManagerMembersUrlConfig.PAGES.LIST, label: 'Member Management', icon: Users },
      { href: ManagerAttendanceUrlConfig.UI.HOME, label: 'Attendance', icon: CalendarCheck },
      { href: ManagerPlansUrlConfig.PAGES.LIST, label: 'Membership / Plans', icon: Tags },
      { href: ManagerMaintenanceUrlConfig.PAGES.HOME, label: 'Maintenance', icon: Wrench },
      { href: ManagerGrievanceUrlConfig.PAGES.HOME, label: 'Grievances', icon: Frown },
    ],
  },
  {
    group: 'Billing & Reports',
    items: [
      { href: ManagerSalesUrlConfig.UI.HOME, label: 'Payment & Billing', icon: FileBarChart },
      { href: ManagerFinanceUrlConfig.PAGES.LIST, label: 'Finance', icon: FileBarChart },
      { href: ManagerExpensesUrlConfig.UI.HOME, label: 'Expenses', icon: Receipt },
      { href: ManagerReportsUrlConfig.PAGES.LIST, label: 'Reports', icon: FileBarChart },
    ],
  },
  {
    group: 'Training & Fitness',
    items: [
      { href: ManagerHrUrlConfig.PAGES.STAFF_LIST, label: 'Trainer Management', icon: UserCog },
      { href: ManagerScheduleUrlConfig.UI.HOME, label: 'Trainer Schedule', icon: CalendarClock },
      { href: ManagerPtUrlConfig.UI.HOME, label: 'Personal Training', icon: Users },
      { href: ManagerWorkoutUrlConfig.UI.HOME, label: 'Workout Management', icon: Dumbbell },
      { href: ManagerLibraryUrlConfig.PAGES.LIBRARY, label: 'Diet Management', icon: Utensils },
    ],
  },
  {
    group: 'Engagement',
    items: [
      { href: ManagerCommunicationsUrlConfig.UI.HOME, label: 'Communications', icon: Megaphone },
      { href: ManagerReferralsUrlConfig.UI.HOME, label: 'Referrals & Rewards', icon: Gift },
      { href: ManagerNotificationsUrlConfig.UI.HOME, label: 'Notifications', icon: MessageSquare },
    ],
  },
];
