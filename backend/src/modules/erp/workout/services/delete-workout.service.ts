import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';

@Injectable()
export class DeleteWorkoutService {
  constructor(private readonly repository: WorkoutRepository) {}
  
  async execute(id: number) {
    const workout = await this.repository.repo.findOne({ where: { id } });
    if (!workout) throw new NotFoundException('Workout not found');
    
    await this.repository.repo.softRemove(workout);
    
    return { success: true, message: 'Workout deleted successfully' };
  }
}
