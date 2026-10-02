// RESPONSIBILITY: Verifies Dashboard semantic visual configuration and user-facing time presets.
import { describe, expect, it } from 'vitest';

import { SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES, SUPERADMIN_DASHBOARD_CHART_COLORS, DASHBOARD_PLAN_BADGE_CLASSES, DASHBOARD_PLAN_BADGE_FALLBACK_CLASS, DASHBOARD_TIME_RANGE_LABELS, SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_constants/SuperadminDashboardConstants';



describe('SuperadminDashboardConstants', () => {
  it('uses semantic status tokens for every alert tone', () => {
    for (const tone of Object.values(SUPERADMIN_DASHBOARD_ALERT_TONE_CLASSES)) {
      expect(tone.badge).toMatch(/bg-(danger|warning|info)-bg/);
      expect(tone.icon).toMatch(/text-(danger|warning|info)/);
    }
  });
  it('uses semantic chart token references', () => {
    expect(SUPERADMIN_DASHBOARD_CHART_COLORS.PRIMARY).toBe('var(--chart-primary)');
    expect(SUPERADMIN_DASHBOARD_CHART_COLORS.DANGER).toBe('var(--chart-danger)');
    expect(SUPERADMIN_DASHBOARD_CHART_COLORS.BORDER).toBe('var(--border)');
  });
  it('defines the expected dashboard time ranges and fallback badge', () => {
    expect(DASHBOARD_TIME_RANGE_LABELS).toEqual({ '7d': 'Last 7 Days', '30d': 'Last 30 Days', '90d': 'Last 90 Days', '12m': 'Last 12 Months' });
    expect(DASHBOARD_PLAN_BADGE_CLASSES).toHaveProperty('Pro');
    expect(DASHBOARD_PLAN_BADGE_FALLBACK_CLASS).toContain('bg-input');
    expect(SUPERADMIN_DASHBOARD_DEFAULT_TIME_MULTIPLIER).toBe(1);
  });
});
