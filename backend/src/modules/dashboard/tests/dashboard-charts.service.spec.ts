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
            getMemberGrowthChart: jest.fn(),
            getRevenueChart: jest.fn(),
            getMembersByPlan: jest.fn(),
            getMembersByStatus: jest.fn(),
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
    jest.spyOn(repository, 'getMemberGrowthChart').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getRevenueChart').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getMembersByPlan').mockResolvedValue([] as any);
    jest.spyOn(repository, 'getMembersByStatus').mockResolvedValue({ active: 0, pending: 0, expired: 0 } as any);

    const result = await service.execute();
    expect(repository.getMemberGrowthChart).toHaveBeenCalled();
    expect(repository.getRevenueChart).toHaveBeenCalled();
    expect(result.data).toBeDefined();
  });

  it('should return cached data when cache is populated', async () => {
    const mockCached = { memberGrowth: [], revenueChart: [], membersByPlan: [], membersByStatus: {} };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(mockCached);

    const result = await service.execute();
    expect(repository.getMemberGrowthChart).not.toHaveBeenCalled();
    expect(result.data).toEqual(mockCached);
  });
});
