// RESPONSIBILITY: Owns the HTTP boundary for the notifications query side.
// FLOW: HTTP request → TrainerNotificationsQueryController → feature service → canonical response interceptor.

import { TrainerNotificationsListResponseDto, TrainerNotificationsPreferencesResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-response.dto';
import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerNotificationsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_services/trainer-notifications-query.service'; import { TrainerNotificationsQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-query.dto';

/**
 * Intent: Defines the TrainerNotificationsQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/notifications')
@ApiTags('trainer/notifications')
export class TrainerNotificationsQueryController {
  constructor(private readonly service:TrainerNotificationsQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-notifications-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerNotificationsQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerNotificationsListResponseDto }) /** Returns paginated trainer notifications. */ async list(@Query() query:TrainerNotificationsQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-notifications-query.controller' })
@Get('preferences') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerNotificationsPreferencesResponseDto }) /** Returns trainer notification preferences. */ async preferences(){return this.service.preferences();}
}