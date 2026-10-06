// RESPONSIBILITY: Type definitions for the zero-business Manager searchable-dropdown primitive.

export interface ManagerSearchableDropdownOption {
  value: string | number;
  label: string;
}

export interface ManagerSearchableDropdownProps {
  options: readonly ManagerSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  dataTestId: string;
  ariaInvalid?: boolean;
  ariaDescribedBy?: string;
}
