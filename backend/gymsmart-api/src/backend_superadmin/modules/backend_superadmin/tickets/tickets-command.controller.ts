// RESPONSIBILITY: Owns HTTP transport for the tickets-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { TicketsStatusDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/dtos/tickets-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { TicketsCreateService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-create.service';
import { TicketsCreateDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/dtos/tickets-create.dto';
import { TicketsUpdateService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-update.service';
import { TicketsUpdateDto } from '@/backend_superadmin/modules/backend_superadmin/tickets/dtos/tickets-update.dto';
import { TicketsDeleteService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-delete.service';
import { TicketsStatusService } from '@/backend_superadmin/modules/backend_superadmin/tickets/services/tickets-status.service';

@ApiTags('tickets')
@Controller('/superadmin/tickets')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class TicketsCommandController {
  constructor(private readonly createService: TicketsCreateService, private readonly updateService: TicketsUpdateService, private readonly deleteService: TicketsDeleteService, private readonly statusService: TicketsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
    async create(@Body() body: TicketsCreateDto): Promise<unknown> { return this.createService.createTickets(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: TicketsUpdateDto): Promise<unknown> { return this.updateService.updateTickets(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteTickets(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: TicketsStatusDto): Promise<unknown> { return this.statusService.changeTicketsStatus(id, body.status); }

}
