// RESPONSIBILITY: Owns HTTP transport for the usage-meters-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { UsageMetersCreateService } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/services/usage-meters-create.service';
import { UsageMetersCreateDto } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/dtos/usage-meters-create.dto';
import { UsageMetersUpdateService } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/services/usage-meters-update.service';
import { UsageMetersUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/dtos/usage-meters-update.dto';
import { UsageMetersDeleteService } from '@/backend_superadmin/modules/backend_superadmin/usage-meters/services/usage-meters-delete.service';

@ApiTags('usage-meters')
@Controller('/superadmin/usage-meters')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class UsageMetersCommandController {
  constructor(private readonly createService: UsageMetersCreateService, private readonly updateService: UsageMetersUpdateService, private readonly deleteService: UsageMetersDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: UsageMetersCreateDto): Promise<unknown> { return this.createService.createUsageMeters(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: UsageMetersUpdateDto): Promise<unknown> { return this.updateService.updateUsageMeters(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove usage-meters' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteUsageMeters(id); }

}