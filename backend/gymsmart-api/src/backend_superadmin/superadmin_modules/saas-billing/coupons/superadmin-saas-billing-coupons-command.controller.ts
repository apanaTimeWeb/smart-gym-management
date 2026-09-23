// RESPONSIBILITY: Owns HTTP transport for the coupons-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminCouponsStatusDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/dtos/superadmin-saas-billing-coupons-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminCouponsCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-create.service';
import { SuperadminCouponsCreateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/dtos/superadmin-saas-billing-coupons-create.dto';
import { SuperadminCouponsUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-update.service';
import { SuperadminCouponsUpdateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/dtos/superadmin-saas-billing-coupons-update.dto';
import { SuperadminCouponsDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-delete.service';
import { SuperadminCouponsStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/services/superadmin-saas-billing-coupons-status.service';

@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminCouponsCommandController {
  constructor(private readonly createService: SuperadminCouponsCreateService, private readonly updateService: SuperadminCouponsUpdateService, private readonly deleteService: SuperadminCouponsDeleteService, private readonly statusService: SuperadminCouponsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminCouponsCreateDto): Promise<unknown> { return this.createService.createCoupons(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminCouponsUpdateDto): Promise<unknown> { return this.updateService.updateCoupons(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCoupons(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminCouponsStatusDto): Promise<unknown> { return this.statusService.changeCouponsStatus(id, body.status); }

}
