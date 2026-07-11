import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateWorkoutService } from '../services/create-workout.service';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateWorkoutController {
  constructor(private readonly workoutService: CreateWorkoutService) {}
  
  @Post()
  async execute() {
    return this.workoutService.execute();
  }
}
