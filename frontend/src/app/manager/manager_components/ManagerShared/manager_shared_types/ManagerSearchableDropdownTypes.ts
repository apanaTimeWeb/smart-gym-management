// RESPONSIBILITY: Type definitions for the owning Manager UI component.
import type { CSSProperties } from 'react';

export interface ManagerSearchableDropdownOption {
  value: string | number;
  label: string;
}

export interface ManagerSearchableDropdownProps {
  options: ManagerSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  containerStyle?: CSSProperties;
}
