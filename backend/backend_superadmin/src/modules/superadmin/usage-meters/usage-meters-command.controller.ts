// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the usage-meters feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { UsageMetersCreateService } from '@/modules/superadmin/usage-meters/services/usage-meters-create.service';
import { UsageMetersCreateDto } from '@/modules/superadmin/usage-meters/dtos/usage-meters-create.dto';
import { UsageMetersUpdateService } from '@/modules/superadmin/usage-meters/services/usage-meters-update.service';
import { UsageMetersUpdateDto } from '@/modules/superadmin/usage-meters/dtos/usage-meters-update.dto';
import { UsageMetersDeleteService } from '@/modules/superadmin/usage-meters/services/usage-meters-delete.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersCommandController {
  constructor(private readonly createService: UsageMetersCreateService, private readonly updateService: UsageMetersUpdateService, private readonly deleteService: UsageMetersDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create usage-meters' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: UsageMetersCreateDto): Promise<unknown> { return this.createService.createUsageMeters(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update usage-meters' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: UsageMetersUpdateDto): Promise<unknown> { return this.updateService.updateUsageMeters(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove usage-meters' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteUsageMeters(id); }

}
