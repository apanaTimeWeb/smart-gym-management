import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlanService } from '@/modules/plans/services/create-plan.service';
import { PlansRepository } from '@/modules/plans/services/plans.repository';
import { DuplicatePlanTierException } from '@/modules/plans/plans.exceptions';
import { PlanTier } from '@/common/enums/database.enums';

describe('CreatePlanService', () => {
  let service: CreatePlanService;
  let repository: PlansRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePlanService,
        {
          provide: PlansRepository,
          useValue: {
            findPlanByTier: jest.fn(),
            createPlan: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreatePlanService>(CreatePlanService);
    repository = module.get<PlansRepository>(PlansRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw DuplicatePlanTierException if tier exists', async () => {
    jest.spyOn(repository, 'findPlanByTier').mockResolvedValue({} as any);
    
    await expect(service.create({
      name: 'Test Plan',
      tier: PlanTier.BASIC,
      price1Month: 10,
      price3Month: 25,
      price6Month: 40,
      price12Month: 70,
      features: [],
    })).rejects.toThrow(DuplicatePlanTierException);
  });
});
