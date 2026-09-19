// RESPONSIBILITY: Role-container navigation configuration only. No feature business behavior.
import {
  LayoutDashboard, Users, FileBarChart,
  UserCog, Utensils, Dumbbell,
  MessageSquare, CalendarCheck, CalendarClock, Receipt, Tags, Megaphone, Gift,
} from 'lucide-react';
import { ManagerAttendanceUrlConfig } from '@/app/manager/attendance/attendance_url_config';
import { ManagerCommunicationsUrlConfig } from '@/app/manager/communications/communications_url_config';
import { ManagerDashboardUrlConfig } from '@/app/manager/dashboard/dashboard_url_config';
import { ManagerExpensesUrlConfig } from '@/app/manager/expenses/expenses_url_config';
import { ManagerHrUrlConfig } from '@/app/manager/hr/hr_url_config';
import { ManagerInquiriesUrlConfig } from '@/app/manager/inquiries/inquiries_url_config';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
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
  {
    group: 'Overview',
    items: [
      { href: ManagerDashboardUrlConfig.PAGES.HOME, label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    group: 'Operations',
    items: [
      { href: '/manager/inquiries', label: 'Inquiries', icon: Users },
      { href: '/manager/members', label: 'Member Management', icon: Users },
      { href: '/manager/attendance', label: 'Attendance', icon: CalendarCheck },
      { href: '/manager/plans', label: 'Membership / Plans', icon: Tags },
    ],
  },
  {
    group: 'Billing & Reports',
    items: [
      { href: '/manager/sales', label: 'Payment & Billing', icon: FileBarChart },
      { href: '/manager/expenses', label: 'Expenses', icon: Receipt },
      { href: '/manager/reports', label: 'Reports', icon: FileBarChart },
    ],
  },
  {
    group: 'Training & Fitness',
    items: [
      { href: '/manager/hr', label: 'Trainer Management', icon: UserCog },
      { href: '/manager/schedule', label: 'Trainer Schedule', icon: CalendarClock },
      { href: '/manager/pt', label: 'Personal Training', icon: Users },
      { href: '/manager/workout', label: 'Workout Management', icon: Dumbbell },
      { href: '/manager/library', label: 'Diet Management', icon: Utensils },
    ],
  },
  {
    group: 'Engagement',
    items: [
      { href: '/manager/communications', label: 'Communications', icon: Megaphone },
      { href: '/manager/referrals', label: 'Referrals & Rewards', icon: Gift },
      { href: '/manager/notifications', label: 'Notifications', icon: MessageSquare },
    ],
  },

];
