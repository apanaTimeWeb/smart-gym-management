import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { StoreSummaryService } from '@/modules/erp/store/services/store-summary.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Store')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('store/summary')
export class StoreSummaryController {
  constructor(private readonly storeSummaryService: StoreSummaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get store summary stats' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Store stats retrieved successfully',
  })
  execute() {
    return this.storeSummaryService.execute();
  }
}
