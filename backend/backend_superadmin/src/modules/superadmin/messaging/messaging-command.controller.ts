// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the messaging feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { RateLimitGuard } from '@/core/cache/rate-limit.guard';
import { MessagingCreateService } from '@/modules/superadmin/messaging/services/messaging-create.service';
import { MessagingCreateDto } from '@/modules/superadmin/messaging/dtos/messaging-create.dto';
import { MessagingUpdateService } from '@/modules/superadmin/messaging/services/messaging-update.service';
import { MessagingUpdateDto } from '@/modules/superadmin/messaging/dtos/messaging-update.dto';
import { MessagingDeleteService } from '@/modules/superadmin/messaging/services/messaging-delete.service';
import { MessagingStatusService } from '@/modules/superadmin/messaging/services/messaging-status.service';

@ApiTags('messaging')
@Controller('/superadmin/messaging')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class MessagingCommandController {
  constructor(private readonly createService: MessagingCreateService, private readonly updateService: MessagingUpdateService, private readonly deleteService: MessagingDeleteService, private readonly statusService: MessagingStatusService) {}

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create messaging' })
  @Post()
    @HttpCode(HttpStatus.CREATED)
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async create(@Body() body: MessagingCreateDto): Promise<unknown> { return this.createService.createMessaging(body); }

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update messaging' })
  @Patch(':id')
    @RequireIdempotencyKey()
  @UseGuards(RateLimitGuard)
    async update(@Param('id') id: string, @Body() body: MessagingUpdateDto): Promise<unknown> { return this.updateService.updateMessaging(id, body); }

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove messaging' })
  @Delete(':id')
    @UseGuards(RateLimitGuard)
    @RequireIdempotencyKey()
  @HttpCode(HttpStatus.OK)
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMessaging(id); }

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus messaging' })
  @Patch(':id/status')
    @UseGuards(RateLimitGuard)
    async changeStatus(@Param('id') id: string, @Body() body: { status: string }): Promise<unknown> { return this.statusService.changeMessagingStatus(id, body.status); }

}
