// RESPONSIBILITY: Centralized chart color constants for the Superadmin dashboard. Maps design system CSS variable values for use in ApexCharts configs where CSS variables cannot be used directly.
export const CHART_COLORS = {
  PRIMARY: '#6366F1',        // --primary
  TEXT_SECONDARY: '#8888AA', // --text-secondary (dark mode)
  BORDER: '#2A2A3E',         // --border (dark mode)
  SUCCESS: '#10B981',        // --success
  DANGER: '#EF4444',         // --danger
} as const;
