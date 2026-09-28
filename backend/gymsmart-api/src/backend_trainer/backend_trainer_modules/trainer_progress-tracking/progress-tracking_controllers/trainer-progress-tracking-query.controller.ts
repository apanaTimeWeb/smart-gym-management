// RESPONSIBILITY: Owns the HTTP boundary for the progress-tracking query side.
// FLOW: HTTP request → TrainerProgressTrackingQueryController → feature service → canonical response interceptor.

import { TrainerProgressTrackingEntriesResponseDto, TrainerProgressTrackingEntryResponseDto, TrainerProgressTrackingMemberResponseDto, TrainerProgressTrackingSummaryResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-response.dto';
import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerProgressTrackingAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-authorization.service'; import { TrainerProgressTrackingQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-query.service'; import { TrainerProgressTrackingQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-query.dto';

/**
 * Intent: Defines the TrainerProgressTrackingQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/progress-tracking')
@ApiTags('trainer/progress-tracking')
export class TrainerProgressTrackingQueryController {
  constructor(private readonly service:TrainerProgressTrackingQueryService,private readonly authorization:TrainerProgressTrackingAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-progress-tracking-query.controller' })
@Get('members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerProgressTrackingMemberResponseDto, isArray: true }) /** Returns trainer-visible member progress cards. */ async members(){return this.service.findMembers();}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-progress-tracking-query.controller' })
@Get(':memberId/entries') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'memberId', type: String })
@ApiQuery({ type: TrainerProgressTrackingQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerProgressTrackingEntriesResponseDto }) /** Returns paginated progress entries. */ async entries(@Param('memberId') memberId:string,@Query() query:TrainerProgressTrackingQueryDto){await this.authorization.assertMember(memberId);return this.service.findEntries(memberId,query);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-progress-tracking-query.controller' })
@Get(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'memberId', type: String })
@ApiParam({ name: 'entryId', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerProgressTrackingEntryResponseDto }) /** Returns one progress entry. */ async entry(@Param('memberId') memberId:string,@Param('entryId') entryId:string){await this.authorization.assertMember(memberId);return this.service.findEntry(memberId,entryId);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-progress-tracking-query.controller' })
@Get(':memberId/summary') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'memberId', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerProgressTrackingSummaryResponseDto }) /** Returns the member progress summary. */ async summary(@Param('memberId') memberId:string){await this.authorization.assertMember(memberId);return this.service.summary(memberId);}
}