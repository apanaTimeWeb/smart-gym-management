import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';

@Injectable()
export class UpdateWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
