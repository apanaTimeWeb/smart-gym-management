import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/library/library.repository';
import { UpdateExerciseDto } from '@/modules/library/dto/update-exercise.dto';
import { ExerciseNotFoundException } from '@/modules/library/library.exceptions';

@Injectable()
export class UpdateExerciseService {
  private readonly logger = new Logger(UpdateExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(id: number, dto: UpdateExerciseDto) {
    this.logger.log(`Updating Exercise ID: ${id}`);
    const existing = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new ExerciseNotFoundException();

    await this.repository.libraryRepository.update(id, dto);
    const data = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    return { success: true, data };
  }

  async remove(id: number) {
    this.logger.log(`Soft removing Exercise ID: ${id}`);
    const existing = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new ExerciseNotFoundException();

    await this.repository.libraryRepository.update(id, { isActive: false });
    const data = await this.repository.libraryRepository.findOne({
      where: { id },
    });
    return { success: true, data };
  }
}
