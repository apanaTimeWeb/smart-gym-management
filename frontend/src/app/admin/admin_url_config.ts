// RESPONSIBILITY: Centralized configuration for all ADMIN module routes, navigation groups, gym identity, and basic shared constants.
import {
  LayoutDashboard, ClipboardList, FileBarChart,
  IndianRupee, Settings, Building2, Users, ShieldAlert, Gauge, Bell,
  BarChart3, Tag, ShieldCheck, Wallet, Ban, BellRing, Download, Activity,
  CreditCard, TrendingUp, Target, CalendarCheck
} from 'lucide-react';
import { env } from '@/config/env';

export const ADMIN_NAV_GROUPS = [
  {
    group: 'Overview',
    items: [
      { href: '/admin/dashboard',           label: 'Dashboard',        icon: LayoutDashboard },
    ]
  },
  {
    group: 'Operations',
    items: [
      { href: '/admin/members',             label: 'Members',          icon: Users },
      { href: '/admin/attendance',          label: 'Attendance',       icon: CalendarCheck },
      { href: '/admin/plans',               label: 'Plans',            icon: ClipboardList },
      { href: '/admin/sales',               label: 'Sales & Reports',  icon: FileBarChart },
    ]
  },
  {
    group: 'Finance & Performance',
    items: [
      { href: '/admin/finance',             label: 'Finance',          icon: IndianRupee },
      { href: '/admin/finance/pnl',         label: 'Branch P&L',       icon: TrendingUp },
      { href: '/admin/plans/revenue',       label: 'Plan Revenue',     icon: TrendingUp },
      { href: '/admin/reports',             label: 'Reports',          icon: BarChart3 },
    ]
  },
  {
    group: 'Staff & Franchise',
    items: [
      { href: '/admin/hr',                  label: 'HR & Managers',    icon: Users },
      { href: '/admin/hr/performance',      label: 'Staff Performance',icon: Target },
      { href: '/admin/branches',            label: 'Branches',         icon: Building2 },
      { href: '/admin/payouts',             label: 'Payouts',          icon: Wallet },
    ]
  },
  {
    group: 'Communication',
    items: [
      { href: '/admin/announcements',       label: 'Announcements',    icon: BellRing },
    ]
  },
  {
    group: 'Access & Control',
    items: [
      { href: '/admin/permissions',         label: 'Permissions',      icon: ShieldCheck },
      { href: '/admin/blacklist',           label: 'Blacklist',        icon: Ban },
      { href: '/admin/coupons',             label: 'Coupons',          icon: Tag },
    ]
  },
  {
    group: 'System',
    items: [
      { href: '/admin/gym-health-alerts',   label: 'Health Alerts',    icon: Activity },
      { href: '/admin/audit_logs',          label: 'Audit Logs',       icon: ShieldAlert },
      { href: '/admin/subscriptions',       label: 'Subscription',     icon: CreditCard },
      { href: '/admin/usage',               label: 'Usage & Plan',     icon: Gauge },
      { href: '/admin/data-export',         label: 'Data Export',      icon: Download },
      { href: '/admin/notifications',       label: 'Notifications',    icon: Bell },
      { href: '/admin/settings',            label: 'Settings',         icon: Settings },
    ]
  }
];

// TODO: Replace with real API call once Notifications backend module is built.
export const ADMIN_PLACEHOLDER_NOTIFICATIONS = [
 { id: 1, text: 'New member Amit registered', time: '5m ago', unread: true },
 { id: 2, text: 'Payment received from Rahul', time: '1h ago', unread: false },
 { id: 3, text: 'Pooja requested a trial session', time: '2h ago', unread: false },
];

export const GYM_DETAILS = {
  name: env.NEXT_PUBLIC_GYM_NAME,
  phone: env.NEXT_PUBLIC_GYM_PHONE,
};

export const ADMIN_ITEMS_PER_PAGE = 10;

export const STATUS_STYLES: Record<string, string> = {
  active: 'text-success bg-success-bg border-success/20',
  expired: 'text-danger bg-danger-bg border-danger/20',
  pending: 'text-warning bg-warning-bg border-warning/20',
  frozen: 'text-info bg-info-bg border-info/20',
};
