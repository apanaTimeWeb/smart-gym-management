import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { InquiryStatsService } from '../services/inquiry-stats.service';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Inquiries')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('inquiries/meta/stats') // Prevent collision with :id
export class InquiryStatsController {
  constructor(private readonly inquiryStatsService: InquiryStatsService) {}

  @Get()
  @ApiOperation({ summary: 'Get inquiry stats' })
  @ApiResponse({ status: 200, description: 'Return inquiry stats' })
  execute() {
    return this.inquiryStatsService.execute();
  }
}
