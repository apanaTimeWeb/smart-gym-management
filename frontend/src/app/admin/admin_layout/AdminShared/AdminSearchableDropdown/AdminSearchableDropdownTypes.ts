export interface AdminSearchableDropdownOption {
  value: string | number;
  label: string;
}

export interface AdminSearchableDropdownProps {
  options: AdminSearchableDropdownOption[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}
