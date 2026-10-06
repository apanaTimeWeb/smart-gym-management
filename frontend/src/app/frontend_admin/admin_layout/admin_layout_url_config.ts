// RESPONSIBILITY: Centralized configuration for all ADMIN module routes, navigation groups, gym identity, and basic shared constants.
import {
  LayoutDashboard, ClipboardList, FileBarChart,
  IndianRupee, Settings, Building2, Users, ShieldAlert, Gauge, Bell,
  BarChart3, Tag, ShieldCheck, Wallet, Ban, BellRing, Download, Activity,
  CreditCard, TrendingUp, Target, CalendarCheck, MessageSquare
} from 'lucide-react';

export const ADMIN_NAV_GROUPS = [
  {
    groupKey: 'overview',
    items: [
      { href: '/admin/dashboard',           labelKey: 'dashboard',        icon: LayoutDashboard },
    ]
  },
  {
    groupKey: 'operations',
    items: [
      { href: '/admin/members',             labelKey: 'members',          icon: Users },
      { href: '/admin/attendance',          labelKey: 'attendance',       icon: CalendarCheck },
      { href: '/admin/plans',               labelKey: 'plans',            icon: ClipboardList },
      { href: '/admin/sales',               labelKey: 'salesReports',  icon: FileBarChart },
    ]
  },
  {
    groupKey: 'financePerformance',
    items: [
      { href: '/admin/finance',             labelKey: 'finance',          icon: IndianRupee },
      { href: '/admin/finance/pnl',         labelKey: 'branchPnl',       icon: TrendingUp },
      { href: '/admin/plans/revenue',       labelKey: 'planRevenue',     icon: TrendingUp },
      { href: '/admin/reports',             labelKey: 'reports',          icon: BarChart3 },
    ]
  },
  {
    groupKey: 'staffFranchise',
    items: [
      { href: '/admin/hr',                  labelKey: 'hrManagers',    icon: Users },
      { href: '/admin/hr/performance',      labelKey: 'staffPerformance',icon: Target },
      { href: '/admin/branches',            labelKey: 'branches',         icon: Building2 },
      { href: '/admin/payouts',             labelKey: 'payouts',          icon: Wallet },
    ]
  },
  {
    groupKey: 'communication',
    items: [
      { href: '/admin/announcements',       labelKey: 'announcements',    icon: BellRing },
      { href: '/admin/campaigns',           labelKey: 'campaigns',        icon: MessageSquare },
    ]
  },
  {
    groupKey: 'accessControl',
    items: [
      { href: '/admin/permissions',         labelKey: 'permissions',      icon: ShieldCheck },
      { href: '/admin/blacklist',           labelKey: 'blacklist',        icon: Ban },
      { href: '/admin/coupons',             labelKey: 'coupons',          icon: Tag },
    ]
  },
  {
    groupKey: 'system',
    items: [
      { href: '/admin/gym-health-alerts',   labelKey: 'healthAlerts',    icon: Activity },
      { href: '/admin/audit_logs',          labelKey: 'auditLogs',       icon: ShieldAlert },
      { href: '/admin/subscriptions',       labelKey: 'subscription',     icon: CreditCard },
      { href: '/admin/usage',               labelKey: 'usagePlan',     icon: Gauge },
      { href: '/admin/data-export',         labelKey: 'dataExport',      icon: Download },
      { href: '/admin/notifications',       labelKey: 'notifications',    icon: Bell },
      { href: '/admin/settings',            labelKey: 'settings',         icon: Settings },
    ]
  }
];


export const ADMIN_MONITORING_LOG_URL = '/admin/system/log';
export const ADMIN_DASHBOARD_URL = '/admin/dashboard';

export const ADMIN_DASHBOARD_ROUTE = '/admin/dashboard';


export const ADMIN_LAYOUT_URLS = {
  DASHBOARD: ADMIN_DASHBOARD_URL,
  SYSTEM_MONITORING_LOG: ADMIN_MONITORING_LOG_URL,
  PROFILE: '/admin/profile',
  SETTINGS: '/admin/settings',
} as const;

export const AdminLayoutUrlConfig = {
  PAGES: {
    PROFILE: ADMIN_LAYOUT_URLS.PROFILE,
    SETTINGS: ADMIN_LAYOUT_URLS.SETTINGS,
  },
} as const;
