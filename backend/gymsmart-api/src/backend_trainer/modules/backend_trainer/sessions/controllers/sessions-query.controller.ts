// RESPONSIBILITY: Owns the HTTP boundary for the sessions query side.
// FLOW: HTTP request → SessionsQueryController → feature service → canonical response interceptor.

import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { SessionsQueryService } from '@/backend_trainer/modules/backend_trainer/sessions/services/sessions-query.service'; import { SessionsQueryDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-query.dto';
@Controller('/trainer/sessions')
@ApiTags('trainer/sessions')
export class SessionsQueryController {
  constructor(private readonly service:SessionsQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated trainer sessions. */ async list(@Query() query:SessionsQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@Get('members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member options for session creation. */ async members(){return this.service.findMembers();}
}