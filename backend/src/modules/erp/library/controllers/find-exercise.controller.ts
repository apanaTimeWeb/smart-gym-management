import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { FindExerciseService } from '@/modules/erp/library/services/find-exercise.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Exercise')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('library/exercises')
export class FindExerciseController {
  constructor(private readonly findExerciseService: FindExerciseService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Exercises' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all Exercises' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findExerciseService.execute(query);
  }
}
