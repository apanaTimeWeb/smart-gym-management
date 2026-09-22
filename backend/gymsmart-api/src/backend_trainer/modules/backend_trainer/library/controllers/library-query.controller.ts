// RESPONSIBILITY: Owns the HTTP boundary for the library query side.
// FLOW: HTTP request → LibraryQueryController → feature service → canonical response interceptor.

import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { LibraryQueryService } from '@/backend_trainer/modules/backend_trainer/library/services/library-query.service'; import { LibraryQueryDto } from '@/backend_trainer/modules/backend_trainer/library/dtos/library-query.dto';
@Controller('/trainer/library')
@ApiTags('trainer/library')
export class LibraryQueryController {
  constructor(private readonly service:LibraryQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get('diet-plans') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated diet plans. */ async dietPlans(@Query() query:LibraryQueryDto){return this.service.findDietPlans(query);}
  // SLA: STANDARD
@Get('assigned-members') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member diet assignment state. */ async assignedMembers(){return this.service.findAssignedMembers();}
}