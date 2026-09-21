// RESPONSIBILITY: Owns the single shared Superadmin gym lookup endpoint required by multiple frontend feature slices.
// FLOW: GET /gyms -> JwtAuthGuard -> RolesGuard -> GymsLookupService -> PostgreSQL -> response interceptor.
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GymsLookupService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-lookup.service';
import type { GymsLookupItem } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-lookup.service';
@ApiTags('gyms-lookup')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsLookupController {
  constructor(private readonly service: GymsLookupService) {}
  /** Returns the active gym lookup vocabulary shared by Superadmin features. */
  @ApiOperation({ summary: 'GET /gyms' })
  @Get('gyms')
  async findGymsLookup(): Promise<GymsLookupItem[]> { return this.service.findGymsLookup(); }
}
