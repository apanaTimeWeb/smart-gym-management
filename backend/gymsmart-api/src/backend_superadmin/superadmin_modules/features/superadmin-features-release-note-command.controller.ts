// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminFeaturesReleaseNoteService } from '@/backend_superadmin/superadmin_modules/features/services/superadmin-features-release-note.service';
import { SuperadminFeaturesReleaseNoteCreateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-release-note-create.dto';
import { SuperadminFeaturesReleaseNoteUpdateDto } from '@/backend_superadmin/superadmin_modules/features/dtos/superadmin-features-release-note-update.dto';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminFeaturesReleaseNoteDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-release-note.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('featuresreleasenotecommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesReleaseNoteCommandController {
  constructor(private readonly releaseNoteService: SuperadminFeaturesReleaseNoteService) {}


  /** Creates a release note. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/features/notes')
  @ApiResponse({ type: SuperadminFeaturesReleaseNoteDto })
  async createReleaseNote(@Body() body: SuperadminFeaturesReleaseNoteCreateDto): Promise<SuperadminFeaturesReleaseNoteDto> { return this.releaseNoteService.create(body) as unknown as SuperadminFeaturesReleaseNoteDto; }


  /** Updates a release note. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch('superadmin/features/notes/:id')
  @ApiResponse({ type: SuperadminFeaturesReleaseNoteDto })
  async updateReleaseNote(@Param('id') id: string, @Body() body: SuperadminFeaturesReleaseNoteUpdateDto): Promise<SuperadminFeaturesReleaseNoteDto> { return this.releaseNoteService.update(id, body) as unknown as SuperadminFeaturesReleaseNoteDto; }


  /** Deletes a release note using soft-delete. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete('superadmin/features/notes/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async deleteReleaseNote(@Param('id') id: string): Promise<null> { return this.releaseNoteService.remove(id); }

}