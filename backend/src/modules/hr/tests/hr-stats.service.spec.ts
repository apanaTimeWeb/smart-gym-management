import { Test, TestingModule } from '@nestjs/testing';
import { HrStatsService } from '@/modules/hr/services/hr-stats.service';
import { HrRepository } from '@/modules/hr/services/hr.repository';

describe('HrStatsService', () => {
  let service: HrStatsService;
  let repository: HrRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HrStatsService,
        {
          provide: HrRepository,
          useValue: {
            getHrStats: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HrStatsService>(HrStatsService);
    repository = module.get<HrRepository>(HrRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return HR stats from repository', async () => {
    const mockStats = { totalStaff: 5, activeStaff: 4, pendingPayroll: 1 };
    jest.spyOn(repository, 'getHrStats').mockResolvedValue(mockStats as any);

    const result = await service.getSummary();
    expect(repository.getHrStats).toHaveBeenCalled();
    expect(result.data).toEqual(mockStats);
  });
});
