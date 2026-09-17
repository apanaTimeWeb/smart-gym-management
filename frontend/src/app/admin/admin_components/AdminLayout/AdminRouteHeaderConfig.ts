// RESPONSIBILITY: Central Admin route-to-header presentation metadata. Keeps shell copy independent from feature page components.

export interface AdminRouteHeaderConfig {
  title: string;
  subtitle: string;
}

const ADMIN_ROUTE_HEADERS: ReadonlyArray<{
  prefix: string;
  config: AdminRouteHeaderConfig;
}> = [
  { prefix: '/admin/finance/pnl', config: { title: 'Branch P&L Comparison', subtitle: 'Profit & Loss analysis across all branches' } },
  { prefix: '/admin/hr/performance', config: { title: 'Staff Performance', subtitle: 'Review branch staff performance and trends' } },
  { prefix: '/admin/plans/revenue', config: { title: 'Plan Revenue', subtitle: 'Compare membership-plan performance and revenue' } },
  { prefix: '/admin/audit_logs', config: { title: 'Audit Logs & Security', subtitle: 'Monitor critical system actions, detect fraud, and maintain compliance.' } },
  { prefix: '/admin/gym-health-alerts', config: { title: 'Gym Health Alerts', subtitle: 'Proactive monitoring — get alerted when a gym is underperforming before it becomes a crisis' } },
  { prefix: '/admin/data-export', config: { title: 'Data Export', subtitle: 'Export members, payments, and attendance data across all gyms in CSV, Excel, or PDF' } },
  { prefix: '/admin/announcements', config: { title: 'Announcements', subtitle: 'Broadcast notices to members, trainers, and staff across your branches' } },
  { prefix: '/admin/attendance', config: { title: 'Attendance Overview', subtitle: 'Read-only daily attendance analytics across all branches' } },
  { prefix: '/admin/blacklist', config: { title: 'Blacklist', subtitle: 'Manage cross-gym member bans — global or branch-specific' } },
  { prefix: '/admin/branches', config: { title: 'Branches', subtitle: 'Manage branch profiles, staff, finance, and operational status' } },
  { prefix: '/admin/coupons', config: { title: 'Coupons', subtitle: 'Create and manage discount coupons across all your gyms' } },
  { prefix: '/admin/dashboard', config: { title: 'Dashboard', subtitle: "Welcome back, Admin! Here's your business overview." } },
  { prefix: '/admin/finance', config: { title: 'Finance', subtitle: 'Track revenue, payments and financial overview' } },
  { prefix: '/admin/hr', config: { title: 'HR & Managers', subtitle: 'Manage branch managers, view staff profiles, and oversee payroll' } },
  { prefix: '/admin/members', config: { title: 'Members Overview', subtitle: 'Cross-branch member analytics, expiry tracking, and outstanding dues' } },
  { prefix: '/admin/notifications', config: { title: 'Notification Center', subtitle: 'Review and manage operational notifications' } },
  { prefix: '/admin/payouts', config: { title: 'Payouts & Profit', subtitle: 'Net profit per gym, monthly payout summaries, and tax-ready P&L statements' } },
  { prefix: '/admin/permissions', config: { title: 'Permissions', subtitle: 'Define what each role can access across your gyms' } },
  { prefix: '/admin/plans', config: { title: 'Membership Plans', subtitle: 'Manage subscription plans, pricing, and features' } },
  { prefix: '/admin/profile', config: { title: 'Profile', subtitle: 'Manage your Admin profile and account details' } },
  { prefix: '/admin/reports', config: { title: 'Reports', subtitle: 'Consolidated cross-gym analytics and performance reports' } },
  { prefix: '/admin/sales', config: { title: 'Sales & Reports', subtitle: 'Monitor membership revenue, track payments and analyze performance' } },
  { prefix: '/admin/settings', config: { title: 'Settings', subtitle: 'Configure your gym management system' } },
  { prefix: '/admin/subscriptions', config: { title: 'Subscription & Billing', subtitle: 'Manage your GymSmart SaaS plan, invoices, and payment methods.' } },
  { prefix: '/admin/usage', config: { title: 'Usage & Subscription', subtitle: 'Monitor your plan limits and manage your subscription' } },
];

export function getAdminRouteHeaderConfig(pathname: string): AdminRouteHeaderConfig {
  const match = ADMIN_ROUTE_HEADERS.find(({ prefix }) => pathname === prefix || pathname.startsWith(`${prefix}/`));
  return match?.config ?? { title: 'Admin', subtitle: 'GymSmart administration workspace' };
}
