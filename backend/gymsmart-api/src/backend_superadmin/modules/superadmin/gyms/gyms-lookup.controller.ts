// RESPONSIBILITY: Owns HTTP transport for the gyms-lookup.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  // SLA: FAST
  @Get('gyms')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findGymsLookup(): Promise<GymsLookupItem[]> { return this.service.findGymsLookup(); }
}