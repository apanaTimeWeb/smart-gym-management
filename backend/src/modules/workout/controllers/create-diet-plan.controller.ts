import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateDietPlanService } from '../services/create-diet-plan.service';
import { CreateDietPlanDto } from '../dto/create-diet-plan.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Workout')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('workout/diet-plans')
export class CreateDietPlanController {
  constructor(private readonly createDietPlanService: CreateDietPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new diet plan' })
  @ApiResponse({ status: 201, description: 'Diet plan created successfully' })
  execute(@Body() dto: CreateDietPlanDto) {
    return this.createDietPlanService.execute(dto);
  }
}
