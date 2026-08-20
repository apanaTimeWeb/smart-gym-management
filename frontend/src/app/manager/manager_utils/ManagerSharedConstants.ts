// RESPONSIBILITY: Centralized constants shared across all MANAGER modules — nav items, placeholder notifications, gym identity (name/phone), sensitive data masking utility, and pagination page size.
import {
 LayoutDashboard, Users, ClipboardList, BarChart2,
 UserCog, ShoppingBag, DollarSign, BookOpen, Dumbbell,
 MessageSquare, Settings, CalendarCheck, Shield
} from 'lucide-react';

export const MANAGER_NAV_ITEMS = [
 { href: '/manager/dashboard', label: 'Dashboard', icon: LayoutDashboard },
 { href: '/manager/plans', label: 'Plans', icon: ClipboardList },
 { href: '/manager/members', label: 'Members', icon: Users },
 { href: '/manager/sales', label: 'Sales & Reports', icon: BarChart2 },
 { href: '/manager/attendance', label: 'Attendance', icon: CalendarCheck },
 { href: '/manager/hr', label: 'HR Management', icon: UserCog },
 { href: '/manager/store', label: 'Store', icon: ShoppingBag },
 { href: '/manager/finance', label: 'Finance', icon: DollarSign },
 { href: '/manager/library', label: 'Diet Library', icon: BookOpen },
 { href: '/manager/workout', label: 'Workout Library', icon: Dumbbell },
 { href: '/manager/inquiries', label: 'Inquiries & Leads',icon: MessageSquare },
 { href: '/manager/audit', label: 'Audit Logs', icon: Shield },
 { href: '/manager/settings', label: 'Settings', icon: Settings },
];

// TODO: Replace with real API call once Notifications backend module is built.
export const MANAGER_PLACEHOLDER_NOTIFICATIONS = [
 { id: 1, text: 'New member Amit registered', time: '5m ago', unread: true },
 { id: 2, text: 'Payment received from Rahul', time: '1h ago', unread: false },
 { id: 3, text: 'Pooja requested a trial session', time: '2h ago', unread: false },
];

export const GYM_DETAILS = {
  name: process.env.NEXT_PUBLIC_GYM_NAME || 'GymSmart Fitness',
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || '+91 83479 77566'
};



export const MANAGER_ITEMS_PER_PAGE = 10;
