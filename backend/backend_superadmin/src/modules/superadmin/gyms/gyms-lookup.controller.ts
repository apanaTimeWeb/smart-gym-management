// RESPONSIBILITY: Owns the single shared Superadmin gym lookup endpoint required by multiple frontend feature slices.
// FLOW: GET /gyms -> JwtAuthGuard -> RolesGuard -> GymsLookupService -> PostgreSQL -> response interceptor.
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { GymsLookupService } from '@/modules/superadmin/gyms/services/gyms-lookup.service';
import type { GymsLookupItem } from '@/modules/superadmin/gyms/services/gyms-lookup.service';
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
