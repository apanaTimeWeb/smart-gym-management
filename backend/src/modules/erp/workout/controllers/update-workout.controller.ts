import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateWorkoutService } from '../services/update-workout.service';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateWorkoutController {
  constructor(private readonly workoutService: UpdateWorkoutService) {}
  
  @Patch()
  async execute() {
    return this.workoutService.execute();
  }
}
