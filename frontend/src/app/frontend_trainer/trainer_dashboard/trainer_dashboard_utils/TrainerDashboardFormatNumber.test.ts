import { describe, expect, it } from 'vitest';

import { TrainerDashboardFormatNumber } from '@/app/frontend_trainer/trainer_dashboard/trainer_dashboard_utils/TrainerDashboardFormatNumber';




describe('Trainer dashboard display formatters', () => {
  it('formats dashboard counts without decimal places', () => {
    expect(TrainerDashboardFormatNumber(1234567, 'en-IN')).toBe('12,34,567');
    expect(TrainerDashboardFormatNumber(0, 'en-IN')).toBe('0');
  });
});
