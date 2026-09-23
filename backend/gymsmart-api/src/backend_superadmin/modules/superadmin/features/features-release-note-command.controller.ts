// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { FeaturesReleaseNoteService } from '@/backend_superadmin/modules/superadmin/features/services/features-release-note.service';
import { FeaturesReleaseNoteCreateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-create.dto';
import { FeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/modules/superadmin/features/dtos/features-release-note-update.dto';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { FeaturesReleaseNoteDto } from '@/backend_superadmin/modules/superadmin/features/features-release-note.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('featuresreleasenotecommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesReleaseNoteCommandController {
  constructor(private readonly releaseNoteService: FeaturesReleaseNoteService) {}


  /** Creates a release note. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/features/notes')
  @ApiResponse({ type: FeaturesReleaseNoteDto })
  async createReleaseNote(@Body() body: FeaturesReleaseNoteCreateDto): Promise<FeaturesReleaseNoteDto> { return this.releaseNoteService.create(body) as unknown as FeaturesReleaseNoteDto; }


  /** Updates a release note. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/features/notes/:id')
  @ApiResponse({ type: FeaturesReleaseNoteDto })
  async updateReleaseNote(@Param('id') id: string, @Body() body: FeaturesReleaseNoteUpdateDto): Promise<FeaturesReleaseNoteDto> { return this.releaseNoteService.update(id, body) as unknown as FeaturesReleaseNoteDto; }


  /** Deletes a release note using soft-delete. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('superadmin/features/notes/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async deleteReleaseNote(@Param('id') id: string): Promise<null> { return this.releaseNoteService.remove(id); }

}