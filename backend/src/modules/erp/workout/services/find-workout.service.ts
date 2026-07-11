import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';

@Injectable()
export class FindWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute() {
    const workouts = await this.repository.repo.find();
    return { success: true, data: workouts };
  }
}
