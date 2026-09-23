// RESPONSIBILITY: Owns HTTP transport for the compliance-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminComplianceCreateService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-create.service';
import { SuperadminComplianceCreateDto } from '@/backend_superadmin/superadmin_modules/compliance/dtos/superadmin-compliance-create.dto';
import { SuperadminComplianceUpdateService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-update.service';
import { SuperadminComplianceUpdateDto } from '@/backend_superadmin/superadmin_modules/compliance/dtos/superadmin-compliance-update.dto';
import { SuperadminComplianceDeleteService } from '@/backend_superadmin/superadmin_modules/compliance/services/superadmin-compliance-delete.service';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/responses/superadmin-compliance-response.dto';

@ApiTags('compliance')
@Controller('/superadmin/compliance')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminComplianceCommandController {
  constructor(private readonly createService: SuperadminComplianceCreateService, private readonly updateService: SuperadminComplianceUpdateService, private readonly deleteService: SuperadminComplianceDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminComplianceResponseDto })
    async create(@Body() body: SuperadminComplianceCreateDto): Promise<SuperadminComplianceResponseDto> { return this.createService.createCompliance(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminComplianceResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminComplianceUpdateDto): Promise<SuperadminComplianceResponseDto> { return this.updateService.updateCompliance(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCompliance(id); }

}