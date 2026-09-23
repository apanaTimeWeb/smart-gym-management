// RESPONSIBILITY: Owns HTTP transport for the migrations-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminMigrationsQueryDto } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/dtos/superadmin-system-ops-migrations-query.dto';
import { SuperadminMigrationsListService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-list.service';
import { SuperadminMigrationsFindService } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/services/superadmin-system-ops-migrations-find.service';

@ApiTags('migrations')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMigrationsQueryController {
  constructor(private readonly listService: SuperadminMigrationsListService, private readonly findService: SuperadminMigrationsFindService) {}
  /** Returns a paginated migrations list. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrations')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminMigrationsQueryDto): Promise<unknown> { return await this.listService.findMigrationsPage(query); }

  /** Implements the frozen frontend migration-search route contract. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrationssearch')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findMigrationSearch(@Query() query: SuperadminMigrationsQueryDto): Promise<unknown> { return await this.listService.findMigrationsPage(query); }

  /** Returns one migrations record. */
  // SLA: FAST
  @Get('superadmin/system-ops/migrations/:id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findMigrationsById(id); }
}