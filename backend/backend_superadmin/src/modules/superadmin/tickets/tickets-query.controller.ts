// RESPONSIBILITY: Owns GET endpoints for the tickets feature and contains no mutation logic.
// FLOW: HTTP GET -> DTO validation -> query service -> repository -> canonical response interceptor.
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { TicketsQueryDto } from '@/modules/superadmin/tickets/dtos/tickets-query.dto';
import { TicketsListService } from '@/modules/superadmin/tickets/services/tickets-list.service';
import { TicketsFindService } from '@/modules/superadmin/tickets/services/tickets-find.service';

@ApiTags('tickets')
@Controller('/superadmin/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsQueryController {
  constructor(private readonly listService: TicketsListService, private readonly findService: TicketsFindService) {}
  /** Returns a paginated tickets list. */
  // SLA: STANDARD
  @Get()
  async findAll(@Query() query: TicketsQueryDto): Promise<unknown> { return await this.listService.findTicketsPage(query); }
  /** Returns one tickets record. */
  // SLA: FAST
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<unknown> { return await this.findService.findTicketsById(id); }
}
