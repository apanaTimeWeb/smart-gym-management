// RESPONSIBILITY: Owns HTTP transport for the gyms-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { GymsQueryDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-query.dto';
import { GymsListService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-find.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-operational.service';
import { GymsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/responses/gyms-response.dto';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsQueryController {
  constructor(private readonly listService: GymsListService, private readonly findService: GymsFindService, private readonly operationalService: GymsOperationalService) {}
  /** Returns a paginated gyms list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: GymsQueryDto): Promise<{ data: GymsResponseDto[]; meta: unknown }> { return (await this.listService.findGymsPage(query)) as never; }
  /** Returns the Gym export resource URI. */
  // SLA: HEAVY
  @Get('export')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async export(): Promise<{ downloadUrl: string }> { return this.operationalService.exportGyms(); }

  /** Returns one gyms record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: GymsResponseDto })
  async findOne(@Param('id') id: string): Promise<GymsResponseDto> { return (await this.findService.findGymsById(id)) as unknown as GymsResponseDto; }
}