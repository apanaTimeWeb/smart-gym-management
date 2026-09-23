// RESPONSIBILITY: Owns HTTP transport for the messaging-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { SuperadminRateLimitGuard } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-rate-limit.guard';
import { SuperadminMessagingCreateService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-create.service';
import { SuperadminMessagingCreateDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-create.dto';
import { SuperadminMessagingUpdateService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-update.service';
import { SuperadminMessagingUpdateDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-update.dto';
import { SuperadminMessagingDeleteService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-delete.service';
import { SuperadminMessagingStatusService } from '@/backend_superadmin/superadmin_modules/messaging/services/superadmin-messaging-status.service';
import { SuperadminMessagingStatusDto } from '@/backend_superadmin/superadmin_modules/messaging/dtos/superadmin-messaging-status.dto';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/responses/superadmin-messaging-response.dto';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingCommandController {
  constructor(private readonly createService: SuperadminMessagingCreateService, private readonly updateService: SuperadminMessagingUpdateService, private readonly deleteService: SuperadminMessagingDeleteService, private readonly statusService: SuperadminMessagingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
    async create(@Body() body: SuperadminMessagingCreateDto): Promise<SuperadminMessagingResponseDto> { return (this.createService.createMessaging(body)) as unknown as SuperadminMessagingResponseDto; }


  /** Implements the explicit frontend /messages create contract. */
  @ApiOperation({ summary: 'create messaging message' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('messages')
  @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  async createMessage(@Body() body: SuperadminMessagingCreateDto): Promise<SuperadminMessagingResponseDto> {
    return this.createService.createMessaging(body) as unknown as SuperadminMessagingResponseDto;
  }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
    async update(@Param('id') id: string, @Body() body: SuperadminMessagingUpdateDto): Promise<SuperadminMessagingResponseDto> { return (this.updateService.updateMessaging(id, body)) as unknown as SuperadminMessagingResponseDto; }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminRateLimitGuard)
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMessaging(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id/status')
    @UseGuards(SuperadminRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminMessagingStatusDto): Promise<SuperadminMessagingResponseDto> { return (this.statusService.changeMessagingStatus(id, body.status)) as unknown as SuperadminMessagingResponseDto; }

}