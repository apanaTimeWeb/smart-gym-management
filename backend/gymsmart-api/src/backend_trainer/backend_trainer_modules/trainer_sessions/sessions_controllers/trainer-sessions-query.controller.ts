// RESPONSIBILITY: Owns the HTTP boundary for the sessions query side.
// FLOW: HTTP request → TrainerSessionsQueryController → feature service → canonical response interceptor.

import { TrainerSessionsMemberResponseDto, TrainerSessionsSessionResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-response.dto';
import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerSessionsQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-query.service'; import { TrainerSessionsQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-query.dto';

/**
 * Intent: Defines the TrainerSessionsQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/sessions')
@ApiTags('trainer/sessions')
export class TrainerSessionsQueryController {
  constructor(private readonly service:TrainerSessionsQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-sessions-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerSessionsQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerSessionsSessionResponseDto, isArray: true }) /** Returns paginated trainer sessions. */ async list(@Query() query:TrainerSessionsQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-sessions-query.controller' })
@Get('members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerSessionsMemberResponseDto, isArray: true }) /** Returns member options for session creation. */ async members(){return this.service.findMembers();}
}