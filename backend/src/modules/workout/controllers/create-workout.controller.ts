import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateWorkoutService } from '../services/create-workout.service';
import { CreateWorkoutDto } from '../dto/create-workout.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/exercises')
export class CreateWorkoutController {
  constructor(private readonly createWorkoutService: CreateWorkoutService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workout' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Workout created successfully',
  })
  execute(@Body() dto: CreateWorkoutDto) {
    return this.createWorkoutService.execute(dto);
  }
}
