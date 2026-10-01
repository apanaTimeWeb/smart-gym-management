// RESPONSIBILITY: Defines the static presentation contract for System Ops summary cards.
import type { SuperadminSystemOpsSummary } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_types/SuperadminSystemOpsTypes';
import type { LucideIcon } from 'lucide-react';

export interface SuperadminSystemOpsCardDefinition {
  key: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
  labelKey: string;
  getLabelValues: (summary: SuperadminSystemOpsSummary) => Record<string, string>;
  toneClass: string;
}
