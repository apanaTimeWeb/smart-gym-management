// RESPONSIBILITY: Owns HTTP transport for the tickets-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminTicketsStatusDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminTicketsCreateService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-create.service';
import { SuperadminTicketsCreateDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-create.dto';
import { SuperadminTicketsUpdateService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-update.service';
import { SuperadminTicketsUpdateDto } from '@/backend_superadmin/superadmin_modules/tickets/dtos/superadmin-tickets-update.dto';
import { SuperadminTicketsDeleteService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-delete.service';
import { SuperadminTicketsStatusService } from '@/backend_superadmin/superadmin_modules/tickets/services/superadmin-tickets-status.service';

@ApiTags('tickets')
@Controller('/superadmin/tickets')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminTicketsCommandController {
  constructor(private readonly createService: SuperadminTicketsCreateService, private readonly updateService: SuperadminTicketsUpdateService, private readonly deleteService: SuperadminTicketsDeleteService, private readonly statusService: SuperadminTicketsStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
    async create(@Body() body: SuperadminTicketsCreateDto): Promise<unknown> { return this.createService.createTickets(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminRateLimitGuard)
    async update(@Param('id') id: string, @Body() body: SuperadminTicketsUpdateDto): Promise<unknown> { return this.updateService.updateTickets(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteTickets(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus tickets' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminTicketsStatusDto): Promise<unknown> { return this.statusService.changeTicketsStatus(id, body.status); }

}
