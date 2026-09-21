// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the global-audit feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { GlobalAuditCreateService } from '@/modules/superadmin/global-audit/services/global-audit-create.service';
import { GlobalAuditCreateDto } from '@/modules/superadmin/global-audit/dtos/global-audit-create.dto';
import { GlobalAuditUpdateService } from '@/modules/superadmin/global-audit/services/global-audit-update.service';
import { GlobalAuditUpdateDto } from '@/modules/superadmin/global-audit/dtos/global-audit-update.dto';
import { GlobalAuditDeleteService } from '@/modules/superadmin/global-audit/services/global-audit-delete.service';

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
    async create(@Body() body: GlobalAuditCreateDto): Promise<unknown> { return this.createService.createGlobalAudit(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update global-audit' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: GlobalAuditUpdateDto): Promise<unknown> { return this.updateService.updateGlobalAudit(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove global-audit' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGlobalAudit(id); }

}
