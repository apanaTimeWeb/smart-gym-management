// RESPONSIBILITY: Owns Manager role-level destinations used by shell and cross-feature navigation; contains no API or business workflow logic.
import { ManagerFinanceUrlConfig } from '@/app/frontend_manager/manager_finance/manager_finance_url_config';
import { ManagerMembersUrlConfig } from '@/app/frontend_manager/manager_members/manager_members_url_config';

/**
 * @description Central role navigation destinations for cross-feature links.
 * @dependencies Feature-owned URL configuration only.
 * @edge-case Keeps destination ownership at the role navigation boundary so feature URL configs contain only their own routes/API endpoints.
 */
export const MANAGER_NAVIGATION_DESTINATIONS = {
  MEMBERS: ManagerMembersUrlConfig.PAGES.LIST,
  FINANCE: ManagerFinanceUrlConfig.PAGES.LIST,
} as const;
