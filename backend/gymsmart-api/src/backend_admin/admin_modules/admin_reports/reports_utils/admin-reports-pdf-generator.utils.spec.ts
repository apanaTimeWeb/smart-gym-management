// RESPONSIBILITY: Owns the single implementation responsibility represented by admin-reports-pdf-generator.utils.spec.
// FLOW: Owning boundary -> implementation -> approved dependencies -> caller.
import { AdminReportsPdfGeneratorUtils } from '@/backend_admin/admin_modules/admin_reports/reports_utils/admin-reports-pdf-generator.utils.js';

describe('AdminReportsPdfGeneratorUtils', () => {
  it('generates a PDF artifact with the required signature and report title', () => {
    const artifact = AdminReportsPdfGeneratorUtils.generate('Revenue Report', [['Month', 'Revenue'], ['2026-09', '9999']]);
    expect(artifact.subarray(0, 8).toString('utf8')).toBe('%PDF-1.4');
    expect(artifact.toString('utf8')).toContain('Revenue Report');
    expect(artifact.toString('utf8')).toContain('startxref');
  });
});
