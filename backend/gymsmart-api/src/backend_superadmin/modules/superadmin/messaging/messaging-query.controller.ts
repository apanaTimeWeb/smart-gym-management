// RESPONSIBILITY: Owns HTTP transport for the messaging-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { MessagingQueryDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/dtos/messaging-query.dto';
import { MessagingListService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-list.service';
import { MessagingFindService } from '@/backend_superadmin/modules/backend_superadmin/messaging/services/messaging-find.service';
import { MessagingResponseDto } from '@/backend_superadmin/modules/backend_superadmin/messaging/responses/messaging-response.dto';
import { TenantRegistryRepository } from '@/backend_superadmin/core/tenancy/tenant-registry.repository';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingQueryController {
  constructor(private readonly listService: MessagingListService, private readonly findService: MessagingFindService, private readonly tenantRegistry: TenantRegistryRepository) {}
  /** Returns a paginated messaging list. */
  // SLA: FAST
  @Get()
  async findAll(@Query() query: MessagingQueryDto): Promise<{ data: MessagingResponseDto[]; meta: unknown }> { return (await this.listService.findMessagingPage(query)) as never; }

  /** Returns the frontend-required tenant lookup for message recipients. */
  // SLA: FAST
  @Get('tenants')
  async findTenants(): Promise<Array<{ id: string; name: string; plan: string }>> {
    return this.tenantRegistry.listActiveTenantsForMessaging();
  }

  /** Returns messages through the explicit frontend /messages resource contract. */
  // SLA: FAST
  @Get('messages')
  async findMessages(@Query() query: MessagingQueryDto): Promise<{ data: MessagingResponseDto[]; meta: unknown }> {
    return (await this.listService.findMessagingPage(query)) as never;
  }

  /** Returns one messaging record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: MessagingResponseDto })
  async findOne(@Param('id') id: string): Promise<MessagingResponseDto> { return (await this.findService.findMessagingById(id)) as unknown as MessagingResponseDto; }
}