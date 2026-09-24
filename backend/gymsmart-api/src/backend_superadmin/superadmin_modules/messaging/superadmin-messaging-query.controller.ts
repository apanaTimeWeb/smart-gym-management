// RESPONSIBILITY: Owns HTTP transport for the messaging-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminMessagingQueryDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_dtos/superadmin-messaging-query.dto';
import { SuperadminMessagingListService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-list.service';
import { SuperadminMessagingFindService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-find.service';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-response.dto';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-pagination.utils';
import { SuperadminCoreTenantRegistryRepository } from '@/backend_superadmin/superadmin_core/superadmin_core_tenancy/superadmin-core-tenant-registry.repository';

/**
 * Primary Intent: Defines SuperadminMessagingQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingQueryController {
  constructor(private readonly listService: SuperadminMessagingListService, private readonly findService: SuperadminMessagingFindService, private readonly tenantRegistry: SuperadminCoreTenantRegistryRepository) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated messaging list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminMessagingQueryDto): Promise<{ data: SuperadminMessagingResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> { return (await this.listService.findMessagingPage(query)) as never; }
/**
 * Primary Intent: Executes the findTenants use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the frontend-required tenant lookup for message recipients. */
  // SLA: FAST
  @Get('tenants')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'findTenants' })
  /**
   * Primary Intent: Executes the findTenants use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTenants(): Promise<Array<{ id: string; name: string; plan: string }>> {
    return this.tenantRegistry.listActiveTenantsForMessaging();
  }
/**
 * Primary Intent: Executes the findMessages use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns messages through the explicit frontend /messages resource contract. */
  // SLA: FAST
  @Get('messages')
  @ApiResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'findMessages' })
  /**
   * Primary Intent: Executes the findMessages use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findMessages(@Query() query: SuperadminMessagingQueryDto): Promise<{ data: SuperadminMessagingResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    return (await this.listService.findMessagingPage(query)) as never;
  }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one messaging record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminMessagingResponseDto> { return (await this.findService.findMessagingById(id)) as unknown as SuperadminMessagingResponseDto; }
}
