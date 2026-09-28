// RESPONSIBILITY: Owns the HTTP boundary for the members query side.
// FLOW: HTTP request → TrainerMembersQueryController → feature service → canonical response interceptor.

import { TrainerMembersAttendanceDayResponseDto, TrainerMembersDietPlansResponseDto, TrainerMembersListResponseDto, TrainerMembersMemberResponseDto, TrainerMembersNoteResponseDto, TrainerMembersProgressEntriesResponseDto, TrainerMembersStatsResponseDto, TrainerMembersWorkoutPlansResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-response.dto';
import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { TrainerMembersQueryService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-query.service';
import { TrainerMembersAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-authorization.service'; import { TrainerMembersQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-query.dto';

/**
 * Intent: Defines the TrainerMembersQueryController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/members')
@ApiTags('trainer/members')
export class TrainerMembersQueryController {
  constructor(private readonly service:TrainerMembersQueryService, private readonly authorization:TrainerMembersAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get() @CoreRoles(CoreRole.TRAINER)@ApiQuery({ type: TrainerMembersQueryDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersListResponseDto }) /** Returns paginated members. */ async list(@Query() query:TrainerMembersQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get('stats') @CoreRoles(CoreRole.TRAINER) @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersStatsResponseDto }) /** Returns member KPIs. */ async stats(){return this.service.findStats();}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersMemberResponseDto }) /** Returns member detail. */ async detail(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findById(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id/notes') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersNoteResponseDto, isArray: true }) /** Returns member notes. */ async notes(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findNotes(id);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id/attendance') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersAttendanceDayResponseDto, isArray: true }) /** Returns member attendance. */ async attendance(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findAttendance(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id/diet') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersDietPlansResponseDto }) /** Returns diet plan lookup values. */ async diet(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findDietPlans(id);}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id/workout') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersWorkoutPlansResponseDto }) /** Returns workout lookup values for a trainer-owned member. */ async workout(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findWorkouts(id);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Get Trainer trainer-members-query.controller' })
@Get(':id/progress') @CoreRoles(CoreRole.TRAINER)@ApiParam({ name: 'id', type: String })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersProgressEntriesResponseDto }) /** Returns member progress history. */ async progress(@Param('id') id:string){await this.authorization.assertMember(id);return this.service.findProgress(id);}
}
