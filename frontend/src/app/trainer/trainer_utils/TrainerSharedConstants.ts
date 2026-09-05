// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Centralized constants shared across all TRAINER modules — nav items, placeholder notifications, gym identity (name/phone), sensitive data masking utility, and pagination page size.
import {
  LayoutDashboard, Users, Utensils, Dumbbell, CalendarCheck
} from 'lucide-react';

export const TRAINER_NAV_ITEMS = [
 { href: '/trainer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
 { href: '/trainer/members', label: 'Members', icon: Users },
 { href: '/trainer/attendance', label: 'Attendance', icon: CalendarCheck },
 { href: '/trainer/library', label: 'Diet Library', icon: Utensils },
 { href: '/trainer/workout', label: 'Workout Library', icon: Dumbbell },
];

// TODO: Replace with real API call once Notifications backend module is built.
export const TRAINER_PLACEHOLDER_NOTIFICATIONS = [
 { id: 1, text: 'New member Amit registered', time: '5m ago', unread: true },
 { id: 2, text: 'Payment received from Rahul', time: '1h ago', unread: false },
 { id: 3, text: 'Pooja requested a trial session', time: '2h ago', unread: false },
];

export const GYM_DETAILS = {
  name: process.env.NEXT_PUBLIC_GYM_NAME || 'GymSmart Fitness',
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || '+91 83479 77566'
};



export const TRAINER_ITEMS_PER_PAGE = 10;

