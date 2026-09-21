// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the features feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { FeaturesCreateService } from '@/modules/superadmin/features/services/features-create.service';
import { FeaturesCreateDto } from '@/modules/superadmin/features/dtos/features-create.dto';
import { FeaturesUpdateService } from '@/modules/superadmin/features/services/features-update.service';
import { FeaturesUpdateDto } from '@/modules/superadmin/features/dtos/features-update.dto';
import { FeaturesDeleteService } from '@/modules/superadmin/features/services/features-delete.service';

@ApiTags('features')
@Controller('/superadmin/features')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class FeaturesCommandController {
  constructor(private readonly createService: FeaturesCreateService, private readonly updateService: FeaturesUpdateService, private readonly deleteService: FeaturesDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create features' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: FeaturesCreateDto): Promise<unknown> { return this.createService.createFeatures(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update features' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: FeaturesUpdateDto): Promise<unknown> { return this.updateService.updateFeatures(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove features' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteFeatures(id); }

}
