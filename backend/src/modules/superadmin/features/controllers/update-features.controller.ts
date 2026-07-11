import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateFeaturesService } from '../services/update-features.service';
import { UpdateFeatureFlagDto } from '../dto/update-features.dto';

@ApiTags('Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateFeaturesController {
  constructor(private readonly service: UpdateFeaturesService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update FeatureFlag' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateFeatureFlagDto) {
    return this.service.execute(id, dto);
  }
}
