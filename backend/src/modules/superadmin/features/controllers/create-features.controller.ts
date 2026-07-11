import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateFeaturesService } from '../services/create-features.service';
import { CreateFeatureFlagDto } from '../dto/create-features.dto';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateFeaturesController {
  constructor(private readonly service: CreateFeaturesService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create FeatureFlag' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateFeatureFlagDto) {
    return this.service.execute(dto);
  }
}
