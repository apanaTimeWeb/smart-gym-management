import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '@/modules/erp/library/entities/exercise.entity';
import { DietPlan } from '@/modules/erp/library/entities/diet-plan.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { WORKOUT_CONSTANTS } from './library.constants';

@Injectable()
export class LibraryRepository {
  constructor(
    @InjectRepository(Exercise)
    public readonly libraryRepository: Repository<Exercise>,
    @InjectRepository(DietPlan)
    public readonly dietPlanRepository: Repository<DietPlan>,
  ) {}

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
