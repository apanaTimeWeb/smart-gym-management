import { Controller, Post, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { EmailGymsService } from '../services/email-gyms.service';
import { EmailTenantDto } from '../dto/email-gyms.dto';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class EmailGymsController {
  constructor(private readonly service: EmailGymsService) {}
  
  @Post(':id/email')
  @ApiOperation({ summary: 'Email Tenant Owner' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: EmailTenantDto) {
    return this.service.execute(id, dto);
  }
}
