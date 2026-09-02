// RESPONSIBILITY: Centralized constants shared across all ADMIN modules — nav items, placeholder notifications, gym identity (name/phone), sensitive data masking utility, and pagination page size.
import {
  LayoutDashboard, Users, ClipboardList, FileBarChart,
  IndianRupee, History, Settings, Building2
} from 'lucide-react';

 export const ADMIN_NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/branches', label: 'Branches', icon: Building2 },
  { href: '/admin/plans', label: 'Plans', icon: ClipboardList },
  { href: '/admin/members', label: 'Members', icon: Users },
  { href: '/admin/sales', label: 'Sales & Reports', icon: FileBarChart },
  { href: '/admin/finance', label: 'Finance', icon: IndianRupee },
  { href: '/admin/audit', label: 'Audit Logs', icon: History },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
 ];

// TODO: Replace with real API call once Notifications backend module is built.
export const ADMIN_PLACEHOLDER_NOTIFICATIONS = [
 { id: 1, text: 'New member Amit registered', time: '5m ago', unread: true },
 { id: 2, text: 'Payment received from Rahul', time: '1h ago', unread: false },
 { id: 3, text: 'Pooja requested a trial session', time: '2h ago', unread: false },
];

export const GYM_DETAILS = {
  name: process.env.NEXT_PUBLIC_GYM_NAME || 'GymSmart Fitness',
  phone: process.env.NEXT_PUBLIC_GYM_PHONE || '+91 83479 77566'
};



export const ADMIN_ITEMS_PER_PAGE = 10;
