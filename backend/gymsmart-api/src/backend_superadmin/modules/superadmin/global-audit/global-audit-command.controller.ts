// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the global-audit feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { GlobalAuditCreateService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-create.service';
import { GlobalAuditCreateDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-create.dto';
import { GlobalAuditUpdateService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-update.service';
import { GlobalAuditUpdateDto } from '@/backend_superadmin/modules/superadmin/global-audit/dtos/global-audit-update.dto';
import { GlobalAuditDeleteService } from '@/backend_superadmin/modules/superadmin/global-audit/services/global-audit-delete.service';
import { GlobalAuditResponseDto } from '@/backend_superadmin/modules/superadmin/global-audit/responses/global-audit-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('global-audit')
@Controller('/superadmin/global-audit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GlobalAuditCommandController {
  constructor(private readonly createService: GlobalAuditCreateService, private readonly updateService: GlobalAuditUpdateService, private readonly deleteService: GlobalAuditDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create global-audit' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: GlobalAuditResponseDto })
    async create(@Body() body: GlobalAuditCreateDto): Promise<GlobalAuditResponseDto> { return (this.createService.createGlobalAudit(body)) as unknown as GlobalAuditResponseDto; }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update global-audit' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: GlobalAuditResponseDto })
    async update(@Param('id') id: string, @Body() body: GlobalAuditUpdateDto): Promise<GlobalAuditResponseDto> { return (this.updateService.updateGlobalAudit(id, body)) as unknown as GlobalAuditResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove global-audit' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGlobalAudit(id); }

}
