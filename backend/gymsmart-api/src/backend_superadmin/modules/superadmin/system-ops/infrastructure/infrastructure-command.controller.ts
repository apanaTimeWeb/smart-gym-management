// RESPONSIBILITY: Owns HTTP transport for the infrastructure-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { InfrastructureStatusDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { InfrastructureCreateService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-create.service';
import { InfrastructureCreateDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-create.dto';
import { InfrastructureUpdateService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-update.service';
import { InfrastructureUpdateDto } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/dtos/infrastructure-update.dto';
import { InfrastructureDeleteService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-delete.service';
import { InfrastructureStatusService } from '@/backend_superadmin/modules/superadmin/system-ops/infrastructure/services/infrastructure-status.service';

@ApiTags('infrastructure')
@Controller('/superadmin/system-ops/infrastructure')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InfrastructureCommandController {
  constructor(private readonly createService: InfrastructureCreateService, private readonly updateService: InfrastructureUpdateService, private readonly deleteService: InfrastructureDeleteService, private readonly statusService: InfrastructureStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    async create(@Body() body: InfrastructureCreateDto): Promise<unknown> { return this.createService.createInfrastructure(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: InfrastructureUpdateDto): Promise<unknown> { return this.updateService.updateInfrastructure(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteInfrastructure(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus infrastructure' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: InfrastructureStatusDto): Promise<unknown> { return this.statusService.changeInfrastructureStatus(id, body.status); }

}
