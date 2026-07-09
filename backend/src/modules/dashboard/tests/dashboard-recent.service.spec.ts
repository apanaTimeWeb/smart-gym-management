import { Test, TestingModule } from '@nestjs/testing';
import { DashboardRecentService } from '@/modules/dashboard/services/dashboard-recent.service';
import { DashboardRepository } from '@/modules/dashboard/dashboard.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('DashboardRecentService', () => {
  let service: DashboardRecentService;
  let repository: DashboardRepository;
  let cacheManager: any;

  const mockRecentData = {
    recentMembers: [{ id: 'uuid-1', name: 'Rahul' }],
    recentPayments: [{ id: 'pay-1', amount: 2500 }],
    pendingPaymentsList: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardRecentService,
        {
          provide: DashboardRepository,
          useValue: {
            getRecentMembers: jest.fn().mockResolvedValue(mockRecentData.recentMembers),
            getRecentPayments: jest.fn().mockResolvedValue(mockRecentData.recentPayments),
            getPendingPaymentsList: jest.fn().mockResolvedValue([]),
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

    service = module.get<DashboardRecentService>(DashboardRecentService);
    repository = module.get<DashboardRepository>(DashboardRepository);
    cacheManager = module.get(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch recent data from repository on cache miss', async () => {
    const result = await service.execute();
    expect(repository.getRecentMembers).toHaveBeenCalled();
    expect(repository.getRecentPayments).toHaveBeenCalled();
    expect(result.data.recentMembers).toHaveLength(1);
  });

  it('should return cached data on cache hit', async () => {
    jest.spyOn(cacheManager, 'get').mockResolvedValue(mockRecentData);
    const result = await service.execute();
    expect(repository.getRecentMembers).not.toHaveBeenCalled();
    expect(result.data).toEqual(mockRecentData);
  });
});
