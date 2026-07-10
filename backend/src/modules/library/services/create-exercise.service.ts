import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/library/library.repository';
import { CreateExerciseDto } from '@/modules/library/dto/create-exercise.dto';

@Injectable()
export class CreateExerciseService {
  private readonly logger = new Logger(CreateExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(dto: CreateExerciseDto) {
    this.logger.log(`Creating Exercise: ${dto.name}`);
    const Exercise = this.repository.libraryRepository.create(dto);
    const data = await this.repository.libraryRepository.save(Exercise);
    return { success: true, data };
  }
}
