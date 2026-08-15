import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateDietPlanService } from '@/modules/erp/library/services/create-diet-plan.service';
import { CreateDietPlanDto } from '@/modules/erp/library/dto/create-diet-plan.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Exercise')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('library/diet-plans')
export class CreateDietPlanController {
  constructor(private readonly createDietPlanService: CreateDietPlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new diet plan' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Diet plan created successfully',
  })
  execute(@Body() dto: CreateDietPlanDto) {
    return this.createDietPlanService.execute(dto);
  }
}
