import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { FeaturesService } from '../services/features.service';
import { CreateFeatureDto } from '../dto/create-features.dto';
import { UpdateFeatureDto } from '../dto/update-features.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Feature' })
  @ApiResponse({ status: HttpStatus.CREATED })
  create(@Body() createDto: CreateFeatureDto) {
    return this.featuresService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Features' })
  @ApiResponse({ status: HttpStatus.OK })
  findAll() {
    return this.featuresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Feature' })
  @ApiResponse({ status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.featuresService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific Feature' })
  @ApiResponse({ status: HttpStatus.OK })
  update(@Param('id') id: string, @Body() updateDto: UpdateFeatureDto) {
    return this.featuresService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific Feature' })
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.featuresService.remove(id);
  }
}
