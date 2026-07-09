import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { StoreSummaryService } from '../services/store-summary.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/summary')
export class StoreSummaryController {
  constructor(private readonly storeSummaryService: StoreSummaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get store summary stats' })
  @ApiResponse({ status: 200, description: 'Store stats retrieved successfully' })
  execute() {
    return this.storeSummaryService.execute();
  }
}
