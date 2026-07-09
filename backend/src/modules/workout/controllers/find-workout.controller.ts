import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { FindWorkoutService } from '../services/find-workout.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/exercises')
export class FindWorkoutController {
  constructor(private readonly findWorkoutService: FindWorkoutService) {}

  @Get()
  @ApiOperation({ summary: 'Get all workouts' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all workouts' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findWorkoutService.execute(query);
  }
}
