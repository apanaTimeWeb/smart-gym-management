// RESPONSIBILITY: Owns the HTTP boundary for the progress-tracking command side.
// FLOW: HTTP request → ProgressTrackingCommandController → feature service → canonical response interceptor.

import { Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { ProgressTrackingAuthorizationService } from '@/backend_trainer/modules/backend_trainer/progress-tracking/services/progress-tracking-authorization.service'; import { ProgressTrackingCommandService } from '@/backend_trainer/modules/backend_trainer/progress-tracking/services/progress-tracking-command.service'; import { ProgressTrackingCreateProgressEntryDto } from '@/backend_trainer/modules/backend_trainer/progress-tracking/dtos/progress-tracking-create-progress-entry.dto'; import { ProgressTrackingUpdateProgressEntryDto } from '@/backend_trainer/modules/backend_trainer/progress-tracking/dtos/progress-tracking-update-progress-entry.dto';
@Controller('/trainer/progress-tracking')
@ApiTags('trainer/progress-tracking')
export class ProgressTrackingCommandController {
  constructor(private readonly service:ProgressTrackingCommandService,private readonly authorization:ProgressTrackingAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@Post(':memberId/entries') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates a member progress entry. */ async create(@Param('memberId') memberId:string,@Body() dto:ProgressTrackingCreateProgressEntryDto){await this.authorization.assertMember(memberId);return this.service.create(memberId,dto);}
  // SLA: STANDARD
@Patch(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates a member progress entry. */ async update(@Param('memberId') memberId:string,@Param('entryId') id:string,@Body() dto:ProgressTrackingUpdateProgressEntryDto){await this.authorization.assertMember(memberId);return this.service.update(memberId,id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Delete(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Soft-deletes a member progress entry. */ async delete(@Param('memberId') memberId:string,@Param('entryId') id:string){await this.authorization.assertMember(memberId);return this.service.delete(memberId,id);}
}
