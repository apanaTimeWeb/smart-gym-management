import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '../library.repository';

@Injectable()
export class DeleteExerciseService {
  private readonly logger = new Logger(DeleteExerciseService.name);
  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: string) {
    this.logger.log(`Soft-deleting exercise ${id}`);
    await this.repository.libraryRepository.softDelete(id);
    return { success: true, message: 'Exercise deleted successfully' };
  }
}
