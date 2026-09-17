export type TimeRange = 'this_month' | 'last_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'monthly' | 'yearly' | 'custom';

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
