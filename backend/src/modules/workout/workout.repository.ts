import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@/modules/workout/entities/workout.entity';
import { DietPlan } from '@/modules/workout/entities/diet-plan.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { WORKOUT_CONSTANTS } from './workout.constants';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectRepository(Workout)
    public readonly workoutRepository: Repository<Workout>,
    @InjectRepository(DietPlan)
    public readonly dietPlanRepository: Repository<DietPlan>,
  ) {}

  async findAllWorkouts(query: PaginationQueryDto) {
    return this.workoutRepository.findAndCount({
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
