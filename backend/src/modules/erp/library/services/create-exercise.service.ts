import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { CreateExerciseDto } from '@/modules/erp/library/dto/create-exercise.dto';
import { WORKOUT_CONSTANTS } from '../library.constants';
import { ExerciseResponse } from '../library.interfaces';

@Injectable()
export class CreateExerciseService {
  private readonly logger = new Logger(CreateExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(dto: CreateExerciseDto): Promise<ExerciseResponse> {
    this.logger.log(`Creating Exercise: ${dto.name}`);
    const Exercise = this.repository.libraryRepository.create(dto);
    const data = await this.repository.libraryRepository.save(Exercise);
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.EXERCISE_CREATED, data: data as any };
  }
}
