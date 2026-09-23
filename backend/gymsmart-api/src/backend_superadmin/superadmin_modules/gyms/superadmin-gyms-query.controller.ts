// RESPONSIBILITY: Owns HTTP transport for the gyms-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminGymsQueryDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-query.dto';
import { SuperadminGymsListService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-list.service';
import { SuperadminGymsFindService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-find.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-operational.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsQueryController {
  constructor(private readonly listService: SuperadminGymsListService, private readonly findService: SuperadminGymsFindService, private readonly operationalService: SuperadminGymsOperationalService) {}
  /** Returns a paginated gyms list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminGymsQueryDto): Promise<{ data: SuperadminGymsResponseDto[]; meta: unknown }> { return (await this.listService.findGymsPage(query)) as never; }
  /** Returns the Gym export resource URI. */
  // SLA: HEAVY
  @Get('export')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async export(): Promise<{ downloadUrl: string }> { return this.operationalService.exportGyms(); }

  /** Returns one gyms record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminGymsResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminGymsResponseDto> { return (await this.findService.findGymsById(id)) as unknown as SuperadminGymsResponseDto; }
}