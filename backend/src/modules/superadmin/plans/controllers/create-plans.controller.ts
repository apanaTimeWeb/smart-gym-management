import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreatePlansService } from '../services/create-plans.service';
import { CreateSubscriptionPlanDto } from '../dto/create-plans.dto';

@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreatePlansController {
  constructor(private readonly service: CreatePlansService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create SubscriptionPlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateSubscriptionPlanDto) {
    return this.service.execute(dto);
  }
}
