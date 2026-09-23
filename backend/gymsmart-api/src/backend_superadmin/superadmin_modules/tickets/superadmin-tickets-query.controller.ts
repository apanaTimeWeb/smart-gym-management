// RESPONSIBILITY: Owns HTTP transport for the tickets-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminTicketsQueryDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-query.dto';
import { SuperadminTicketsListService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-list.service';
import { SuperadminTicketsFindService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-find.service';

@ApiTags('tickets')
@Controller('/superadmin/tickets')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTicketsQueryController {
  constructor(private readonly listService: SuperadminTicketsListService, private readonly findService: SuperadminTicketsFindService) {}
  /** Returns a paginated tickets list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: SuperadminTicketsQueryDto): Promise<unknown> { return await this.listService.findTicketsPage(query); }
  /** Returns one tickets record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTicketsById(id); }
}