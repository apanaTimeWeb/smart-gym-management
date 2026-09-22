// RESPONSIBILITY: Owns the HTTP boundary for the members command side.
// FLOW: HTTP request → MembersCommandController → feature service → canonical response interceptor.

import { Body, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { MembersUpdateService } from '@/backend_trainer/modules/backend_trainer/members/services/members-update.service'; import { MembersNoteService } from '@/backend_trainer/modules/backend_trainer/members/services/members-note.service'; import { MembersUpdateMemberDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-update-member.dto'; import { MembersAuthorizationService } from '@/backend_trainer/modules/backend_trainer/members/services/members-authorization.service'; import { MembersCreateMemberNoteDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-create-member-note.dto';
@Controller('/trainer/members')
@ApiTags('trainer/members')
export class MembersCommandController {
  constructor(private readonly updateService:MembersUpdateService,private readonly noteService:MembersNoteService,private readonly authorization:MembersAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@Patch(':id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates trainer-editable member fields. */ async update(@Param('id') id:string,@Body() dto:MembersUpdateMemberDto){await this.authorization.assertMember(id);return this.updateService.update(id,dto);}
  // SLA: STANDARD
@Post(':id/notes') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates a trainer-authored member note. */ async createNote(@Param('id') id:string,@Body() dto:MembersCreateMemberNoteDto){await this.authorization.assertMember(id);return this.noteService.create(id,dto);}
}
