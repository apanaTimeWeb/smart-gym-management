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
    const where: any = { isActive: true };
    if (query.search) {
      where.name = require('typeorm').ILike(`%${query.search}%`);
    }
    return this.libraryRepository.findAndCount({
      where,
      order: { id: WORKOUT_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async findAllDietPlans(query: PaginationQueryDto) {
    const where: any = { isActive: true };
    if (query.search) {
      where.name = require('typeorm').ILike(`%${query.search}%`);
    }
    return this.dietPlanRepository.findAndCount({
      where,
      order: { id: WORKOUT_CONSTANTS.SORT.ASC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async createExercise(data: Partial<Exercise>) {
    const entity = this.libraryRepository.create(data);
    return this.libraryRepository.save(entity);
  }

  async updateExercise(id: number, data: Partial<Exercise>) {
    await this.libraryRepository.update(id, data);
    return this.libraryRepository.findOne({ where: { id } });
  }

  async createDietPlan(data: Partial<DietPlan>) {
    const entity = this.dietPlanRepository.create(data);
    return this.dietPlanRepository.save(entity);
  }

  async updateDietPlan(id: number, data: Partial<DietPlan>) {
    await this.dietPlanRepository.update(id, data);
    return this.dietPlanRepository.findOne({ where: { id } });
  }
}
