import { Controller, Post, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreatePlanService } from '@/modules/plans/services/create-plan.service';
import { CreatePlanDto } from '@/modules/plans/dto/create-plan.dto';

@ApiTags('Plans - Create')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreatePlanController {
  constructor(private readonly createPlanService: CreatePlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription plan' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Plan created successfully' })
  create(@Body() dto: CreatePlanDto) {
    return this.createPlanService.create(dto);
  }
}
