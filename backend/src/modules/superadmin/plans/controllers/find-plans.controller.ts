import { Controller, Get, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindPlansService } from '../services/find-plans.service';


@ApiTags('Plans')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindPlansController {
  constructor(private readonly service: FindPlansService) {}
  
  @Get()
  async executeAll() {
    return this.service.execute();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Find SubscriptionPlan' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
