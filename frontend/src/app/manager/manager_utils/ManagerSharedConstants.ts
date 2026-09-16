// RESPONSIBILITY: Centralized constants shared across all MANAGER modules — nav items, placeholder notifications, gym identity (name/phone), sensitive data masking utility, and pagination page size.
import {
  LayoutDashboard, Users, FileBarChart,
  UserCog, ShoppingBag, Utensils, Dumbbell,
  MessageSquare, CalendarCheck, CalendarClock, Receipt, Tags, Bell, BarChart3, Megaphone, Gift
} from 'lucide-react';

export const MANAGER_NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { href: '/manager/dashboard',       label: 'Dashboard',          icon: LayoutDashboard },
    ]
  },
  {
    group: 'Operations',
    items: [
      { href: '/manager/inquiries',       label: 'Inquiries',  icon: Users },
      { href: '/manager/members',         label: 'Member Management',  icon: Users },
      { href: '/manager/attendance',      label: 'Attendance',         icon: CalendarCheck },
      { href: '/manager/plans',           label: 'Membership / Plans', icon: Tags },
    ]
  },
  {
    group: 'Billing & Reports',
    items: [
      { href: '/manager/sales',           label: 'Payment & Billing',  icon: FileBarChart },
      { href: '/manager/expenses',        label: 'Expenses',           icon: Receipt },
      { href: '/manager/reports',         label: 'Reports',            icon: FileBarChart },
    ]
  },
  {
    group: 'Training & Fitness',
    items: [
      { href: '/manager/hr',              label: 'Trainer Management', icon: UserCog },
      { href: '/manager/schedule',        label: 'Trainer Schedule',   icon: CalendarClock },
      { href: '/manager/pt',              label: 'Personal Training',  icon: Users },
      { href: '/manager/workout',         label: 'Workout Management', icon: Dumbbell },
      { href: '/manager/library',         label: 'Diet Management',    icon: Utensils },
    ]
  },
  {
    group: 'Engagement',
    items: [
      { href: '/manager/communications',  label: 'Communications',     icon: Megaphone },
      { href: '/manager/referrals',       label: 'Referrals & Rewards',icon: Gift },
      { href: '/manager/notifications',   label: 'Notifications',      icon: MessageSquare },
    ]
  },
];

// Notifications are sourced from the Manager notification API; these defaults are UI-safe empty-state metadata only.

import { ManagerEnvConfig } from '@/app/manager/manager_utils/ManagerEnvConfig';

export const GYM_DETAILS = {
  name: ManagerEnvConfig.gymName,
  phone: ManagerEnvConfig.gymPhone,
  gstNumber: ManagerEnvConfig.gymGstNumber,
  address: ManagerEnvConfig.gymAddress,
};



export const MANAGER_ITEMS_PER_PAGE = 10;
