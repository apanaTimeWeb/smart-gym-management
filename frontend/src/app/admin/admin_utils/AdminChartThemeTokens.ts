// RESPONSIBILITY: Admin-owned chart token references. Values resolve through global design-system CSS variables.
export const ADMIN_CHART_THEME = {
  primary: 'var(--primary)',
  success: 'var(--success)',
  danger: 'var(--danger)',
  warning: 'var(--warning)',
  info: 'var(--info)',
  textPrimary: 'var(--text-primary)',
  textSecondary: 'var(--text-secondary)',
  border: 'var(--border)',
  grid: 'var(--border)',
  transparent: 'transparent',
} as const;
