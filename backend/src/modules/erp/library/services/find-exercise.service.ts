import { Injectable, Logger } from '@nestjs/common';
import { LibraryRepository } from '@/modules/erp/library/library.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';

@Injectable()
export class FindExerciseService {
  private readonly logger = new Logger(FindExerciseService.name);

  constructor(private readonly repository: LibraryRepository) {}

  async execute(query: PaginationQueryDto) {
    this.logger.log(`Fetching Exercises`);
    const [Exercises, total] = await this.repository.findAllExercises(query);
    return { success: true, data: { Exercises, total } };
  }
}
