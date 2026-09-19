// RESPONSIBILITY: Typed props contract for the generic Trainer stat card.
import type { LucideIcon } from 'lucide-react';
import type { TrainerStatCardChangeType } from '@/app/trainer/trainer_components/trainer_components_types/TrainerStatCardTypes';

export interface TrainerStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: TrainerStatCardChangeType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
