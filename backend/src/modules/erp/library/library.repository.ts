import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Exercise } from '@/modules/erp/library/entities/exercise.entity';
import { DietPlan } from '@/modules/erp/library/entities/diet-plan.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { WORKOUT_CONSTANTS } from './library.constants';

@Injectable()
export class LibraryRepository {
  public readonly libraryRepository: Repository<Exercise>;
  public readonly dietPlanRepository: Repository<DietPlan>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.libraryRepository = this.dataSource.getRepository(Exercise);
    this.dietPlanRepository = this.dataSource.getRepository(DietPlan);
  }

  async findAllExercises(query: PaginationQueryDto) {
    return this.libraryRepository.findAndCount({
      where: { isActive: true },
      order: { id: WORKOUT_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findAllDietPlans(query: PaginationQueryDto) {
    return this.dietPlanRepository.findAndCount({
      where: { isActive: true },
      order: { id: WORKOUT_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }
}
