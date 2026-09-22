// RESPONSIBILITY: Preserves the legacy frontend API namespace during the contract transition for Tickets.
// FLOW: /superadmin/tickets -> compatibility controller -> same orchestrators/services as /api/v1/superadmin/tickets.

import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';

import { TicketsListService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-list.service';
import { TicketsFindService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-find.service';
import { TicketsUpdateService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-update.service';
import { TicketsActionsService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-actions.service';

import { TicketsQueryDto } from '@/backend_superadmin/modules/superadmin/tickets/dtos/tickets-query.dto';
import { TicketsUpdateDto } from '@/backend_superadmin/modules/superadmin/tickets/dtos/tickets-update.dto';

@ApiTags('Tickets-Compatibility')
@Controller({ path: 'superadmin/tickets', version: VERSION_NEUTRAL })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsCompatibilityController {
  constructor(
    private readonly listService: TicketsListService,
    private readonly findService: TicketsFindService,
    private readonly updateService: TicketsUpdateService,
    private readonly actionsService: TicketsActionsService
  ) {}

  @Get()
  @Version(VERSION_NEUTRAL)
  async fetchTickets(@Query() query: TicketsQueryDto) { return await this.listService.findTicketsPage(query); }

  @Get(':id')
  @Version(VERSION_NEUTRAL)
  async fetchTicketById(@Param('id') id: string) { return await this.findService.findTicketsById(id); }

  @Patch(':id')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
  async updateTicket(@Param('id') id: string, @Body() body: TicketsUpdateDto) { return this.updateService.updateTickets(id, body); }

  @Post(':id/close')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async closeTicket(@Param('id') id: string) { return this.actionsService.close(id); }

  @Post(':id/assign')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async assignTicket(@Param('id') id: string, @Body() body: { assignee: string }) { return this.actionsService.assign(id, body.assignee); }

  @Post(':id/reply')
  @Version(VERSION_NEUTRAL)
  @RequireIdempotencyKey()
  async replyToTicket(@Param('id') id: string, @Body() body: { replyText: string }) { return this.actionsService.reply(id, body.replyText); }
}
