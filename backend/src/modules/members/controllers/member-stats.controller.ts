import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { MemberStatsService } from '@/modules/members/services/member-stats.service';

@ApiTags('Members')
@Controller('members')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class MemberStatsController {
  constructor(private readonly memberStatsService: MemberStatsService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get overall member statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Member stats fetched successfully',
  })
  getStats() {
    return this.memberStatsService.getStats();
  }
}
