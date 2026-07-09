import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';
import { DietPlan } from './entities/diet-plan.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepository: Repository<Workout>,
    @InjectRepository(DietPlan)
    private readonly dietPlanRepository: Repository<DietPlan>,
  ) {}

  async findAllWorkouts(query: any) {
    const data = await this.workoutRepository.find({
      where: { isActive: true },
      order: { id: 'ASC' },
    });
    return { success: true, data };
  }

  async createWorkout(dto: any) {
    const workout = this.workoutRepository.create(dto);
    const data = await this.workoutRepository.save(workout);
    return { success: true, data };
  }

  async updateWorkout(id: number, dto: any) {
    await this.workoutRepository.update(id, dto);
    const data = await this.workoutRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async removeWorkout(id: number) {
    await this.workoutRepository.update(id, { isActive: false });
    const data = await this.workoutRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async findAllDietPlans(query: any) {
    const data = await this.dietPlanRepository.find({
      where: { isActive: true },
      order: { id: 'ASC' },
    });
    return { success: true, data };
  }

  async createDietPlan(dto: any) {
    const dietPlan = this.dietPlanRepository.create(dto);
    const data = await this.dietPlanRepository.save(dietPlan);
    return { success: true, data };
  }

  async updateDietPlan(id: number, dto: any) {
    await this.dietPlanRepository.update(id, dto);
    const data = await this.dietPlanRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async removeDietPlan(id: number) {
    await this.dietPlanRepository.update(id, { isActive: false });
    const data = await this.dietPlanRepository.findOne({ where: { id } });
    return { success: true, data };
  }
}
