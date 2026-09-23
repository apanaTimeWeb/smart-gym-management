// RESPONSIBILITY: Owns HTTP transport for the tickets-actions.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminTicketsActionsService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-actions.service';
import { SuperadminTicketsAssignDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-assign.dto';
import { SuperadminTicketsReplyDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-reply.dto';


@ApiTags('tickets-actions')
@Controller('/superadmin/tickets')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTicketsActionsController {
  constructor(private readonly service: SuperadminTicketsActionsService) {}
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
  async assign(@Param('id') id: string, @Body() body: SuperadminTicketsAssignDto): Promise<unknown> { return this.service.assign(id, body.assignee); }
  /** Replies to one ticket. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(':id/reply')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async reply(@Param('id') id: string, @Body() body: SuperadminTicketsReplyDto): Promise<unknown> { return this.service.reply(id, body.replyText); }
}