import { Controller, Post, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateGymsService } from '../services/create-gyms.service';
import { CreateTenantDto } from '../dto/create-gyms.dto';

@ApiTags('Gyms')
@Controller('gyms')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateGymsController {
  constructor(private readonly service: CreateGymsService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create Tenant' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateTenantDto) {
    return this.service.execute(dto);
  }
}
