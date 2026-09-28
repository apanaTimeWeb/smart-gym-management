// RESPONSIBILITY: Owns the HTTP boundary for the notifications command side.
// FLOW: HTTP request → TrainerNotificationsCommandController → feature service → canonical response interceptor.

import { TrainerNotificationsPreferencesResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-response.dto';
import { Body, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerNotificationsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-command.service'; import { TrainerNotificationsUpdatePreferencesDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-update-preferences.dto';

/**
 * Intent: Defines the TrainerNotificationsCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/notifications')
@ApiTags('trainer/notifications')
export class TrainerNotificationsCommandController {
  constructor(private readonly service:TrainerNotificationsCommandService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-notifications-command.controller' })
@Patch(':id/read') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Marks one notification read; repeated calls are safe. */ async read(@Param('id') id:string){return this.service.markRead(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-notifications-command.controller' })
@Patch('read-all') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Marks all trainer notifications read. */ async readAll(){return this.service.markAllRead();}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-notifications-command.controller' })
@Patch('preferences') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiBody({ type: TrainerNotificationsUpdatePreferencesDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerNotificationsPreferencesResponseDto }) /** Updates trainer notification preferences. */ async preferences(@Body() dto:TrainerNotificationsUpdatePreferencesDto){return this.service.updatePreferences(dto);}
}
