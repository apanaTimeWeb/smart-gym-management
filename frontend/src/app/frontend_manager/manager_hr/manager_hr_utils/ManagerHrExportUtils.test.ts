import { describe, expect, it } from 'vitest';
import * as moduleUnderTest from '@/app/frontend_manager/manager_hr/manager_hr_utils/ManagerHrExportUtils';

describe('ManagerHrExportUtils behavioral contract', () => {
  it('downloadManagerHrStaffCsv is callable', () => {
    expect(typeof moduleUnderTest.downloadManagerHrStaffCsv).toBe('function');
  });
  it('printManagerHrPayslip is callable', () => {
    expect(typeof moduleUnderTest.printManagerHrPayslip).toBe('function');
  });
});
