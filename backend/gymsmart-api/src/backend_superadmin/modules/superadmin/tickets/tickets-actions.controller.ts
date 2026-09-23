// RESPONSIBILITY: Owns HTTP transport for the tickets-actions.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { TicketsActionsService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-actions.service';
import { TicketsAssignDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/dtos/tickets-assign.dto';
import { TicketsReplyDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/dtos/tickets-reply.dto';


@ApiTags('tickets-actions')
@Controller('/superadmin/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsActionsController {
  constructor(private readonly service: TicketsActionsService) {}
  /** Closes one ticket. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/close')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async close(@Param('id') id: string): Promise<unknown> { return this.service.close(id); }
  /** Assigns one ticket. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/assign')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async assign(@Param('id') id: string, @Body() body: TicketsAssignDto): Promise<unknown> { return this.service.assign(id, body.assignee); }
  /** Replies to one ticket. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/reply')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async reply(@Param('id') id: string, @Body() body: TicketsReplyDto): Promise<unknown> { return this.service.reply(id, body.replyText); }
}