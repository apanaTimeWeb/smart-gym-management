// RESPONSIBILITY: Owns HTTP transport for the messaging-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { RateLimitGuard } from '@/backend_superadmin/core/cache/rate-limit.guard';
import { MessagingCreateService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-create.service';
import { MessagingCreateDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-create.dto';
import { MessagingUpdateService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-update.service';
import { MessagingUpdateDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-update.dto';
import { MessagingDeleteService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-delete.service';
import { MessagingStatusService } from '@/backend_superadmin/modules/superadmin/messaging/services/messaging-status.service';
import { MessagingStatusDto } from '@/backend_superadmin/modules/superadmin/messaging/dtos/messaging-status.dto';
import { MessagingResponseDto } from '@/backend_superadmin/modules/superadmin/messaging/responses/messaging-response.dto';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingCommandController {
  constructor(private readonly createService: MessagingCreateService, private readonly updateService: MessagingUpdateService, private readonly deleteService: MessagingDeleteService, private readonly statusService: MessagingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: MessagingResponseDto })
    async create(@Body() body: MessagingCreateDto): Promise<MessagingResponseDto> { return (this.createService.createMessaging(body)) as unknown as MessagingResponseDto; }


  /** Implements the explicit frontend /messages create contract. */
  @ApiOperation({ summary: 'create messaging message' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('messages')
  @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: MessagingResponseDto })
  async createMessage(@Body() body: MessagingCreateDto): Promise<MessagingResponseDto> {
    return this.createService.createMessaging(body) as unknown as MessagingResponseDto;
  }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(RateLimitGuard)
  @ApiResponse({ type: MessagingResponseDto })
    async update(@Param('id') id: string, @Body() body: MessagingUpdateDto): Promise<MessagingResponseDto> { return (this.updateService.updateMessaging(id, body)) as unknown as MessagingResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(RateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMessaging(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
  @ApiResponse({ type: MessagingResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: MessagingStatusDto): Promise<MessagingResponseDto> { return (this.statusService.changeMessagingStatus(id, body.status)) as unknown as MessagingResponseDto; }

}