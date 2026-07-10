import {
 LayoutDashboard, Users, ClipboardList, BarChart2,
 UserCog, ShoppingBag, DollarSign, BookOpen, Dumbbell,
 MessageSquare, Settings, CalendarCheck, Shield
} from 'lucide-react';

export const ERP_NAV_ITEMS = [
 { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
 { href: '/members', label: 'Members', icon: Users },
 { href: '/plans', label: 'Plans', icon: ClipboardList },
 { href: '/sales', label: 'Sales & Reports', icon: BarChart2 },
 { href: '/attendance', label: 'Attendance', icon: CalendarCheck },
 { href: '/hr', label: 'HR Management', icon: UserCog },
 { href: '/store', label: 'Store', icon: ShoppingBag },
 { href: '/finance', label: 'Finance', icon: DollarSign },
 { href: '/library', label: 'Diet Library', icon: BookOpen },
 { href: '/workout', label: 'Workout Library', icon: Dumbbell },
 { href: '/inquiries', label: 'Inquiries & Leads',icon: MessageSquare },
 { href: '/audit', label: 'Audit Logs', icon: Shield },
 { href: '/settings', label: 'Settings', icon: Settings },
];

// TODO: Replace with real API call once Notifications backend module is built.
export const ERP_PLACEHOLDER_NOTIFICATIONS = [
 { id: 1, text: 'New member Amit registered', time: '5m ago', unread: true },
 { id: 2, text: 'Payment received from Rahul', time: '1h ago', unread: false },
 { id: 3, text: 'Pooja requested a trial session', time: '2h ago', unread: false },
];

export const GYM_DETAILS = {
  name: process.env.NEXT_PUBLIC_GYM_NAME || 'GymSmart Fitness',
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || '+91 83479 77566'
};
