import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { CreateWorkoutDto } from '../dto/create-workout.dto';

@Injectable()
export class CreateWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(dto: CreateWorkoutDto) {
    const workout = this.repository.repo.create(dto);
    await this.repository.repo.save(workout);
    return { success: true, data: workout };
  }
}
