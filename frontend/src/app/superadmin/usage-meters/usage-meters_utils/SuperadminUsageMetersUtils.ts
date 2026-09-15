// RESPONSIBILITY: Encapsulates functionality for SuperadminUsageMetersUtils.ts
export const getProgressColor = (used: number, limit: number) => {
  const percent = (used / limit) * 100;
  if (percent >= 90) return 'bg-danger';
  if (percent >= 75) return 'bg-warning';
  return 'bg-primary';
};

/** Returns percentage as a number (0–100), capped at 100. Format for display with toFixed or formatNumber at call site. */
export const getPercentage = (used: number, limit: number): number => {
  return Math.min(100, (used / limit) * 100);
};

