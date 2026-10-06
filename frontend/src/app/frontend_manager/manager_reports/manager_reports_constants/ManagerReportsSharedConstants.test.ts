import { describe, expect, it } from 'vitest';
import { EXPENSE_CATEGORY_STYLES, REPORT_DATE_RANGE_OPTIONS, REPORT_TABS } from '@/app/frontend_manager/manager_reports/manager_reports_constants/ManagerReportsSharedConstants';


describe('ManagerReportsSharedConstants', () => {
  it('keeps report tabs and date-range options stable', () => {
    expect(REPORT_TABS).toEqual(['Revenue', 'Attendance', 'Members', 'Expenses']);
    expect(REPORT_DATE_RANGE_OPTIONS.map((item) => item.value)).toEqual(['7d', '30d', '3m', '6m', '12m']);
    expect(EXPENSE_CATEGORY_STYLES.Rent?.text).toBe('text-danger');
  });
});
