import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '@/modules/erp/workout/entities/workout.entity';
import { CreateWorkoutDto, UpdateWorkoutDto } from '@/modules/erp/workout/dto/create-workout.dto';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepo: Repository<Workout>,
  ) {}

  async findAll() {
    const workouts = await this.workoutRepo.find();
    return { success: true, data: workouts };
  }

  async create(data: CreateWorkoutDto) {
    const workout = this.workoutRepo.create(data);
    await this.workoutRepo.save(workout);
    return { success: true, message: 'Workout plan created!', data: workout };
  }

  async update(id: number, data: UpdateWorkoutDto) {
    await this.workoutRepo.update(id, data);
    return { success: true, message: 'Workout plan updated!' };
  }

  async remove(id: number) {
    await this.workoutRepo.softDelete(id);
    return { success: true, message: 'Workout plan deleted!' };
  }
}
