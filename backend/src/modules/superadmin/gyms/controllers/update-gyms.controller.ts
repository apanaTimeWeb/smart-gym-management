import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateGymsService } from '../services/update-gyms.service';
import { UpdateTenantDto } from '../dto/update-gyms.dto';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateGymsController {
  constructor(private readonly service: UpdateGymsService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update Tenant' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.service.execute(id, dto);
  }
}
