import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FeaturesService } from '../services/features.service';
import { CreateFeatureFlagDto } from '../dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from '../dto/update-feature-flag.dto';
import { CreateReleaseNoteDto } from '../dto/create-release-note.dto';
import { UpdateReleaseNoteDto } from '../dto/update-release-note.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Superadmin: Features')
@Controller('features')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  /**
   * Primary endpoint — returns both feature flags and release notes.
   * Consumed by the frontend /superadmin/features page.
   */
  @Get()
  @ApiOperation({ summary: 'Get all Feature Flags and Release Notes' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns { flags[], notes[] }' })
  findAll() {
    return this.featuresService.findAll();
  }

  // ─── Feature Flag Routes ─────────────────────────────────────────────────────

  @Post('flags')
  @ApiOperation({ summary: 'Create a new Feature Flag' })
  @ApiResponse({ status: HttpStatus.CREATED })
  createFlag(@Body() createDto: CreateFeatureFlagDto) {
    return this.featuresService.createFlag(createDto);
  }

  @Get('flags/:id')
  @ApiOperation({ summary: 'Get a specific Feature Flag' })
  @ApiResponse({ status: HttpStatus.OK })
  findOneFlag(@Param('id') id: string) {
    return this.featuresService.findOneFlag(id);
  }

  @Patch('flags/:id')
  @ApiOperation({ summary: 'Update a specific Feature Flag (e.g., toggle isGlobalEnabled)' })
  @ApiResponse({ status: HttpStatus.OK })
  updateFlag(@Param('id') id: string, @Body() updateDto: UpdateFeatureFlagDto) {
    return this.featuresService.updateFlag(id, updateDto);
  }

  @Patch('flags/:id/toggle')
  @ApiOperation({ summary: 'Toggle the global status of a Feature Flag' })
  @ApiResponse({ status: HttpStatus.OK })
  toggleFlag(@Param('id') id: string) {
    return this.featuresService.toggleFlag(id);
  }

  @Delete('flags/:id')
  @ApiOperation({ summary: 'Delete a Feature Flag' })
  @ApiResponse({ status: HttpStatus.OK })
  removeFlag(@Param('id') id: string) {
    return this.featuresService.removeFlag(id);
  }

  // ─── Release Note Routes ─────────────────────────────────────────────────────

  @Post('notes')
  @ApiOperation({ summary: 'Create a new Release Note' })
  @ApiResponse({ status: HttpStatus.CREATED })
  createNote(@Body() createDto: CreateReleaseNoteDto) {
    return this.featuresService.createNote(createDto);
  }

  @Get('notes/:id')
  @ApiOperation({ summary: 'Get a specific Release Note' })
  @ApiResponse({ status: HttpStatus.OK })
  findOneNote(@Param('id') id: string) {
    return this.featuresService.findOneNote(id);
  }

  @Patch('notes/:id')
  @ApiOperation({ summary: 'Update a Release Note (e.g., publish it)' })
  @ApiResponse({ status: HttpStatus.OK })
  updateNote(@Param('id') id: string, @Body() updateDto: UpdateReleaseNoteDto) {
    return this.featuresService.updateNote(id, updateDto);
  }

  @Delete('notes/:id')
  @ApiOperation({ summary: 'Delete a Release Note' })
  @ApiResponse({ status: HttpStatus.OK })
  removeNote(@Param('id') id: string) {
    return this.featuresService.removeNote(id);
  }
}
