import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteExerciseService } from '../services/delete-exercise.service';

@ApiTags('Library')
@Controller('library/exercises')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteExerciseController {
  constructor(private readonly service: DeleteExerciseService) {}
  @Delete(':id')
  async execute(@Param('id') id: string) { return this.service.execute(id); }
}
