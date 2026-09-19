// RESPONSIBILITY: Centralized constants shared across all TRAINER modules — nav items, gym identity (name/phone), and pagination page size.
// DATA FLOW: Imported directly by TrainerSidebar, TrainerHeader, and module-level utils.
import { env } from '@/config/env';
import { TrainerPageUrlConfig } from '@/app/trainer/Trainer_url_config';
import {
  LayoutDashboard, Users, Utensils, Dumbbell, CalendarCheck, Clock, Bell, User, IndianRupee, Calendar
} from 'lucide-react';

export const TRAINER_NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { href: TrainerPageUrlConfig.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    group: 'Members & Training',
    items: [
      { href: TrainerPageUrlConfig.MEMBERS, label: 'My Members', icon: Users },
      { href: TrainerPageUrlConfig.WORKOUT, label: 'Workout & Exercises', icon: Dumbbell },
      { href: TrainerPageUrlConfig.LIBRARY, label: 'Diet Library', icon: Utensils },
      { href: TrainerPageUrlConfig.SESSIONS, label: 'Sessions', icon: Clock },
    ]
  },
  {
    group: 'Schedule & Attendance',
    items: [
      { href: TrainerPageUrlConfig.ATTENDANCE, label: 'Attendance', icon: CalendarCheck },
      { href: TrainerPageUrlConfig.SCHEDULE, label: 'Schedule & Leaves', icon: Calendar },
    ]
  },
  {
    group: 'Performance & Earnings',
    items: [
      { href: TrainerPageUrlConfig.EARNINGS, label: 'Earnings', icon: IndianRupee },
    ]
  },
  {
    group: 'Account',
    items: [
      { href: TrainerPageUrlConfig.NOTIFICATIONS, label: 'Notifications', icon: Bell },
      { href: TrainerPageUrlConfig.PROFILE, label: 'My Profile', icon: User },
    ]
  }
];

export const GYM_DETAILS = {
  name: env.NEXT_PUBLIC_GYM_NAME,
  phone: env.NEXT_PUBLIC_GYM_PHONE
};



export const TRAINER_ITEMS_PER_PAGE = 10;
