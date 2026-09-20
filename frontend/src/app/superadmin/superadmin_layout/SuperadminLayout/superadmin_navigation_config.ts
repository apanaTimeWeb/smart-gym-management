// RESPONSIBILITY: Owns Superadmin role-level navigation grouping, labels, icons, and route destinations.
// DATA FLOW: role navigation config → SuperadminSidebar → SuperadminSidebarNavSection → route navigation.
import { LayoutDashboard, Building2, ServerCog, CreditCard, Ticket, Activity, DatabaseBackup, Receipt, ToggleLeft, DatabaseZap, Tag, Users, BarChart2, BarChart3, Gauge, Settings, History, UserPlus, MessageSquare, FileBarChart, TrendingDown, UserCircle, Send, Server, UsersRound, PlugZap, ArchiveX, Landmark, ListFilter, Globe } from 'lucide-react';
import { SuperadminWhiteLabelingUrlConfig } from '@/app/superadmin/white-labeling/white-labeling_api/superadmin_white_labeling_url_config';
import { AffiliatesUrlConfig } from '@/app/superadmin/affiliates/superadmin_affiliates_url_config';
import { AnalyticsUrlConfig } from '@/app/superadmin/analytics/superadmin_analytics_url_config';
import { CouponsUrlConfig } from '@/app/superadmin/saas-billing/coupons/superadmin_coupons_url_config';
import { FeaturesUrlConfig } from '@/app/superadmin/features/superadmin_features_url_config';
import { InvoicesUrlConfig } from '@/app/superadmin/saas-billing/invoices/superadmin_invoices_url_config';
import { MessagingUrlConfig } from '@/app/superadmin/messaging/superadmin_messaging_url_config';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';

import { PlansUrlConfig } from '@/app/superadmin/saas-billing/plans/superadmin_plans_url_config';
import { ProfileUrlConfig } from '@/app/superadmin/profile/superadmin_profile_url_config';
import { SettingsUrlConfig } from '@/app/superadmin/settings/superadmin_settings_url_config';
import { GlobalAuditUrlConfig } from '@/app/superadmin/global-audit/superadmin_global_audit_url_config';
import { BroadcastsUrlConfig } from '@/app/superadmin/broadcasts/superadmin_broadcasts_url_config';
import { DashboardUrlConfig } from '@/app/superadmin/dashboard/superadmin_dashboard_url_config';
import { GymsUrlConfig } from '@/app/superadmin/gyms/superadmin_gyms_url_config';

import { TicketsUrlConfig } from '@/app/superadmin/tickets/superadmin_tickets_url_config';
import { UsageMetersUrlConfig } from '@/app/superadmin/usage-meters/superadmin_usage_meters_url_config';
import { SuperadminTeamUrlConfig } from '@/app/superadmin/team/superadmin_team_url_config';
import { SuperadminIntegrationsUrlConfig } from '@/app/superadmin/integrations/superadmin_integrations_url_config';
import { SuperadminComplianceUrlConfig } from '@/app/superadmin/compliance/superadmin_compliance_url_config';
import { SuperadminSystemOpsUrlConfig } from '@/app/superadmin/system-ops/superadmin_system_ops_url_config';

export const SuperadminNavigationConfig = [
  { group: 'Overview', items: [{ name: 'Dashboard', href: DashboardUrlConfig.PAGES.MAIN, icon: LayoutDashboard }] },
  { group: 'Gyms & Tenants', items: [
    { name: 'Gyms & Tenants', href: GymsUrlConfig.PAGES.MAIN, icon: Building2 },
  ] },
  { group: 'Billing & Revenue', items: [
    { name: 'Revenue Analytics', href: AnalyticsUrlConfig.PAGES.MAIN, icon: BarChart2 },
    { name: 'SaaS Billing', href: PlansUrlConfig.PAGES.MAIN, icon: CreditCard },
    { name: 'Usage Meters', href: UsageMetersUrlConfig.PAGES.MAIN, icon: BarChart3 },
    { name: 'Tax & Compliance', href: SuperadminComplianceUrlConfig.PAGES.MAIN, icon: Landmark },
  ] },
  { group: 'Communication & Support', items: [
    { name: 'Support Tickets', href: TicketsUrlConfig.PAGES.MAIN, icon: Ticket },
    { name: 'Gym Messaging', href: MessagingUrlConfig.PAGES.MAIN, icon: MessageSquare },
    { name: 'Broadcast Messages', href: BroadcastsUrlConfig.PAGES.MAIN, icon: Send },
  ] },
  { group: 'Insights & Reports', items: [
    { name: 'Reports & Exports', href: ReportsUrlConfig.PAGES.MAIN, icon: FileBarChart },
  ] },
  { group: 'Platform Management', items: [
    { name: 'White-Labeling', href: SuperadminWhiteLabelingUrlConfig.PAGES.MAIN, icon: Globe },
    { name: 'Feature Flags', href: FeaturesUrlConfig.PAGES.MAIN, icon: ToggleLeft },
    { name: 'Affiliate Partners', href: AffiliatesUrlConfig.PAGES.MAIN, icon: Users },
    { name: 'Platform Team', href: SuperadminTeamUrlConfig.PAGES.MAIN, icon: UsersRound },
    { name: 'Integrations & Webhooks', href: SuperadminIntegrationsUrlConfig.PAGES.MAIN, icon: PlugZap },
    { name: 'System Ops', href: SuperadminSystemOpsUrlConfig.PAGES.MAIN, icon: ServerCog },
    { name: 'Global Audit Logs', href: GlobalAuditUrlConfig.PAGES.MAIN, icon: History },
    { name: 'Global Settings', href: SettingsUrlConfig.PAGES.MAIN, icon: Settings },
  ] },
  { group: 'Account', items: [{ name: 'My Profile', href: ProfileUrlConfig.PAGES.MAIN, icon: UserCircle }] },
];
