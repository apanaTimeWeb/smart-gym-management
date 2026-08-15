import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { WORKOUT_MESSAGES } from '../workout.constants';
import { WorkoutResponse } from '../workout.interfaces';

@Injectable()
export class CreateWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(dto: CreateWorkoutDto): Promise<WorkoutResponse> {
    const workout = this.repository.repo.create(dto);
    await this.repository.repo.save(workout);
    return { success: true, message: WORKOUT_MESSAGES.CREATED, data: workout as any };
  }
}
