import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePlanService } from '@/modules/plans/services/update-plan.service';
import { PlansRepository } from '@/modules/plans/services/plans.repository';
import { PlanNotFoundException } from '@/modules/plans/plans.exceptions';

describe('UpdatePlanService', () => {
  let service: UpdatePlanService;
  let repository: PlansRepository;

  const mockPlan = { id: 1, name: 'Basic', tier: 'BASIC', isActive: true };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePlanService,
        {
          provide: PlansRepository,
          useValue: {
            findPlanById: jest.fn(),
            updatePlan: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdatePlanService>(UpdatePlanService);
    repository = module.get<PlansRepository>(PlansRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw PlanNotFoundException when plan does not exist', async () => {
    jest.spyOn(repository, 'findPlanById').mockResolvedValue(null);
    await expect(service.update(999, { name: 'New Name' } as any)).rejects.toThrow(PlanNotFoundException);
  });

  it('should update the plan successfully', async () => {
    const updated = { ...mockPlan, name: 'Gold' };
    jest.spyOn(repository, 'findPlanById').mockResolvedValue(mockPlan as any);
    jest.spyOn(repository, 'updatePlan').mockResolvedValue(updated as any);

    const result = await service.update(1, { name: 'Gold' } as any);
    expect(repository.updatePlan).toHaveBeenCalledWith(1, { name: 'Gold' });
    expect(result.data).toEqual(updated);
  });
});
