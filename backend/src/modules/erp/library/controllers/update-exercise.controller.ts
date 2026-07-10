import {
  Controller,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateExerciseService } from '@/modules/erp/library/services/update-exercise.service';
import { UpdateExerciseDto } from '@/modules/erp/library/dto/update-exercise.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Exercise')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('library/exercises')
export class UpdateExerciseController {
  constructor(private readonly updateExerciseService: UpdateExerciseService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a Exercise' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exercise updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdateExerciseDto) {
    return this.updateExerciseService.execute(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a Exercise' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Exercise removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.updateExerciseService.remove(+id);
  }
}
