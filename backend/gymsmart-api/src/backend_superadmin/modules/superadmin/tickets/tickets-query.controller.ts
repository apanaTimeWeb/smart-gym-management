// RESPONSIBILITY: Owns HTTP transport for the tickets-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { TicketsQueryDto } from '@/backend_superadmin/modules/superadmin/tickets/dtos/tickets-query.dto';
import { TicketsListService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-list.service';
import { TicketsFindService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-find.service';

@ApiTags('tickets')
@Controller('/superadmin/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsQueryController {
  constructor(private readonly listService: TicketsListService, private readonly findService: TicketsFindService) {}
  /** Returns a paginated tickets list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findAll(@Query() query: TicketsQueryDto): Promise<unknown> { return await this.listService.findTicketsPage(query); }
  /** Returns one tickets record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTicketsById(id); }
}