import { Test, TestingModule } from '@nestjs/testing';
import { CreateWorkoutService } from '../services/create-workout.service';
import { WorkoutRepository } from '../workout.repository';

describe('CreateWorkoutService', () => {
  let service: CreateWorkoutService;
  let repository: WorkoutRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateWorkoutService,
        {
          provide: WorkoutRepository,
          useValue: {
            workoutRepository: {
              create: jest.fn(),
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CreateWorkoutService>(CreateWorkoutService);
    repository = module.get<WorkoutRepository>(WorkoutRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
