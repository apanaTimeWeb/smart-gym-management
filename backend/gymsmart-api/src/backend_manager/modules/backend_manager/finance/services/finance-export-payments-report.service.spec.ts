// RESPONSIBILITY: Owns the backend application co-located unit-test verification.
// FLOW: Arrange isolated inputs → execute target unit → assert observable behavior and failure paths.
import { FinanceExportPaymentsReportService } from '@/backend_manager/modules/backend_manager/finance/services/finance-export-payments-report.service';

describe('FinanceExportPaymentsReportService', () => {
  const makeRedis = () => ({
    getClient: () => ({
      set: jest.fn().mockResolvedValue('OK'),
      get: jest.fn().mockResolvedValue(null),
    }),
  });
  const context = { get: () => ({ tenantId: 'tenant-1', actorId: 'actor-1' }) };

  it('returns a scoped download URL generated from real repository rows', async () => {
    const dependency = {
      findFinanceList: jest.fn().mockResolvedValue({
        data: [{ id: 'p1', payload: { amount: 123 } }],
        meta: { page: 1, limit: 20, total: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false },
      }),
    };
    const redis = makeRedis();
    const service = new FinanceExportPaymentsReportService(dependency as never, redis as never, context as never);
    const result = await service.exportPaymentsReport({ format: 'csv' } as never);

    expect(result.url).toMatch(/^\/api\/v1\/manager\/finance\/export\/[0-9a-f-]+$/);
    expect(dependency.findFinanceList).toHaveBeenCalledTimes(1);
    expect(redis.getClient().set).toHaveBeenCalledTimes(1);
    expect(redis.getClient().set).toHaveBeenCalledWith(expect.stringContaining('manager:finance:export:tenant-1:actor-1:'), expect.any(String), 'EX', 900);
  });

  it('propagates repository failures instead of returning a false-success artifact', async () => {
    const failure = new Error('export source failed');
    const dependency = { findFinanceList: jest.fn().mockRejectedValue(failure) };
    const service = new FinanceExportPaymentsReportService(dependency as never, makeRedis() as never, context as never);

    await expect(service.exportPaymentsReport({ format: 'csv' } as never)).rejects.toBe(failure);
  });
});
