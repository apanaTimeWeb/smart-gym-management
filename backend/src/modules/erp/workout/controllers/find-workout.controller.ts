import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindWorkoutService } from '../services/find-workout.service';
import { FindWorkoutDto } from '../dto/find-workout.dto';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindWorkoutController {
  constructor(private readonly workoutService: FindWorkoutService) {}
  
  @Get('workouts')
  async execute(@Query() query: FindWorkoutDto) {
    return this.workoutService.execute(query);
  }
}
