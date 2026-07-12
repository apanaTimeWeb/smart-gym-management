import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { FindWorkoutDto } from '../dto/find-workout.dto';

@Injectable()
export class FindWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(query: FindWorkoutDto) {
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const [workouts, total] = await this.repository.repo.findAndCount({
      take: limit,
      skip,
      order: { createdAt: 'DESC' },
    });

    return { 
      success: true, 
      data: {
        workouts,
        total,
        page,
        limit,
      } 
    };
  }
}
