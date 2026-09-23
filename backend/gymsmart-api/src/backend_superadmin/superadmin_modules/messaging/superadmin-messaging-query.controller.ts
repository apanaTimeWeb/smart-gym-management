// RESPONSIBILITY: Owns HTTP transport for the messaging-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminMessagingQueryDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-query.dto';
import { SuperadminMessagingListService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-list.service';
import { SuperadminMessagingFindService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-find.service';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';
import { SuperadminTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/tenancy/superadmin-core-tenant-registry.repository';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingQueryController {
  constructor(private readonly listService: SuperadminMessagingListService, private readonly findService: SuperadminMessagingFindService, private readonly tenantRegistry: SuperadminTenantRegistryRepository) {}
  /** Returns a paginated messaging list. */
  // SLA: FAST
  @Get()
  async findAll(@Query() query: SuperadminMessagingQueryDto): Promise<{ data: SuperadminMessagingResponseDto[]; meta: unknown }> { return (await this.listService.findMessagingPage(query)) as never; }

  /** Returns the frontend-required tenant lookup for message recipients. */
  // SLA: FAST
  @Get('tenants')
  async findTenants(): Promise<Array<{ id: string; name: string; plan: string }>> {
    return this.tenantRegistry.listActiveTenantsForMessaging();
  }

  /** Returns messages through the explicit frontend /messages resource contract. */
  // SLA: FAST
  @Get('messages')
  async findMessages(@Query() query: SuperadminMessagingQueryDto): Promise<{ data: SuperadminMessagingResponseDto[]; meta: unknown }> {
    return (await this.listService.findMessagingPage(query)) as never;
  }

  /** Returns one messaging record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  async findOne(@Param('id') id: string): Promise<SuperadminMessagingResponseDto> { return (await this.findService.findMessagingById(id)) as unknown as SuperadminMessagingResponseDto; }
}