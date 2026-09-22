// RESPONSIBILITY: Owns the HTTP boundary for the notifications command side.
// FLOW: HTTP request → NotificationsCommandController → feature service → canonical response interceptor.

import { Body, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { NotificationsCommandService } from '@/backend_trainer/modules/backend_trainer/notifications/services/notifications-command.service'; import { NotificationsUpdatePreferencesDto } from '@/backend_trainer/modules/backend_trainer/notifications/dtos/notifications-update-preferences.dto';
@Controller('/trainer/notifications')
@ApiTags('trainer/notifications')
export class NotificationsCommandController {
  constructor(private readonly service:NotificationsCommandService){}
// SLA: STANDARD
  // SLA: STANDARD
@Patch(':id/read') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Marks one notification read; repeated calls are safe. */ async read(@Param('id') id:string){return this.service.markRead(id);}
  // SLA: STANDARD
@Patch('read-all') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Marks all trainer notifications read. */ async readAll(){return this.service.markAllRead();}
// SLA: STANDARD
  // SLA: STANDARD
@Patch('preferences') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates trainer notification preferences. */ async preferences(@Body() dto:NotificationsUpdatePreferencesDto){return this.service.updatePreferences(dto);}
}
