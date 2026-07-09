import { Controller, Get, Param, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindPlanService } from '@/modules/plans/services/find-plan.service';

@ApiTags('Plans - Find')
@Controller('plans')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindPlanController {
  constructor(private readonly findPlanService: FindPlanService) {}

  @Get()
  @ApiOperation({ summary: 'Find all active plans' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Plans fetched successfully' })
  findAll() {
    return this.findPlanService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a plan by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Plan fetched successfully' })
  findOne(@Param('id') id: string) {
    return this.findPlanService.findOne(id);
  }
}
