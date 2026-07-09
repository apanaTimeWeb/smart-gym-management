import { Injectable, Logger } from '@nestjs/common';
import { WorkoutRepository } from '../workout.repository';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';
import { WorkoutNotFoundException } from '../workout.exceptions';

@Injectable()
export class UpdateWorkoutService {
  private readonly logger = new Logger(UpdateWorkoutService.name);

  constructor(private readonly repository: WorkoutRepository) {}

  async execute(id: number, dto: UpdateWorkoutDto) {
    this.logger.log(`Updating workout ID: ${id}`);
    const existing = await this.repository.workoutRepository.findOne({ where: { id } });
    if (!existing) throw new WorkoutNotFoundException();

    await this.repository.workoutRepository.update(id, dto);
    const data = await this.repository.workoutRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async remove(id: number) {
    this.logger.log(`Soft removing workout ID: ${id}`);
    const existing = await this.repository.workoutRepository.findOne({ where: { id } });
    if (!existing) throw new WorkoutNotFoundException();

    await this.repository.workoutRepository.update(id, { isActive: false });
    const data = await this.repository.workoutRepository.findOne({ where: { id } });
    return { success: true, data };
  }
}
