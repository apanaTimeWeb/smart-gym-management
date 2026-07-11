import { Controller, Post, Get, Post, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateAffiliatesService } from '../services/create-affiliates.service';
import { CreateAffiliateDto } from '../dto/create-affiliates.dto';

@ApiTags('Affiliates')
@Controller('affiliates')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateAffiliatesController {
  constructor(private readonly service: CreateAffiliatesService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create Affiliate' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateAffiliateDto) {
    return this.service.execute(dto);
  }
}
