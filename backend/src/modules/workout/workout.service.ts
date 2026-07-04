import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class WorkoutService {
  constructor(private prisma: PrismaService) {}

  findAllWorkouts(query: any) {
    return this.prisma.workout.findMany({ where: { isActive: true } });
  }
  createWorkout(dto: any) {
    return this.prisma.workout.create({ data: dto });
  }
  updateWorkout(id: number, dto: any) {
    return this.prisma.workout.update({ where: { id }, data: dto });
  }
  removeWorkout(id: number) {
    return this.prisma.workout.update({
      where: { id },
      data: { isActive: false },
    });
  }

  findAllDietPlans(query: any) {
    return this.prisma.dietPlan.findMany({ where: { isActive: true } });
  }
  createDietPlan(dto: any) {
    return this.prisma.dietPlan.create({ data: dto });
  }
  updateDietPlan(id: number, dto: any) {
    return this.prisma.dietPlan.update({ where: { id }, data: dto });
  }
  removeDietPlan(id: number) {
    return this.prisma.dietPlan.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
