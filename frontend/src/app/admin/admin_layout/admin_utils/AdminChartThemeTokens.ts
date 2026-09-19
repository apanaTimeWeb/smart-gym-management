// RESPONSIBILITY: Admin-owned chart token references. Values resolve through global design-system CSS variables.
export const ADMIN_CHART_THEME = {
  primary: 'var(--chart-primary)',
  success: 'var(--chart-success)',
  danger: 'var(--chart-danger)',
  warning: 'var(--chart-warning)',
  info: 'var(--chart-info)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  border: 'var(--border)',
  grid: 'var(--chart-grid)',
  transparent: 'transparent',
} as const;
