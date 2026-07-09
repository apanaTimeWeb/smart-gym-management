import { Controller, Get, Query, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { FindDietPlanService } from '@/modules/library/services/find-diet-plan.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Exercise')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('library/diet-plans')
export class FindDietPlanController {
  constructor(private readonly findDietPlanService: FindDietPlanService) {}

  @Get()
  @ApiOperation({ summary: 'Get all diet plans' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all diet plans' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findDietPlanService.execute(query);
  }
}
