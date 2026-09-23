// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { ReportsExportReportsReportService } from '@/backend_manager/modules/backend_manager/reports/services/reports-export-reports-report.service';

describe('ReportsExportReportsReportService', () => {
  it('serializes real report rows into CSV bytes with a header', async () => {
    const dependency = { findReportsList: jest.fn().mockResolvedValue({ data: [{ id: 'r1', payload: { revenue: 100 } }], meta: {} }) };
    const service = new ReportsExportReportsReportService(dependency as never);
    const result = await service.exportReportsReport({});
    expect(Buffer.isBuffer(result)).toBe(true);
    expect(result.toString('utf8')).toContain('id,revenue');
    expect(result.toString('utf8')).toContain('r1,100');
  });
  it('propagates report-source failures', async () => {
    const failure = new Error('report source failed');
    const dependency = { findReportsList: jest.fn().mockRejectedValue(failure) };
    const service = new ReportsExportReportsReportService(dependency as never);
    await expect(service.exportReportsReport({})).rejects.toBe(failure);
  });
});
