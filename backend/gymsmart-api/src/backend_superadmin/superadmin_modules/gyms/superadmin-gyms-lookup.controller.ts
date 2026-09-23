// RESPONSIBILITY: Owns HTTP transport for the gyms-lookup.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminGymsLookupService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-lookup.service';
import type { SuperadminGymsLookupItem } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-lookup.service';
@ApiTags('gyms-lookup')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsLookupController {
  constructor(private readonly service: SuperadminGymsLookupService) {}
  /** Returns the active gym lookup vocabulary shared by Superadmin features. */
  @ApiOperation({ summary: 'GET /gyms' })
  // SLA: FAST
  @Get('gyms')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findGymsLookup(): Promise<SuperadminGymsLookupItem[]> { return this.service.findGymsLookup(); }
}