/**
 * RESPONSIBILITY: Module-owned TypeScript module SuperadminLayoutRouteHeaderConfig owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: No explicit module import dependencies.
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Central Superadmin route-to-header presentation metadata. Keeps shell copy independent from feature page components.

export interface SuperadminRouteHeaderConfig {
  title: string;
  subtitle: string;
}

const ADMIN_ROUTE_HEADERS: ReadonlyArray<{
  prefix: string;
  config: SuperadminRouteHeaderConfig;
}> = [
  { prefix: '/frontend_superadmin/superadmin_finance/pnl', config: { title: 'Branch P&L Comparison', subtitle: 'Profit & Loss analysis across all branches' } },
  { prefix: '/frontend_superadmin/superadmin_hr/performance', config: { title: 'Staff Performance', subtitle: 'Review branch staff performance and trends' } },
  { prefix: '/frontend_superadmin/superadmin_plans/revenue', config: { title: 'Plan Revenue', subtitle: 'Compare membership-plan performance and revenue' } },
  { prefix: '/frontend_superadmin/superadmin_audit_logs', config: { title: 'Audit Logs & Security', subtitle: 'Monitor critical system actions, detect fraud, and maintain compliance.' } },
  { prefix: '/frontend_superadmin/superadmin_gym-health-alerts', config: { title: 'Gym Health Alerts', subtitle: 'Proactive monitoring — get alerted when a gym is underperforming before it becomes a crisis' } },
  { prefix: '/frontend_superadmin/superadmin_data-export', config: { title: 'Data Export', subtitle: 'Export members, payments, and attendance data across all gyms in CSV, Excel, or PDF' } },
  { prefix: '/frontend_superadmin/superadmin_announcements', config: { title: 'Announcements', subtitle: 'Broadcast notices to members, trainers, and staff across your branches' } },
  { prefix: '/frontend_superadmin/superadmin_attendance', config: { title: 'Attendance Overview', subtitle: 'Read-only daily attendance analytics across all branches' } },
  { prefix: '/frontend_superadmin/superadmin_blacklist', config: { title: 'Blacklist', subtitle: 'Manage cross-gym member bans — global or branch-specific' } },
  { prefix: '/frontend_superadmin/superadmin_branches', config: { title: 'Branches', subtitle: 'Manage branch profiles, staff, finance, and operational status' } },
  { prefix: '/frontend_superadmin/superadmin_campaigns', config: { title: 'Campaigns', subtitle: 'Run bulk WhatsApp campaigns across all your branches' } },
  { prefix: '/frontend_superadmin/superadmin_coupons', config: { title: 'Coupons', subtitle: 'Create and manage discount coupons across all your gyms' } },
  { prefix: '/frontend_superadmin/superadmin_dashboard', config: { title: 'Dashboard', subtitle: "Welcome back, Superadmin! Here's your business overview." } },
  { prefix: '/frontend_superadmin/superadmin_finance', config: { title: 'Finance', subtitle: 'Track revenue, payments and financial overview' } },
  { prefix: '/frontend_superadmin/superadmin_hr', config: { title: 'HR & Managers', subtitle: 'Manage branch managers, view staff profiles, and oversee payroll' } },
  { prefix: '/frontend_superadmin/superadmin_members', config: { title: 'Members Overview', subtitle: 'Cross-branch member analytics, expiry tracking, and outstanding dues' } },
  { prefix: '/frontend_superadmin/superadmin_notifications', config: { title: 'Notification Center', subtitle: 'Review and manage operational notifications' } },
  { prefix: '/frontend_superadmin/superadmin_payouts', config: { title: 'Payouts & Profit', subtitle: 'Net profit per gym, monthly payout summaries, and tax-ready P&L statements' } },
  { prefix: '/frontend_superadmin/superadmin_permissions', config: { title: 'Permissions', subtitle: 'Define what each role can access across your gyms' } },
  { prefix: '/frontend_superadmin/superadmin_plans', config: { title: 'Membership Plans', subtitle: 'Manage subscription plans, pricing, and features' } },
  { prefix: '/frontend_superadmin/superadmin_profile', config: { title: 'Profile', subtitle: 'Manage your Superadmin profile and account details' } },
  { prefix: '/frontend_superadmin/superadmin_superadmin_reports', config: { title: 'Reports', subtitle: 'Consolidated cross-gym analytics and performance reports' } },
  { prefix: '/frontend_superadmin/superadmin_sales', config: { title: 'Sales & Reports', subtitle: 'Monitor membership revenue, track payments and analyze performance' } },
  { prefix: '/frontend_superadmin/superadmin_superadmin_settings', config: { title: 'Settings', subtitle: 'Configure your gym management system' } },
  { prefix: '/frontend_superadmin/superadmin_subscriptions', config: { title: 'Subscription & Billing', subtitle: 'Manage your GymSmart SaaS plan, invoices, and payment methods.' } },
  { prefix: '/frontend_superadmin/superadmin_usage', config: { title: 'Usage & Subscription', subtitle: 'Monitor your plan limits and manage your subscription' } },
];

export function getSuperadminRouteHeaderConfig(pathname: string): SuperadminRouteHeaderConfig {
  const match = ADMIN_ROUTE_HEADERS.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return match?.config ?? { title: 'Superadmin', subtitle: 'GymSmart superadministration workspace' };
}
