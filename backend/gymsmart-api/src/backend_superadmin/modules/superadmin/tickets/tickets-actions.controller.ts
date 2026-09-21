// RESPONSIBILITY: Owns ticket close, assign, and reply HTTP mutations required by the Superadmin frontend.
// FLOW: HTTP -> DTO/body -> action service -> repository -> canonical response interceptor.
import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { TicketsActionsService } from '@/backend_superadmin/modules/superadmin/tickets/services/tickets-actions.service';

@ApiTags('tickets-actions')
@Controller('/superadmin/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsActionsController {
  constructor(private readonly service: TicketsActionsService) {}
  /** Closes one ticket. */
  @Post(':id/close')
  @RequireIdempotencyKey()
  async close(@Param('id') id: string): Promise<unknown> { return this.service.close(id); }
  /** Assigns one ticket. */
  @Post(':id/assign')
  @RequireIdempotencyKey()
  async assign(@Param('id') id: string, @Body() body: { assignee: string }): Promise<unknown> { return this.service.assign(id, body.assignee); }
  /** Replies to one ticket. */
  @Post(':id/reply')
  @RequireIdempotencyKey()
  async reply(@Param('id') id: string, @Body() body: { replyText: string }): Promise<unknown> { return this.service.reply(id, body.replyText); }
}
