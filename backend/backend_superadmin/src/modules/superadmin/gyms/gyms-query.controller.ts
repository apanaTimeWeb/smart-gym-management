// RESPONSIBILITY: Owns GET endpoints for the gyms feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { GymsQueryDto } from '@/modules/superadmin/gyms/dtos/gyms-query.dto';
import { GymsListService } from '@/modules/superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/modules/superadmin/gyms/services/gyms-find.service';
import { GymsOperationalService } from '@/modules/superadmin/gyms/services/gyms-operational.service';
import { GymsResponseDto } from '@/modules/superadmin/gyms/responses/gyms-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsQueryController {
  constructor(private readonly listService: GymsListService, private readonly findService: GymsFindService, private readonly operationalService: GymsOperationalService) {}
  /** Returns a paginated gyms list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: GymsQueryDto): Promise<{ data: GymsResponseDto[]; meta: any }> { return (await this.listService.findGymsPage(query)) as any; }
  /** Returns the Gym export resource URI. */
  @Get('export')
  async export(): Promise<{ downloadUrl: string }> { return this.operationalService.exportGyms(); }

  /** Returns one gyms record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: GymsResponseDto })
  async findOne(@Param('id') id: string): Promise<GymsResponseDto> { return (await this.findService.findGymsById(id)) as unknown as GymsResponseDto; }
}
