// RESPONSIBILITY: Defines the role-owned SaaS Billing navigation item contract.
import type { LucideIcon } from 'lucide-react';

export interface SuperadminSaaSBillingNavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  routeMatch: string;
}
