import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';

@Injectable()
export class FindWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
