// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the coupons feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { CouponsCreateService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-create.service';
import { CouponsCreateDto } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/dtos/coupons-create.dto';
import { CouponsUpdateService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-update.service';
import { CouponsUpdateDto } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/dtos/coupons-update.dto';
import { CouponsDeleteService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-delete.service';
import { CouponsStatusService } from '@/backend_superadmin/modules/superadmin/saas-billing/coupons/services/coupons-status.service';

@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class CouponsCommandController {
  constructor(private readonly createService: CouponsCreateService, private readonly updateService: CouponsUpdateService, private readonly deleteService: CouponsDeleteService, private readonly statusService: CouponsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create coupons' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: CouponsCreateDto): Promise<unknown> { return this.createService.createCoupons(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update coupons' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: CouponsUpdateDto): Promise<unknown> { return this.updateService.updateCoupons(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove coupons' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCoupons(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus coupons' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeCouponsStatus(id, body.status); }

}
