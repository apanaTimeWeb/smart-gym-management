// RESPONSIBILITY: Owns HTTP transport for the backups-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { BackupsQueryDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/dtos/backups-query.dto';
import { BackupsListService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/services/backups-list.service';
import { BackupsFindService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/backups/services/backups-find.service';

@ApiTags('backups')
@Controller('/superadmin/system-ops/backups')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class BackupsQueryController {
  constructor(private readonly listService: BackupsListService, private readonly findService: BackupsFindService) {}
  /** Returns a paginated backups list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: BackupsQueryDto): Promise<unknown> { return await this.listService.findBackupsPage(query); }
  /** Returns one backups record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findBackupsById(id); }
}