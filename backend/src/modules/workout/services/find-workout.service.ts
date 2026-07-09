import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

@Injectable()
export class FindWorkoutService {
  private readonly logger = new Logger(FindWorkoutService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(query: PaginationQueryDto) {
    this.logger.log(`Fetching workouts`);
    const [workouts, total] = await this.repository.findAllWorkouts(query);
    return { success: true, data: { workouts, total } };
  }
}
