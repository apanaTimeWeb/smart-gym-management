import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateWorkoutService } from '../services/update-workout.service';
import { UpdateWorkoutDto } from '../dto/update-workout.dto';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateWorkoutController {
  constructor(private readonly workoutService: UpdateWorkoutService) {}
  
  @Patch(':id')
  async execute(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    return this.workoutService.execute(Number(id), dto);
  }
}
