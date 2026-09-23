// RESPONSIBILITY: Owns frontend-compatible /api/gyms transport aliases without duplicating business logic.
// FLOW: HTTP -> DTO/query -> gyms use-case service -> repository -> canonical response interceptor.
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminGymsCreateDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-create.dto';
import { SuperadminGymsUpdateDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-update.dto';
import { SuperadminGymsStatusDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-status.dto';
import { SuperadminGymsProvisionDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-provision.dto';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-owner-email.dto';
import { SuperadminGymsQueryDto } from '@/backend_superadmin/superadmin_modules/gyms/dtos/superadmin-gyms-query.dto';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-create.service';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-update.service';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-delete.service';
import { SuperadminGymsStatusService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-status.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-provision.service';
import { SuperadminGymsListService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-list.service';
import { SuperadminGymsFindService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-find.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/services/superadmin-gyms-operational.service';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/responses/superadmin-gyms-response.dto';

@ApiTags('gyms-api')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsApiController {
  constructor(
    private readonly createService: SuperadminGymsCreateService,
    private readonly updateService: SuperadminGymsUpdateService,
    private readonly deleteService: SuperadminGymsDeleteService,
    private readonly statusService: SuperadminGymsStatusService,
    private readonly provisionService: SuperadminGymsProvisionService,
    private readonly listService: SuperadminGymsListService,
    private readonly findService: SuperadminGymsFindService,
    private readonly operationalService: SuperadminGymsOperationalService,
  ) {}

  /** Returns the tenant collection consumed by frontend /api/gyms callers. */
  // SLA: FAST
  @Get('api/gyms')
  @ApiOperation({ summary: 'List gyms via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated gym response.' })
  async findAll(@Query() query: SuperadminGymsQueryDto): Promise<unknown> {
    return this.listService.findGymsPage(query);
  }

  /** Streams the controlled CSV export generated from active tenant records. */
  @Get('api/gyms/export/file')
  @ApiOperation({ summary: 'Download gym CSV export' })
  @ApiResponse({ status: HttpStatus.OK, description: 'CSV gym export.' })
  async exportFile(): Promise<StreamableFile> {
    const csv = await this.operationalService.buildGymsExportCsv();
    return new StreamableFile(Buffer.from(csv, 'utf8'), { type: 'text/csv', disposition: 'attachment; filename=gyms.csv' });
  }

  /** Returns fixed aggregate statistics before the parameterized :id route is considered. */
  @Get('api/gyms/stats')
  @ApiOperation({ summary: 'Return gym aggregate statistics' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Tenant statistics.' })
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> {
    return this.operationalService.stats();
  }

  /** Returns the frontend-compatible gym export resource. */
  @Get('api/gyms/export')
  @ApiOperation({ summary: 'Return gym export resource' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Export resource.' })
  async export(): Promise<{ downloadUrl: string }> {
    return this.operationalService.exportGyms();
  }

  /** Starts tenant provisioning before the parameterized POST routes are evaluated. */
  // SLA: STANDARD
  @Post('api/gyms/provision')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: SuperadminGymsResponseDto })
  async provision(@Body() body: SuperadminGymsProvisionDto): Promise<SuperadminGymsResponseDto> {
    return this.provisionService.provisionGym(body) as unknown as SuperadminGymsResponseDto;
  }

  /** Returns one tenant by identifier. */
  @Get('api/gyms/:id')
  @ApiOperation({ summary: 'Find one gym via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminGymsResponseDto> {
    return this.findService.findGymsById(id) as unknown as SuperadminGymsResponseDto;
  }

  /** Creates a tenant through the canonical gyms create service. */
  @Post('api/gyms')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: SuperadminGymsResponseDto })
  async create(@Body() body: SuperadminGymsCreateDto): Promise<SuperadminGymsResponseDto> {
    return this.createService.createGyms(body) as unknown as SuperadminGymsResponseDto;
  }

  /** Updates a tenant through the canonical gyms update service. */
  // SLA: STANDARD
  @Patch('api/gyms/:id')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  async update(@Param('id') id: string, @Body() body: SuperadminGymsUpdateDto): Promise<SuperadminGymsResponseDto> {
    return this.updateService.updateGyms(id, body) as unknown as SuperadminGymsResponseDto;
  }

  /** Changes tenant lifecycle status. */
  @Patch('api/gyms/:id/status')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminGymsResponseDto })
  async changeStatus(@Param('id') id: string, @Body() body: SuperadminGymsStatusDto): Promise<SuperadminGymsResponseDto> {
    return this.statusService.changeGymsStatus(id, body.status) as unknown as SuperadminGymsResponseDto;
  }

  /** Soft-deletes a tenant. */
  @Delete('api/gyms/:id')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, description: 'Tenant soft-deleted.' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteService.deleteGyms(id);
  }

  /** Sends an owner email command through the owning operational service. */
  @Post('api/gyms/:id/email')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, description: 'Owner message accepted.' })
  async emailOwner(@Param('id') id: string, @Body() body: SuperadminGymsOwnerEmailDto): Promise<null> {
    return this.operationalService.emailOwner(id, body.subject, body.message);
  }

  /** Issues a short-lived impersonation artifact tied to the authenticated actor and tenant. */
  @Post('api/gyms/:id/impersonate')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, description: 'Impersonation artifact issued.' })
  async impersonate(@Param('id') id: string): Promise<{ token: string }> {
    return this.operationalService.impersonate(id);
  }
}