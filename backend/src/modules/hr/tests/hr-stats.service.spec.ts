import { Test, TestingModule } from '@nestjs/testing';
import { HrStatsService } from '@/modules/hr/services/hr-stats.service';
import { HrRepository } from '@/modules/hr/hr.repository';

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
            countTotalStaff: jest.fn(),
            countActiveStaff: jest.fn(),
            findAllPayrollsForAggregation: jest.fn(),
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
    jest.spyOn(repository, 'countTotalStaff').mockResolvedValue(5);
    jest.spyOn(repository, 'countActiveStaff').mockResolvedValue(4);
    jest.spyOn(repository, 'findAllPayrollsForAggregation').mockResolvedValue([]);

    const result = await service.getSummary();
    expect(repository.countTotalStaff).toHaveBeenCalled();
    expect(result.data).toBeDefined();
  });
});
