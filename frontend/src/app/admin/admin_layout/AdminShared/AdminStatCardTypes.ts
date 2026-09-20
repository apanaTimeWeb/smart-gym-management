// RESPONSIBILITY: Defines the zero-business KPI card contract. Feature modules provide their own semantic content values/classes.
import type { LucideIcon } from 'lucide-react';

export type AdminStatCardTrend = 'up' | 'down' | 'neutral';

export interface AdminStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: AdminStatCardTrend;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
