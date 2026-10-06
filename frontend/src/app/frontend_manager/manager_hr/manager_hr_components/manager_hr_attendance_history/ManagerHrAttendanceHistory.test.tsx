// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { describe, expect, it } from 'vitest';
import { MANAGER_HR_STATUS_PRESENT } from '@/app/frontend_manager/manager_hr/manager_hr_constants/ManagerHrConstants';

describe('ManagerHrAttendanceHistory contract', () => {
  it('uses a stable attendance row key shape', () => {
    const record = { date: '2024-05-31T10:00:00Z', status: MANAGER_HR_STATUS_PRESENT };
    expect(`${record.date}-${record.status}`).toBe('2024-05-31T10:00:00Z-PRESENT');
  });
});
