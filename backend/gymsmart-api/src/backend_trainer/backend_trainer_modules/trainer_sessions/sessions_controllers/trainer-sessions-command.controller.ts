// RESPONSIBILITY: Owns the HTTP boundary for the sessions command side.
// FLOW: HTTP request → TrainerSessionsCommandController → feature service → canonical response interceptor.

import { TrainerSessionsSessionResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-response.dto';
import { Header, Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerSessionsAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-authorization.service'; import { TrainerSessionsCommandService } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_services/trainer-sessions-command.service'; import { TrainerSessionsCreateSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-create-session.dto'; import { TrainerSessionsUpdateSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-update-session.dto'; import { TrainerSessionsCancelSessionDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-cancel-session.dto'; import { TrainerSessionsMarkSessionAttendanceDto } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/sessions_dtos/trainer-sessions-mark-session-attendance.dto';

/**
 * Intent: Defines the TrainerSessionsCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/sessions')
@ApiTags('trainer/sessions')
export class TrainerSessionsCommandController {
  constructor(private readonly service:TrainerSessionsCommandService,private readonly authorization:TrainerSessionsAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({summary:'Create Trainer session'}) @ApiBody({type:TrainerSessionsCreateSessionDto}) @Post() @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.CREATED, type: TrainerSessionsSessionResponseDto }) /** Creates a trainer session. */ async create(@Body() dto:TrainerSessionsCreateSessionDto){return this.service.createSession(dto);}
  // SLA: STANDARD
@ApiOperation({summary:'Update Trainer session'}) @ApiParam({name:'id',type:String}) @ApiBody({type:TrainerSessionsUpdateSessionDto}) @Patch(':id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, type: TrainerSessionsSessionResponseDto }) /** Updates a trainer-owned session. */ async update(@Param('id') id:string,@Body() dto:TrainerSessionsUpdateSessionDto){await this.authorization.assertSession(id);return this.service.updateSession(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({summary:'Cancel Trainer session'}) @ApiParam({name:'id',type:String}) @ApiBody({type:TrainerSessionsCancelSessionDto,required:false}) @Post(':id/cancel') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Cancels using the actual frontend POST contract. */ async cancel(@Param('id') id:string,@Body() dto:TrainerSessionsCancelSessionDto){await this.authorization.assertSession(id);return this.service.cancelSession(id,dto);}
  @Header('Deprecation','true')
@Header('Sunset','2027-03-31')
// SLA: STANDARD
@ApiOperation({ summary: 'Delete Trainer trainer-sessions-command.controller' })
@Delete(':id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerSessionsCancelSessionDto })
 @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Provides documented DELETE cancellation compatibility without hard deletion. */ async cancelDelete(@Param('id') id:string,@Body() dto:TrainerSessionsCancelSessionDto){await this.authorization.assertSession(id);return this.service.cancelSession(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({summary:'Record Trainer session attendance'}) @ApiParam({name:'id',type:String}) @ApiBody({type:TrainerSessionsMarkSessionAttendanceDto}) @Post(':id/attendance') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey() @ApiResponse({ status: HttpStatus.OK, schema: { type: 'object', nullable: true, description: 'Successful mutation returns null data.' } }) /** Records completed/no-show outcome. */ async attendance(@Param('id') id:string,@Body() dto:TrainerSessionsMarkSessionAttendanceDto){await this.authorization.assertSession(id);return this.service.markAttendance(id,dto);}
}
