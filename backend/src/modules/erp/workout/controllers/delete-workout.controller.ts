import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteWorkoutService } from '../services/delete-workout.service';

@ApiTags('Workout')
@Controller('workout')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteWorkoutController {
  constructor(private readonly workoutService: DeleteWorkoutService) {}
  
  @Delete(':id')
  async execute(@Param('id') id: string) {
    return this.workoutService.execute(Number(id));
  }
}
