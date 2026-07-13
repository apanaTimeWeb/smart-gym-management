import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { UpdateExerciseDto } from '@/modules/erp/library/dto/update-exercise.dto';
import { ExerciseNotFoundException } from '@/modules/erp/library/library.exceptions';
import { WORKOUT_CONSTANTS } from '../library.constants';
import { ExerciseResponse } from '../library.interfaces';

@Injectable()
export class UpdateExerciseService {
  private readonly logger = new Logger(UpdateExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: number, dto: UpdateExerciseDto): Promise<ExerciseResponse> {
    this.logger.log(`Updating Exercise ID: ${id}`);
    const existing = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new ExerciseNotFoundException();

    await this.repository.libraryRepository.update(id, dto);
    const data = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.EXERCISE_UPDATED, data: data as any };
  }

  async remove(id: number): Promise<ExerciseResponse> {
    this.logger.log(`Soft removing Exercise ID: ${id}`);
    const existing = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new ExerciseNotFoundException();

    await this.repository.libraryRepository.update(id, { isActive: false });
    const data = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    return { success: true, message: WORKOUT_CONSTANTS.MESSAGES.EXERCISE_DELETED, data: data as any };
  }
}
