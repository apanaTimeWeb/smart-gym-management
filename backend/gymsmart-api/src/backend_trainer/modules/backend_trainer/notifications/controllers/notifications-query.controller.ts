// RESPONSIBILITY: Owns the HTTP boundary for the notifications query side.
// FLOW: HTTP request → NotificationsQueryController → feature service → canonical response interceptor.

import { Controller, Get, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { NotificationsQueryService } from '@/backend_trainer/modules/backend_trainer/notifications/services/notifications-query.service'; import { NotificationsQueryDto } from '@/backend_trainer/modules/backend_trainer/notifications/dtos/notifications-query.dto';
@Controller('/trainer/notifications')
@ApiTags('trainer/notifications')
export class NotificationsQueryController {
  constructor(private readonly service:NotificationsQueryService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated trainer notifications. */ async list(@Query() query:NotificationsQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@Get('preferences') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns trainer notification preferences. */ async preferences(){return this.service.preferences();}
}