// RESPONSIBILITY: Owns the HTTP boundary for the progress-tracking query side.
// FLOW: HTTP request → ProgressTrackingQueryController → feature service → canonical response interceptor.

import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { ProgressTrackingAuthorizationService } from '@/backend_trainer/modules/backend_trainer/progress-tracking/services/progress-tracking-authorization.service'; import { ProgressTrackingQueryService } from '@/backend_trainer/modules/backend_trainer/progress-tracking/services/progress-tracking-query.service'; import { ProgressTrackingQueryDto } from '@/backend_trainer/modules/backend_trainer/progress-tracking/dtos/progress-tracking-query.dto';
@Controller('/trainer/progress-tracking')
@ApiTags('trainer/progress-tracking')
export class ProgressTrackingQueryController {
  constructor(private readonly service:ProgressTrackingQueryService,private readonly authorization:ProgressTrackingAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get('members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns trainer-visible member progress cards. */ async members(){return this.service.findMembers();}
  // SLA: STANDARD
@Get(':memberId/entries') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated progress entries. */ async entries(@Param('memberId') memberId:string,@Query() query:ProgressTrackingQueryDto){await this.authorization.assertMember(memberId);return this.service.findEntries(memberId,query);}
// SLA: STANDARD
  // SLA: STANDARD
@Get(':memberId/entries/:entryId') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns one progress entry. */ async entry(@Param('memberId') memberId:string,@Param('entryId') entryId:string){await this.authorization.assertMember(memberId);return this.service.findEntry(memberId,entryId);}
  // SLA: STANDARD
@Get(':memberId/summary') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns the member progress summary. */ async summary(@Param('memberId') memberId:string){await this.authorization.assertMember(memberId);return this.service.summary(memberId);}
}