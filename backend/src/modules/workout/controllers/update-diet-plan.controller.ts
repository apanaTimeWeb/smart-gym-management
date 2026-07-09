import { Controller, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UpdateDietPlanService } from '../services/update-diet-plan.service';
import { UpdateDietPlanDto } from '../dto/update-diet-plan.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/diet-plans')
export class UpdateDietPlanController {
  constructor(private readonly updateDietPlanService: UpdateDietPlanService) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a diet plan' })
  @ApiResponse({ status: 200, description: 'Diet plan updated successfully' })
  update(@Param('id') id: string, @Body() dto: UpdateDietPlanDto) {
    return this.updateDietPlanService.execute(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a diet plan' })
  @ApiResponse({ status: 200, description: 'Diet plan removed successfully' })
  remove(@Param('id') id: string) {
    return this.updateDietPlanService.remove(+id);
  }
}
