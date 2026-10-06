export type AdminProgressBarVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';

export interface AdminProgressBarProps {
  value: number;
  max?: number;
  variant?: AdminProgressBarVariant;
  label: string;
  className?: string;
}
