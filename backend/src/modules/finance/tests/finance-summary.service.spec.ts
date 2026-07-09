import { Test, TestingModule } from '@nestjs/testing';
import { FinanceSummaryService } from '@/modules/finance/services/finance-summary.service';
import { FinanceRepository } from '@/modules/finance/finance.repository';

describe('FinanceSummaryService', () => {
  let service: FinanceSummaryService;
  let repository: FinanceRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FinanceSummaryService,
        {
          provide: FinanceRepository,
          useValue: {
            getTotalRevenue: jest.fn().mockResolvedValue(50000),
            getTotalPaymentsCount: jest.fn().mockResolvedValue(25),
            getTotalPendingAmount: jest.fn().mockResolvedValue(5000),
            getRevenueByMethod: jest.fn().mockResolvedValue([{ method: 'UPI', total: 30000 }]),
            getMonthlyRevenue: jest.fn().mockResolvedValue(10000),
            getRecentPaymentsForChart: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<FinanceSummaryService>(FinanceSummaryService);
    repository = module.get<FinanceRepository>(FinanceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return financial summary with totals', async () => {
    const result = await service.getSummary();
    expect(result.data).toBeDefined();
    expect((result.data as any).totalRevenue).toBe(50000);
    expect((result.data as any).totalPayments).toBe(25);
    expect((result.data as any).pendingAmount).toBe(5000);
  });

  it('should aggregate revenue by payment method', async () => {
    const result = await service.getSummary();
    expect((result.data as any).revenueByMethod.UPI).toBe(30000);
  });
});
