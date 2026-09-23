// RESPONSIBILITY: Owns frontend-compatible /api/gyms transport aliases without duplicating business logic.
// FLOW: HTTP -> DTO/query -> gyms use-case service -> repository -> canonical response interceptor.
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { GymsCreateDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-create.dto';
import { GymsUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-update.dto';
import { GymsStatusDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-status.dto';
import { GymsProvisionDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-provision.dto';
import { GymsOwnerEmailDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-owner-email.dto';
import { GymsQueryDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/dtos/gyms-query.dto';
import { GymsCreateService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-create.service';
import { GymsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-update.service';
import { GymsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-delete.service';
import { GymsStatusService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-status.service';
import { GymsProvisionService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-provision.service';
import { GymsListService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-list.service';
import { GymsFindService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-find.service';
import { GymsOperationalService } from '@/backend_superadmin/modules/backend_superadmin/gyms/services/gyms-operational.service';
import { GymsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/gyms/responses/gyms-response.dto';

@ApiTags('gyms-api')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class GymsApiController {
  constructor(
    private readonly createService: GymsCreateService,
    private readonly updateService: GymsUpdateService,
    private readonly deleteService: GymsDeleteService,
    private readonly statusService: GymsStatusService,
    private readonly provisionService: GymsProvisionService,
    private readonly listService: GymsListService,
    private readonly findService: GymsFindService,
    private readonly operationalService: GymsOperationalService,
  ) {}

  /** Returns the tenant collection consumed by frontend /api/gyms callers. */
  // SLA: FAST
  @Get('api/gyms')
  @ApiOperation({ summary: 'List gyms via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Paginated gym response.' })
  async findAll(@Query() query: GymsQueryDto): Promise<unknown> {
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
  @ApiResponse({ status: HttpStatus.CREATED, type: GymsResponseDto })
  async provision(@Body() body: GymsProvisionDto): Promise<GymsResponseDto> {
    return this.provisionService.provisionGym(body) as unknown as GymsResponseDto;
  }

  /** Returns one tenant by identifier. */
  @Get('api/gyms/:id')
  @ApiOperation({ summary: 'Find one gym via frontend-compatible /api path' })
  @ApiResponse({ status: HttpStatus.OK, type: GymsResponseDto })
  async findOne(@Param('id') id: string): Promise<GymsResponseDto> {
    return this.findService.findGymsById(id) as unknown as GymsResponseDto;
  }

  /** Creates a tenant through the canonical gyms create service. */
  @Post('api/gyms')
  @RequireIdempotencyKey()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, type: GymsResponseDto })
  async create(@Body() body: GymsCreateDto): Promise<GymsResponseDto> {
    return this.createService.createGyms(body) as unknown as GymsResponseDto;
  }

  /** Updates a tenant through the canonical gyms update service. */
  // SLA: STANDARD
  @Patch('api/gyms/:id')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, type: GymsResponseDto })
  async update(@Param('id') id: string, @Body() body: GymsUpdateDto): Promise<GymsResponseDto> {
    return this.updateService.updateGyms(id, body) as unknown as GymsResponseDto;
  }

  /** Changes tenant lifecycle status. */
  @Patch('api/gyms/:id/status')
  @RequireIdempotencyKey()
  @ApiResponse({ status: HttpStatus.OK, type: GymsResponseDto })
  async changeStatus(@Param('id') id: string, @Body() body: GymsStatusDto): Promise<GymsResponseDto> {
    return this.statusService.changeGymsStatus(id, body.status) as unknown as GymsResponseDto;
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
  async emailOwner(@Param('id') id: string, @Body() body: GymsOwnerEmailDto): Promise<null> {
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