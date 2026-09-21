// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the compliance feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { ComplianceCreateService } from '@/modules/superadmin/compliance/services/compliance-create.service';
import { ComplianceCreateDto } from '@/modules/superadmin/compliance/dtos/compliance-create.dto';
import { ComplianceUpdateService } from '@/modules/superadmin/compliance/services/compliance-update.service';
import { ComplianceUpdateDto } from '@/modules/superadmin/compliance/dtos/compliance-update.dto';
import { ComplianceDeleteService } from '@/modules/superadmin/compliance/services/compliance-delete.service';
import { ComplianceResponseDto } from '@/modules/superadmin/compliance/responses/compliance-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('compliance')
@Controller('/superadmin/compliance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class ComplianceCommandController {
  constructor(private readonly createService: ComplianceCreateService, private readonly updateService: ComplianceUpdateService, private readonly deleteService: ComplianceDeleteService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create compliance' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: ComplianceResponseDto })
    async create(@Body() body: ComplianceCreateDto): Promise<ComplianceResponseDto> { return this.createService.createCompliance(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update compliance' })
  @Patch(':id')
    @UseGuards(RateLimitGuard)
    @ApiResponse({ type: ComplianceResponseDto })
    async update(@Param('id') id: string, @Body() body: ComplianceUpdateDto): Promise<ComplianceResponseDto> { return this.updateService.updateCompliance(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove compliance' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCompliance(id); }

}
