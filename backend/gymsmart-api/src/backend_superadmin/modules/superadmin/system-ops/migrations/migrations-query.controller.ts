// RESPONSIBILITY: Owns GET endpoints for the migrations feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MigrationsQueryDto } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/dtos/migrations-query.dto';
import { MigrationsListService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-list.service';
import { MigrationsFindService } from '@/backend_superadmin/modules/superadmin/system-ops/migrations/services/migrations-find.service';

@ApiTags('migrations')
@Controller('/superadmin/system-ops/migrations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MigrationsQueryController {
  constructor(private readonly listService: MigrationsListService, private readonly findService: MigrationsFindService) {}
  /** Returns a paginated migrations list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: MigrationsQueryDto): Promise<unknown> { return await this.listService.findMigrationsPage(query); }
  /** Returns one migrations record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findMigrationsById(id); }
}
