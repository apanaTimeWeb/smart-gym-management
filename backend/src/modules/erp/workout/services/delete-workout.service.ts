import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { WORKOUT_MESSAGES } from '../workout.constants';
import { WorkoutResponse } from '../workout.interfaces';

@Injectable()
export class DeleteWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(id: number): Promise<WorkoutResponse> {
    const workout = await this.repository.repo.findOne({ where: { id } });
    if (!workout) throw new NotFoundException('Workout not found');
    
    await this.repository.repo.softRemove(workout);
    
    return { success: true, message: WORKOUT_MESSAGES.DELETED, data: workout as any };
  }
}
