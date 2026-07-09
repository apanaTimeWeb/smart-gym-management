import { Test, TestingModule } from '@nestjs/testing';
import { FindPlanService } from '@/modules/plans/services/find-plan.service';
import { PlansRepository } from '@/modules/plans/plans.repository';
import { PlanNotFoundException } from '@/modules/plans/plans.exceptions';

describe('FindPlanService', () => {
  let service: FindPlanService;
  let repository: PlansRepository;

  const mockPlan = { id: 1, name: 'Basic', tier: 'BASIC', isActive: true };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindPlanService,
        {
          provide: PlansRepository,
          useValue: {
            findAllPlans: jest.fn(),
            findPlanById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FindPlanService>(FindPlanService);
    repository = module.get<PlansRepository>(PlansRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all plans', async () => {
    jest.spyOn(repository, 'findAllPlans').mockResolvedValue([mockPlan] as any);
    const result = await service.findAll();
    expect(repository.findAllPlans).toHaveBeenCalled();
    expect(result.data).toHaveLength(1);
  });

  it('should return a single plan by ID', async () => {
    jest.spyOn(repository, 'findPlanById').mockResolvedValue(mockPlan as any);
    const result = await service.findOne(1);
    expect(result.data).toEqual(mockPlan);
  });

  it('should throw PlanNotFoundException when plan does not exist', async () => {
    jest.spyOn(repository, 'findPlanById').mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(PlanNotFoundException);
  });
});
