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
      { href: '/frontend_admin/admin_dashboard',           labelKey: 'dashboard',        icon: LayoutDashboard },
    ]
  },
  {
    groupKey: 'operations',
    items: [
      { href: '/frontend_admin/admin_members',             labelKey: 'members',          icon: Users },
      { href: '/frontend_admin/admin_attendance',          labelKey: 'attendance',       icon: CalendarCheck },
      { href: '/frontend_admin/admin_plans',               labelKey: 'plans',            icon: ClipboardList },
      { href: '/frontend_admin/admin_sales',               labelKey: 'salesReports',  icon: FileBarChart },
    ]
  },
  {
    groupKey: 'financePerformance',
    items: [
      { href: '/frontend_admin/admin_finance',             labelKey: 'finance',          icon: IndianRupee },
      { href: '/frontend_admin/admin_finance/admin_finance_pnl',         labelKey: 'branchPnl',       icon: TrendingUp },
      { href: '/frontend_admin/admin_plans/admin_plans_revenue',       labelKey: 'planRevenue',     icon: TrendingUp },
      { href: '/frontend_admin/admin_reports',             labelKey: 'reports',          icon: BarChart3 },
    ]
  },
  {
    groupKey: 'staffFranchise',
    items: [
      { href: '/frontend_admin/admin_hr',                  labelKey: 'hrManagers',    icon: Users },
      { href: '/frontend_admin/admin_hr/admin_hr_performance',      labelKey: 'staffPerformance',icon: Target },
      { href: '/frontend_admin/admin_branches',            labelKey: 'branches',         icon: Building2 },
      { href: '/frontend_admin/admin_payouts',             labelKey: 'payouts',          icon: Wallet },
    ]
  },
  {
    groupKey: 'communication',
    items: [
      { href: '/frontend_admin/admin_announcements',       labelKey: 'announcements',    icon: BellRing },
      { href: '/frontend_admin/admin_campaigns',           labelKey: 'campaigns',        icon: MessageSquare },
    ]
  },
  {
    groupKey: 'accessControl',
    items: [
      { href: '/frontend_admin/admin_permissions',         labelKey: 'permissions',      icon: ShieldCheck },
      { href: '/frontend_admin/admin_blacklist',           labelKey: 'blacklist',        icon: Ban },
      { href: '/frontend_admin/admin_coupons',             labelKey: 'coupons',          icon: Tag },
    ]
  },
  {
    groupKey: 'system',
    items: [
      { href: '/frontend_admin/admin_gym_health_alerts',   labelKey: 'healthAlerts',    icon: Activity },
      { href: '/frontend_admin/admin_audit_logs',          labelKey: 'auditLogs',       icon: ShieldAlert },
      { href: '/frontend_admin/admin_subscriptions',       labelKey: 'subscription',     icon: CreditCard },
      { href: '/frontend_admin/admin_usage',               labelKey: 'usagePlan',     icon: Gauge },
      { href: '/frontend_admin/admin_data_export',         labelKey: 'dataExport',      icon: Download },
      { href: '/frontend_admin/admin_notifications',       labelKey: 'notifications',    icon: Bell },
      { href: '/frontend_admin/admin_settings',            labelKey: 'settings',         icon: Settings },
    ]
  }
];


export const ADMIN_MONITORING_LOG_URL = '/frontend_admin/admin_audit_logs';
export const ADMIN_DASHBOARD_URL = '/frontend_admin/admin_dashboard';

export const ADMIN_DASHBOARD_ROUTE = '/frontend_admin/admin_dashboard';


export const ADMIN_LAYOUT_URLS = {
  DASHBOARD: ADMIN_DASHBOARD_URL,
  SYSTEM_MONITORING_LOG: ADMIN_MONITORING_LOG_URL,
  PROFILE: '/frontend_admin/admin_profile',
  SETTINGS: '/frontend_admin/admin_settings',
} as const;

export const AdminLayoutUrlConfig = {
  PAGES: {
    PROFILE: ADMIN_LAYOUT_URLS.PROFILE,
    SETTINGS: ADMIN_LAYOUT_URLS.SETTINGS,
  },
} as const;
