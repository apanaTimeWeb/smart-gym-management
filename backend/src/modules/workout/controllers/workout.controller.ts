import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { WorkoutService } from '@/modules/workout/services/workout.service';
import { Workout } from '@/modules/workout/entities/workout.entity';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/workouts')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all workouts' })
  findAll() {
    return this.workoutService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create workout' })
  create(@Body() body: Partial<Workout>) {
    return this.workoutService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update workout' })
  update(@Param('id') id: string, @Body() body: Partial<Workout>) {
    return this.workoutService.update(+id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workout' })
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }
}
