import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { CreateWorkoutDto } from '../dto/create-workout.dto';

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
