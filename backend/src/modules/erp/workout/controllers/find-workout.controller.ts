import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindWorkoutService } from '../services/find-workout.service';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindWorkoutController {
  constructor(private readonly workoutService: FindWorkoutService) {}
  
  @Get()
  async execute() {
    return this.workoutService.execute();
  }
}
