// RESPONSIBILITY: Owns the typed props contract for this component.
import type { TrainerSearchableDropdownOption } from '@/app/trainer/trainer_components/trainer_components_types/TrainerSearchableDropdownOption';

export interface TrainerSearchableDropdownProps {
  options: TrainerSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  
}
