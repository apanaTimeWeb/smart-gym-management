// RESPONSIBILITY: Owns the HTTP boundary for the sessions command side.
// FLOW: HTTP request → SessionsCommandController → feature service → canonical response interceptor.

import { Header, Body, Delete, Param, Patch, Post, Controller, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreIdempotency } from '@/backend_trainer/core/security/core-idempotency.decorator'; import { SessionsAuthorizationService } from '@/backend_trainer/modules/backend_trainer/sessions/services/sessions-authorization.service'; import { SessionsCommandService } from '@/backend_trainer/modules/backend_trainer/sessions/services/sessions-command.service'; import { SessionsCreateSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-create-session.dto'; import { SessionsUpdateSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-update-session.dto'; import { SessionsCancelSessionDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-cancel-session.dto'; import { SessionsMarkSessionAttendanceDto } from '@/backend_trainer/modules/backend_trainer/sessions/dtos/sessions-mark-session-attendance.dto';
@Controller('/trainer/sessions')
@ApiTags('trainer/sessions')
export class SessionsCommandController {
  constructor(private readonly service:SessionsCommandService,private readonly authorization:SessionsAuthorizationService){}
// SLA: STANDARD
  // SLA: STANDARD
@Post() @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.CREATED}) /** Creates a trainer session. */ async create(@Body() dto:SessionsCreateSessionDto){return this.service.createSession(dto);}
  // SLA: STANDARD
@Patch(':id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Updates a trainer-owned session. */ async update(@Param('id') id:string,@Body() dto:SessionsUpdateSessionDto){await this.authorization.assertSession(id);return this.service.updateSession(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Post(':id/cancel') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Cancels using the actual frontend POST contract. */ async cancel(@Param('id') id:string,@Body() dto:SessionsCancelSessionDto){await this.authorization.assertSession(id);return this.service.cancelSession(id,dto);}
  @Header('Deprecation','true')
@Header('Sunset','2027-03-31')
// SLA: STANDARD
@Delete(':id') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Provides documented DELETE cancellation compatibility without hard deletion. */ async cancelDelete(@Param('id') id:string,@Body() dto:SessionsCancelSessionDto){await this.authorization.assertSession(id);return this.service.cancelSession(id,dto);}
// SLA: STANDARD
  // SLA: STANDARD
@Post(':id/attendance') @CoreRoles(CoreRole.TRAINER) @CoreIdempotency() @ApiResponse({status:HttpStatus.OK}) /** Records completed/no-show outcome. */ async attendance(@Param('id') id:string,@Body() dto:SessionsMarkSessionAttendanceDto){await this.authorization.assertSession(id);return this.service.markAttendance(id,dto);}
}
