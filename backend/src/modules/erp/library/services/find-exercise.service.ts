import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { WORKOUT_CONSTANTS } from '../library.constants';
import { ExerciseListResponse } from '../library.interfaces';

@Injectable()
export class FindExerciseService {
  private readonly logger = new Logger(FindExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(query: PaginationQueryDto): Promise<ExerciseListResponse> {
    this.logger.log(`Fetching Exercises`);
    const [Exercises, total] = await this.repository.findAllExercises(query);
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.EXERCISE_FETCHED, data: { exercises: Exercises as any, total } };
  }
}
