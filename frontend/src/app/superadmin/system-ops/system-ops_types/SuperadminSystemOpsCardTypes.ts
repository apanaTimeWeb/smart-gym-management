// RESPONSIBILITY: Defines the static presentation contract for System Ops summary cards.
import type { LucideIcon } from 'lucide-react';
import type { SuperadminSystemOpsSummary } from '@/app/superadmin/system-ops/system-ops_types/SuperadminSystemOpsTypes';

export interface SuperadminSystemOpsCardDefinition {
  key: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  label: (summary: SuperadminSystemOpsSummary) => string;
  toneClass: string;
}
