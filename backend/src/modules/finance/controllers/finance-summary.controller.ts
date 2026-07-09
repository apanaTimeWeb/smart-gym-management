import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FinanceSummaryService } from '@/modules/finance/services/finance-summary.service';

@ApiTags('Finance - Summary')
@Controller('finance/summary')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FinanceSummaryController {
  constructor(private readonly financeSummaryService: FinanceSummaryService) {}

  @Get()
  @ApiOperation({ summary: 'Get aggregated dashboard summary for finances' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Finance summary fetched successfully' })
  getSummary() {
    return this.financeSummaryService.getSummary();
  }
}
