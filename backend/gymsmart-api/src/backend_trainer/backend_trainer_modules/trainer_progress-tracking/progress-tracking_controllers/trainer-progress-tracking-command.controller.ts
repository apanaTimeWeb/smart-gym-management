// RESPONSIBILITY: Owns the HTTP boundary for the progress-tracking command side.
// FLOW: HTTP request → TrainerProgressTrackingCommandController → feature service → canonical response interceptor.

import { TrainerProgressTrackingEntryResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-response.dto';
import { Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerProgressTrackingAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-authorization.service'; import { TrainerProgressTrackingCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_services/trainer-progress-tracking-command.service'; import { TrainerProgressTrackingCreateProgressEntryDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-create-progress-entry.dto'; import { TrainerProgressTrackingUpdateProgressEntryDto } from '@/backend_trainer/backend_trainer_modules/trainer_progress-tracking/progress-tracking_dtos/trainer-progress-tracking-update-progress-entry.dto';

/**
 * Intent: Defines the TrainerProgressTrackingCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/progress-tracking')
@ApiTags('trainer/progress-tracking')
export class TrainerProgressTrackingCommandController {
  constructor(private readonly service:TrainerProgressTrackingCommandService,private readonly authorization:TrainerProgressTrackingAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Post Trainer trainer-progress-tracking-command.controller' })
@Post(':memberId/entries') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'memberId', type: String })
@ApiBody({ type: TrainerProgressTrackingCreateProgressEntryDto })
 @ApiResponse({ status: HttpStatus.CREATED, type: TrainerProgressTrackingEntryResponseDto }) /** Creates a member progress entry. */ async create(@Param('memberId') memberId:string,@Body() dto:TrainerProgressTrackingCreateProgressEntryDto){await this.authorization.assertMember(memberId);return this.service.create(memberId,dto);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-progress-tracking-command.controller' })
@Patch(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'memberId', type: String })
@ApiParam({ name: 'entryId', type: String })
@ApiBody({ type: TrainerProgressTrackingUpdateProgressEntryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerProgressTrackingEntryResponseDto }) /** Updates a member progress entry. */ async update(@Param('memberId') memberId:string,@Param('entryId') id:string,@Body() dto:TrainerProgressTrackingUpdateProgressEntryDto){await this.authorization.assertMember(memberId);return this.service.update(memberId,id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Delete Trainer trainer-progress-tracking-command.controller' })
@Delete(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'memberId', type: String })
@ApiParam({ name: 'entryId', type: String })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Soft-deletes a member progress entry. */ async delete(@Param('memberId') memberId:string,@Param('entryId') id:string){await this.authorization.assertMember(memberId);return this.service.delete(memberId,id);}
}
