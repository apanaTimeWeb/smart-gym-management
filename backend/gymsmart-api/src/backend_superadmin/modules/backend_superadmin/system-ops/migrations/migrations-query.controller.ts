// RESPONSIBILITY: Owns HTTP transport for the migrations-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MigrationsQueryDto } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/dtos/migrations-query.dto';
import { MigrationsListService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-list.service';
import { MigrationsFindService } from '@/backend_superadmin/modules/backend_superadmin/system-ops/migrations/services/migrations-find.service';

@ApiTags('migrations')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MigrationsQueryController {
  constructor(private readonly listService: MigrationsListService, private readonly findService: MigrationsFindService) {}
  /** Returns a paginated migrations list. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: MigrationsQueryDto): Promise<unknown> { return await this.listService.findMigrationsPage(query); }

  /** Implements the frozen frontend migration-search route contract. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrationssearch')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findMigrationSearch(@Query() query: MigrationsQueryDto): Promise<unknown> { return await this.listService.findMigrationsPage(query); }

  /** Returns one migrations record. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrations/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findMigrationsById(id); }
}