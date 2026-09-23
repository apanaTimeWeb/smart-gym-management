// RESPONSIBILITY: Owns HTTP transport for the global-audit-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminGlobalAuditCreateService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-create.service';
import { SuperadminGlobalAuditCreateDto } from '@/backend_superadmin/superadmin_modules/global-audit/dtos/superadmin-global-audit-create.dto';
import { SuperadminGlobalAuditUpdateService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-update.service';
import { SuperadminGlobalAuditUpdateDto } from '@/backend_superadmin/superadmin_modules/global-audit/dtos/superadmin-global-audit-update.dto';
import { SuperadminGlobalAuditDeleteService } from '@/backend_superadmin/superadmin_modules/global-audit/services/superadmin-global-audit-delete.service';
import { SuperadminGlobalAuditResponseDto } from '@/backend_superadmin/superadmin_modules/global-audit/responses/superadmin-global-audit-response.dto';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGlobalAuditCommandController {
  constructor(private readonly createService: SuperadminGlobalAuditCreateService, private readonly updateService: SuperadminGlobalAuditUpdateService, private readonly deleteService: SuperadminGlobalAuditDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create global-audit' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGlobalAuditResponseDto })
    async create(@Body() body: SuperadminGlobalAuditCreateDto): Promise<SuperadminGlobalAuditResponseDto> { return (this.createService.createGlobalAudit(body)) as unknown as SuperadminGlobalAuditResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update global-audit' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminGlobalAuditResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminGlobalAuditUpdateDto): Promise<SuperadminGlobalAuditResponseDto> { return (this.updateService.updateGlobalAudit(id, body)) as unknown as SuperadminGlobalAuditResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove global-audit' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGlobalAudit(id); }

}