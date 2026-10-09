// RESPONSIBILITY: Typed props contract for the generic Trainer stat card.
import type { TrainerInfrastructureStatCardChangeType } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_types/TrainerInfrastructureStatCardTypes';

import type { LucideIcon } from 'lucide-react';

export interface TrainerInfrastructureStatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: TrainerInfrastructureStatCardChangeType;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}
