// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-reports-xlsx-generator.utils.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminReportsXlsxGeneratorUtils } from '@/backend_admin/admin_modules/admin_reports/reports_utils/admin-reports-xlsx-generator.utils.js';

describe('AdminReportsXlsxGeneratorUtils', () => {
  it('generates a ZIP-backed XLSX package', () => {
    const artifact = AdminReportsXlsxGeneratorUtils.generate('Revenue Report', [['Month', 'Revenue'], ['2026-09', '9999']]);
    expect(artifact.subarray(0, 4).toString('hex')).toBe('504b0304');
    expect(artifact.length).toBeGreaterThan(100);
  });
});
