import { Test, TestingModule } from '@nestjs/testing';
import { DashboardChartsService } from '@/modules/dashboard/services/dashboard-charts.service';
import { DashboardRepository } from '@/modules/dashboard/dashboard.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('DashboardChartsService', () => {
  let service: DashboardChartsService;
  let repository: DashboardRepository;
  let cacheManager: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardChartsService,
        {
          provide: DashboardRepository,
          useValue: {
            getRecentMembersForChart: jest.fn(),
            getRecentPaymentsForChart: jest.fn(),
            getMembersWithPlans: jest.fn(),
            getMemberCounts: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(null),
            set: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardChartsService>(DashboardChartsService);
    repository = module.get<DashboardRepository>(DashboardRepository);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch chart data from repository when cache is empty', async () => {
    jest.spyOn(repository, 'getRecentMembersForChart').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getRecentPaymentsForChart').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getMembersWithPlans').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getMemberCounts').mockResolvedValue({ active: 0, pending: 0, expired: 0 } as any);

    const result = await service.execute();
    expect(repository.getRecentMembersForChart).toHaveBeenCalled();
    expect(repository.getRecentPaymentsForChart).toHaveBeenCalled();
    expect(result.data).toBeDefined();
  });

  it('should return cached data when cache is populated', async () => {
    const mockCached = { memberGrowth: [], revenueChart: [], membersByPlan: [], membersByStatus: {} };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(mockCached);

    const result = await service.execute();
    expect(repository.getRecentMembersForChart).not.toHaveBeenCalled();
    expect(result.data).toEqual(mockCached);
  });
});
