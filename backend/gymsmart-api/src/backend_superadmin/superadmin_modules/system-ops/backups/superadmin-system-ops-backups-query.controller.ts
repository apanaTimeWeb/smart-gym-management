// RESPONSIBILITY: Owns HTTP transport for the backups-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminBackupsQueryDto } from '@/backend_superadmin/superadmin_modules/system-ops/backups/dtos/superadmin-system-ops-backups-query.dto';
import { SuperadminBackupsListService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-list.service';
import { SuperadminBackupsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/backups/services/superadmin-system-ops-backups-find.service';

@ApiTags('backups')
@Controller('/superadmin/system-ops/backups')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBackupsQueryController {
  constructor(private readonly listService: SuperadminBackupsListService, private readonly findService: SuperadminBackupsFindService) {}
  /** Returns a paginated backups list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminBackupsQueryDto): Promise<unknown> { return await this.listService.findBackupsPage(query); }
  /** Returns one backups record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findBackupsById(id); }
}