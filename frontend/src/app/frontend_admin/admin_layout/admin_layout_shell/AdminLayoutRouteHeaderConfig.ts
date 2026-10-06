// RESPONSIBILITY: Central Admin route-to-header presentation metadata. Keeps shell copy independent from feature page components.

import type { AdminRouteHeaderConfigValue } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

const ADMIN_ROUTE_HEADERS: ReadonlyArray<{
  prefix: string;
  config: AdminRouteHeaderConfigValue;
}> = [
  { prefix: '/admin/finance/pnl', config: { titleKey: 'route_admin_finance_pnl_title', subtitleKey: 'route_admin_finance_pnl_subtitle' } },
  { prefix: '/admin/hr/performance', config: { titleKey: 'route_admin_hr_performance_title', subtitleKey: 'route_admin_hr_performance_subtitle' } },
  { prefix: '/admin/plans/revenue', config: { titleKey: 'route_admin_plans_revenue_title', subtitleKey: 'route_admin_plans_revenue_subtitle' } },
  { prefix: '/admin/audit_logs', config: { titleKey: 'route_admin_audit_logs_title', subtitleKey: 'route_admin_audit_logs_subtitle' } },
  { prefix: '/admin/gym-health-alerts', config: { titleKey: 'route_admin_gym_health_alerts_title', subtitleKey: 'route_admin_gym_health_alerts_subtitle' } },
  { prefix: '/admin/data-export', config: { titleKey: 'route_admin_data_export_title', subtitleKey: 'route_admin_data_export_subtitle' } },
  { prefix: '/admin/announcements', config: { titleKey: 'route_admin_announcements_title', subtitleKey: 'route_admin_announcements_subtitle' } },
  { prefix: '/admin/attendance', config: { titleKey: 'route_admin_attendance_title', subtitleKey: 'route_admin_attendance_subtitle' } },
  { prefix: '/admin/blacklist', config: { titleKey: 'route_admin_blacklist_title', subtitleKey: 'route_admin_blacklist_subtitle' } },
  { prefix: '/admin/branches', config: { titleKey: 'route_admin_branches_title', subtitleKey: 'route_admin_branches_subtitle' } },
  { prefix: '/admin/campaigns', config: { titleKey: 'route_admin_campaigns_title', subtitleKey: 'route_admin_campaigns_subtitle' } },
  { prefix: '/admin/coupons', config: { titleKey: 'route_admin_coupons_title', subtitleKey: 'route_admin_coupons_subtitle' } },
  { prefix: '/admin/dashboard', config: { titleKey: 'route_admin_dashboard_title', subtitleKey: 'route_admin_dashboard_subtitle' } },
  { prefix: '/admin/finance', config: { titleKey: 'route_admin_finance_title', subtitleKey: 'route_admin_finance_subtitle' } },
  { prefix: '/admin/hr', config: { titleKey: 'route_admin_hr_title', subtitleKey: 'route_admin_hr_subtitle' } },
  { prefix: '/admin/members', config: { titleKey: 'route_admin_members_title', subtitleKey: 'route_admin_members_subtitle' } },
  { prefix: '/admin/notifications', config: { titleKey: 'route_admin_notifications_title', subtitleKey: 'route_admin_notifications_subtitle' } },
  { prefix: '/admin/payouts', config: { titleKey: 'route_admin_payouts_title', subtitleKey: 'route_admin_payouts_subtitle' } },
  { prefix: '/admin/permissions', config: { titleKey: 'route_admin_permissions_title', subtitleKey: 'route_admin_permissions_subtitle' } },
  { prefix: '/admin/plans', config: { titleKey: 'route_admin_plans_title', subtitleKey: 'route_admin_plans_subtitle' } },
  { prefix: '/admin/profile', config: { titleKey: 'route_admin_profile_title', subtitleKey: 'route_admin_profile_subtitle' } },
  { prefix: '/admin/reports', config: { titleKey: 'route_admin_reports_title', subtitleKey: 'route_admin_reports_subtitle' } },
  { prefix: '/admin/sales', config: { titleKey: 'route_admin_sales_title', subtitleKey: 'route_admin_sales_subtitle' } },
  { prefix: '/admin/settings', config: { titleKey: 'route_admin_settings_title', subtitleKey: 'route_admin_settings_subtitle' } },
  { prefix: '/admin/subscriptions', config: { titleKey: 'route_admin_subscriptions_title', subtitleKey: 'route_admin_subscriptions_subtitle' } },
  { prefix: '/admin/usage', config: { titleKey: 'route_admin_usage_title', subtitleKey: 'route_admin_usage_subtitle' } },
];

/**
 * AdminLayoutRouteHeaderConfig maps the active Admin route to translation keys used by the persistent shell header.
 * @remarks Keep this declaration isolated from unrelated business modules and preserve its documented contract.
 */
export const AdminLayoutRouteHeaderConfig = (pathname: string): AdminRouteHeaderConfigValue => {
  const match = ADMIN_ROUTE_HEADERS.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return match?.config ?? { titleKey: 'route_default_title', subtitleKey: 'route_default_subtitle' };
};
