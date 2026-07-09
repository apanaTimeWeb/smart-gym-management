import { Test, TestingModule } from '@nestjs/testing';
import { DashboardKpiService } from '../services/dashboard-kpi.service';
import { DashboardRepository } from '../dashboard.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('DashboardKpiService', () => {
  let service: DashboardKpiService;
  let repository: DashboardRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardKpiService,
        {
          provide: DashboardRepository,
          useValue: {
            getMemberCounts: jest.fn(),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DashboardKpiService>(DashboardKpiService);
    repository = module.get<DashboardRepository>(DashboardRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
