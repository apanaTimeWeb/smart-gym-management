import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { RenewMemberService } from '@/modules/members/services/renew-member.service';
import { RenewMemberDto } from '@/modules/members/dto/renew-member.dto';

@ApiTags('Members')
@Controller('members')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class RenewMemberController {
  constructor(private readonly renewMemberService: RenewMemberService) {}

  @Post(':id/renew')
  @ApiOperation({ summary: 'Renew membership by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Membership renewed successfully' })
  renewMembership(@Param('id') id: string, @Body() dto: RenewMemberDto) {
    return this.renewMemberService.renew(id, dto);
  }
}
