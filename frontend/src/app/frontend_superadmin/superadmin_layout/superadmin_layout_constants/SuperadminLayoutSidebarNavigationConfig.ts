import { Home, Users, BarChart2, Shield, Wrench, Ticket, Mail, Link as LinkIcon, Building2, CreditCard, FileText, Megaphone, Palette, Flag, Briefcase, Activity, Settings, User } from 'lucide-react';

/**
 * RESPONSIBILITY: Owns role-level Superadmin navigation metadata only; it delegates route ownership to feature URL contracts and contains no feature business logic.
 */
import { MODULE_URLS as SUPERADMIN_DASHBOARD_URLS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';
import { MODULE_URLS as SUPERADMIN_ANALYTICS_URLS } from '@/app/frontend_superadmin/superadmin_analytics/superadmin_analytics_url_config';
import { MODULE_URLS as SUPERADMIN_GYMS_URLS } from '@/app/frontend_superadmin/superadmin_gyms/superadmin_gyms_url_config';
import { MODULE_URLS as SUPERADMIN_PLANS_URLS } from '@/app/frontend_superadmin/superadmin_plans/superadmin_plans_url_config';
import { MODULE_URLS as SUPERADMIN_AFFILIATES_URLS } from '@/app/frontend_superadmin/superadmin_affiliates/superadmin_affiliates_url_config';
import { MODULE_URLS as SUPERADMIN_FEATURES_URLS } from '@/app/frontend_superadmin/superadmin_features/superadmin_features_url_config';
import { MODULE_URLS as SUPERADMIN_INTEGRATIONS_URLS } from '@/app/frontend_superadmin/superadmin_integrations/superadmin_integrations_url_config';
import { MODULE_URLS as SUPERADMIN_REPORTS_URLS } from '@/app/frontend_superadmin/superadmin_reports/superadmin_reports_url_config';
import { MODULE_URLS as SUPERADMIN_SYSTEM_OPS_URLS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_url_config';
import { MODULE_URLS as SUPERADMIN_TICKETS_URLS } from '@/app/frontend_superadmin/superadmin_tickets/superadmin_tickets_url_config';
import { MODULE_URLS as SUPERADMIN_MESSAGING_URLS } from '@/app/frontend_superadmin/superadmin_messaging/superadmin_messaging_url_config';
import { MODULE_URLS as SUPERADMIN_PROFILE_URLS } from '@/app/frontend_superadmin/superadmin_profile/superadmin_profile_url_config';
import { MODULE_URLS as SUPERADMIN_USAGE_METERS_URLS } from '@/app/frontend_superadmin/superadmin_usage_meters/superadmin_usage_meters_url_config';
import { MODULE_URLS as SUPERADMIN_COMPLIANCE_URLS } from '@/app/frontend_superadmin/superadmin_compliance/superadmin_compliance_url_config';
import { MODULE_URLS as SUPERADMIN_BROADCASTS_URLS } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_url_config';
import { MODULE_URLS as SUPERADMIN_WHITE_LABELING_URLS } from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_url_config';
import { MODULE_URLS as SUPERADMIN_TEAM_URLS } from '@/app/frontend_superadmin/superadmin_team/superadmin_team_url_config';
import { MODULE_URLS as SUPERADMIN_GLOBAL_AUDIT_URLS } from '@/app/frontend_superadmin/superadmin_global_audit/superadmin_global_audit_url_config';
import { MODULE_URLS as SUPERADMIN_SETTINGS_URLS } from '@/app/frontend_superadmin/superadmin_settings/superadmin_settings_url_config';

import type { LucideIcon } from 'lucide-react';

export interface SuperadminNavigationItemConfig {
  labelKey: string;
  href: string;
  icon: LucideIcon;
}

export interface SuperadminNavigationGroupConfig {
  labelKey: string;
  items: readonly SuperadminNavigationItemConfig[];
}

export const SUPERADMIN_NAV_GROUPS: readonly SuperadminNavigationGroupConfig[] = [
  {
    labelKey: 'navigation.groups.overview',
    items: [
      { labelKey: 'navigation.items.dashboard', href: SUPERADMIN_DASHBOARD_URLS.PAGES.MAIN, icon: Home },
    ],
  },
  {
    labelKey: 'navigation.groups.gyms',
    items: [
      { labelKey: 'navigation.items.gyms', href: SUPERADMIN_GYMS_URLS.PAGES.MAIN, icon: Building2 },
    ],
  },
  {
    labelKey: 'navigation.groups.billing',
    items: [
      { labelKey: 'navigation.items.analytics', href: SUPERADMIN_ANALYTICS_URLS.PAGES.MAIN, icon: BarChart2 },
      { labelKey: 'navigation.items.plans', href: SUPERADMIN_PLANS_URLS.PAGES.MAIN, icon: CreditCard },
      { labelKey: 'navigation.items.usage_meters', href: SUPERADMIN_USAGE_METERS_URLS.PAGES.MAIN, icon: Activity },
      { labelKey: 'navigation.items.compliance', href: SUPERADMIN_COMPLIANCE_URLS.PAGES.MAIN, icon: FileText },
    ],
  },
  {
    labelKey: 'navigation.groups.communication',
    items: [
      { labelKey: 'navigation.items.tickets', href: SUPERADMIN_TICKETS_URLS.PAGES.MAIN, icon: Ticket },
      { labelKey: 'navigation.items.messaging', href: SUPERADMIN_MESSAGING_URLS.PAGES.MAIN, icon: Mail },
      { labelKey: 'navigation.items.broadcasts', href: SUPERADMIN_BROADCASTS_URLS.PAGES.MAIN, icon: Megaphone },
    ],
  },
  {
    labelKey: 'navigation.groups.insights',
    items: [
      { labelKey: 'navigation.items.reports', href: SUPERADMIN_REPORTS_URLS.PAGES.MAIN, icon: FileText },
    ],
  },
  {
    labelKey: 'navigation.groups.platform',
    items: [
      { labelKey: 'navigation.items.white_labeling', href: SUPERADMIN_WHITE_LABELING_URLS.PAGES.MAIN, icon: Palette },
      { labelKey: 'navigation.items.features', href: SUPERADMIN_FEATURES_URLS.PAGES.MAIN, icon: Flag },
      { labelKey: 'navigation.items.affiliates', href: SUPERADMIN_AFFILIATES_URLS.PAGES.MAIN, icon: Users },
      { labelKey: 'navigation.items.team', href: SUPERADMIN_TEAM_URLS.PAGES.MAIN, icon: Briefcase },
      { labelKey: 'navigation.items.integrations', href: SUPERADMIN_INTEGRATIONS_URLS.PAGES.MAIN, icon: LinkIcon },
      { labelKey: 'navigation.items.system_ops', href: SUPERADMIN_SYSTEM_OPS_URLS.PAGES.MAIN, icon: Wrench },
      { labelKey: 'navigation.items.global_audit', href: SUPERADMIN_GLOBAL_AUDIT_URLS.PAGES.MAIN, icon: Shield },
      { labelKey: 'navigation.items.settings', href: SUPERADMIN_SETTINGS_URLS.PAGES.MAIN, icon: Settings },
    ],
  },
  {
    labelKey: 'navigation.groups.account',
    items: [
      { labelKey: 'navigation.items.profile', href: SUPERADMIN_PROFILE_URLS.PAGES.MAIN, icon: User },
    ],
  },
];
