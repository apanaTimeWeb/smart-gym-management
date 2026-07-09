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
import { UpdateWorkoutService } from '@/modules/workout/services/update-workout.service';
import { UpdateWorkoutDto } from '@/modules/workout/dto/update-workout.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/exercises')
export class UpdateWorkoutController {
  constructor(private readonly updateWorkoutService: UpdateWorkoutService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a workout' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Workout updated successfully',
  })
  update(@Param('id') id: string, @Body() dto: UpdateWorkoutDto) {
    return this.updateWorkoutService.execute(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a workout' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Workout removed successfully',
  })
  remove(@Param('id') id: string) {
    return this.updateWorkoutService.remove(+id);
  }
}
