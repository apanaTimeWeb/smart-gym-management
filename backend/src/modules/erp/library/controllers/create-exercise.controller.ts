import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateExerciseService } from '@/modules/erp/library/services/create-exercise.service';
import { CreateExerciseDto } from '@/modules/erp/library/dto/create-exercise.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Exercise')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('library/exercises')
export class CreateExerciseController {
  constructor(private readonly createExerciseService: CreateExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Exercise' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Exercise created successfully',
  })
  execute(@Body() dto: CreateExerciseDto) {
    return this.createExerciseService.execute(dto);
  }
}
