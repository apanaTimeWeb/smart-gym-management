import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';
import { WORKOUT_MESSAGES } from '../workout.constants';
import { WorkoutResponse } from '../workout.interfaces';

@Injectable()
export class UpdateWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(id: number, dto: UpdateWorkoutDto): Promise<WorkoutResponse> {
    const workout = await this.repository.repo.findOne({ where: { id } });
    if (!workout) throw new NotFoundException('Workout not found');
    
    Object.assign(workout, dto);
    await this.repository.repo.save(workout);
    
    return { success: true, message: WORKOUT_MESSAGES.UPDATED, data: workout as any };
  }
}
