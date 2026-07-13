import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '../library.repository';
import { WORKOUT_CONSTANTS } from '../library.constants';

@Injectable()
export class DeleteExerciseService {
  private readonly logger = new Logger(DeleteExerciseService.name);
  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: string) {
    this.logger.log(`Soft-deleting exercise ${id}`);
    await this.repository.libraryRepository.softDelete(id);
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.EXERCISE_DELETED };
  }
}
