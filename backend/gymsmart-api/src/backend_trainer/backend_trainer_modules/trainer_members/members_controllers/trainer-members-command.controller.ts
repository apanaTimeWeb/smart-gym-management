// RESPONSIBILITY: Owns the HTTP boundary for the members command side.
// FLOW: HTTP request → TrainerMembersCommandController → feature service → canonical response interceptor.

import { TrainerMembersMemberResponseDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-response.dto';
import { Body, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiBody } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/backend_core/core_security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/backend_core/core_types/core-auth.types'; import { RequireIdempotencyKey } from '@/backend_trainer/backend_core/core_security/core-idempotency.decorator'; import { TrainerMembersUpdateService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-update.service'; import { TrainerMembersNoteService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-note.service'; import { TrainerMembersUpdateMemberDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-update-member.dto'; import { TrainerMembersAuthorizationService } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_services/trainer-members-authorization.service'; import { TrainerMembersCreateMemberNoteDto } from '@/backend_trainer/backend_trainer_modules/trainer_members/members_dtos/trainer-members-create-member-note.dto';

/**
 * Intent: Defines the TrainerMembersCommandController boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Controller('/trainer/members')
@ApiTags('trainer/members')
export class TrainerMembersCommandController {
  constructor(private readonly updateService:TrainerMembersUpdateService,private readonly noteService:TrainerMembersNoteService,private readonly authorization:TrainerMembersAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@ApiOperation({ summary: 'Patch Trainer trainer-members-command.controller' })
@Patch(':id') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerMembersUpdateMemberDto })
 @ApiResponse({ status: HttpStatus.OK, type: TrainerMembersMemberResponseDto }) /** Updates trainer-editable member fields. */ async update(@Param('id') id:string,@Body() dto:TrainerMembersUpdateMemberDto){await this.authorization.assertMember(id);return this.updateService.update(id,dto);}
  // SLA: STANDARD
@ApiOperation({ summary: 'Post Trainer trainer-members-command.controller' })
@Post(':id/notes') @CoreRoles(CoreRole.TRAINER) @RequireIdempotencyKey()@ApiParam({ name: 'id', type: String })
@ApiBody({ type: TrainerMembersCreateMemberNoteDto })
 @ApiResponse({ status: HttpStatus.CREATED, type: TrainerMembersMemberResponseDto }) /** Creates a trainer-authored member note. */ async createNote(@Param('id') id:string,@Body() dto:TrainerMembersCreateMemberNoteDto){await this.authorization.assertMember(id);return this.noteService.create(id,dto);}
}
