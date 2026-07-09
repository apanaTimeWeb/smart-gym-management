import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '@/modules/workout/workout.repository';
import { CreateWorkoutDto } from '@/modules/workout/dto/create-workout.dto';

@Injectable()
export class CreateWorkoutService {
  private readonly logger = new Logger(CreateWorkoutService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(dto: CreateWorkoutDto) {
    this.logger.log(`Creating workout: ${dto.name}`);
    const workout = this.repository.workoutRepository.create(dto);
    const data = await this.repository.workoutRepository.save(workout);
    return { success: true, data };
  }
}
