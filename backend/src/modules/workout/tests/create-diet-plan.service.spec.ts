import { Test, TestingModule } from '@nestjs/testing';
import { CreateDietPlanService } from '@/modules/workout/services/create-diet-plan.service';
import { WorkoutRepository } from '@/modules/workout/workout.repository';

describe('CreateDietPlanService', () => {
  let service: CreateDietPlanService;
  let repository: WorkoutRepository;

  const mockDietPlan = { id: 1, name: 'Bulk Diet', calories: 3000, goal: 'Muscle Gain', isActive: true };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateDietPlanService,
        {
          provide: WorkoutRepository,
          useValue: {
            dietPlanRepository: {
              create: jest.fn().mockReturnValue(mockDietPlan),
              save: jest.fn().mockResolvedValue(mockDietPlan),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CreateDietPlanService>(CreateDietPlanService);
    repository = module.get<WorkoutRepository>(WorkoutRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a diet plan and return it', async () => {
    const result = await service.execute({ name: 'Bulk Diet', calories: 3000, goal: 'Muscle Gain' } as any);
    expect(repository.dietPlanRepository.save).toHaveBeenCalled();
    expect(result.data).toEqual(mockDietPlan);
  });
});
