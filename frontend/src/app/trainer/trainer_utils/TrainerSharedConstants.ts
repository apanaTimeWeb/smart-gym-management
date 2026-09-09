// RESPONSIBILITY: Centralized constants shared across all TRAINER modules — nav items, gym identity (name/phone), and pagination page size.
// DATA FLOW: Imported directly by TrainerSidebar, TrainerHeader, and module-level utils.
import {
  LayoutDashboard, Users, Utensils, Dumbbell, CalendarCheck, Clock, Bell, User, IndianRupee, Calendar
} from 'lucide-react';

export const TRAINER_NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { href: '/trainer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    group: 'Members & Training',
    items: [
      { href: '/trainer/members', label: 'My Members', icon: Users },
      { href: '/trainer/workout', label: 'Workout & Exercises', icon: Dumbbell },
      { href: '/trainer/library', label: 'Diet Library', icon: Utensils },
      { href: '/trainer/sessions', label: 'Sessions', icon: Clock },
    ]
  },
  {
    group: 'Schedule & Attendance',
    items: [
      { href: '/trainer/attendance', label: 'Attendance', icon: CalendarCheck },
      { href: '/trainer/schedule', label: 'Schedule & Leaves', icon: Calendar },
    ]
  },
  {
    group: 'Performance & Earnings',
    items: [
      { href: '/trainer/earnings', label: 'Earnings', icon: IndianRupee },
    ]
  },
  {
    group: 'Account',
    items: [
      { href: '/trainer/notifications', label: 'Notifications', icon: Bell },
      { href: '/trainer/profile', label: 'My Profile', icon: User },
    ]
  }
];

export const GYM_DETAILS = {
  name: process.env.NEXT_PUBLIC_GYM_NAME || 'GymSmart Fitness',
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || '+91 83479 77566'
};



export const TRAINER_ITEMS_PER_PAGE = 10;

