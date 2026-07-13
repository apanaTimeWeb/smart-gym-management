// RESPONSIBILITY: ErpSharedConstants.ts handles the logic and UI for its corresponding feature.
import {
 LayoutDashboard, Users, ClipboardList, BarChart2,
 UserCog, ShoppingBag, DollarSign, BookOpen, Dumbbell,
 MessageSquare, Settings, CalendarCheck, Shield
} from 'lucide-react';

export const ERP_NAV_ITEMS = [
 { href: '/erp/dashboard', label: 'Dashboard', icon: LayoutDashboard },
 { href: '/erp/plans', label: 'Plans', icon: ClipboardList },
 { href: '/erp/members', label: 'Members', icon: Users },
 { href: '/erp/sales', label: 'Sales & Reports', icon: BarChart2 },
 { href: '/erp/attendance', label: 'Attendance', icon: CalendarCheck },
 { href: '/erp/hr', label: 'HR Management', icon: UserCog },
 { href: '/erp/store', label: 'Store', icon: ShoppingBag },
 { href: '/erp/finance', label: 'Finance', icon: DollarSign },
 { href: '/erp/library', label: 'Diet Library', icon: BookOpen },
 { href: '/erp/workout', label: 'Workout Library', icon: Dumbbell },
 { href: '/erp/inquiries', label: 'Inquiries & Leads',icon: MessageSquare },
 { href: '/erp/audit', label: 'Audit Logs', icon: Shield },
 { href: '/erp/settings', label: 'Settings', icon: Settings },
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

export const maskSensitiveData = (value: string, type: 'phone' | 'email' | 'text' = 'text'): string => {
  if (!value) return '';
  if (type === 'phone') {
    if (value.length < 10) return value;
    return `${value.slice(0, 2)}******${value.slice(-2)}`;
  }
  if (type === 'email') {
    const parts = value.split('@');
    if (parts.length !== 2) return value;
    return `${parts[0].charAt(0)}***@${parts[1]}`;
  }
  return '***';
};

export const ERP_ITEMS_PER_PAGE = 10;
