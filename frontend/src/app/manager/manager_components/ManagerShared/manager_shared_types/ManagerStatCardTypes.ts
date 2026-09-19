// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { LucideIcon } from 'lucide-react';

export type ManagerStatCardChangeType = 'up' | 'down' | 'neutral';

export interface ManagerStatCardProps {
 title: string;
 value: string | number;
 change?: string;
 changeType?: ManagerStatCardChangeType;
 icon: LucideIcon;
 iconBg: string;
 iconColor: string;
}
