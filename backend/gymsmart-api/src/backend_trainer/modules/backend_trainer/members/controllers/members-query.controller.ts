// RESPONSIBILITY: Owns the HTTP boundary for the members query side.
// FLOW: HTTP request → MembersQueryController → feature service → canonical response interceptor.

import { Controller, Get, Param, Query, HttpStatus } from '@nestjs/common'; import { ApiResponse, ApiTags } from '@nestjs/swagger'; import { CoreRoles } from '@/backend_trainer/core/security/core-roles.decorator';
import { CoreRole } from '@/backend_trainer/core/types/core-auth.types'; import { CoreRawResponse } from '@/backend_trainer/core/response/core-raw-response.decorator'; import { MembersExportService } from '@/backend_trainer/modules/backend_trainer/members/services/members-export.service'; import { MembersExportQueryDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-export-query.dto'; import { Res } from '@nestjs/common'; import type { Response } from 'express'; import { MembersQueryService } from '@/backend_trainer/modules/backend_trainer/members/services/members-query.service'; import { MembersQueryDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-query.dto';
@Controller('/trainer/members')
@ApiTags('trainer/members')
export class MembersQueryController {
  constructor(private readonly service:MembersQueryService,private readonly exportService:MembersExportService){}
// SLA: STANDARD
  // SLA: STANDARD
@Get() @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns paginated members. */ async list(@Query() query:MembersQueryDto){return this.service.findMany(query);}
  // SLA: STANDARD
@Get('stats') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member KPIs. */ async stats(){return this.service.findStats();}
  // SLA: STANDARD
@Get('export') @CoreRoles(CoreRole.TRAINER) @CoreRawResponse() @ApiResponse({status:HttpStatus.OK}) /** Returns a bounded CSV member export. */ async export(@Query() query:MembersExportQueryDto,@Res() response:Response):Promise<void>{void query;response.type('text/csv').attachment('trainer-members.csv').send(await this.exportService.exportCsv());}
// SLA: STANDARD
  // SLA: STANDARD
@Get(':id') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member detail. */ async detail(@Param('id') id:string){return this.service.findById(id);}
  // SLA: STANDARD
@Get(':id/notes') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member notes. */ async notes(@Param('id') id:string){return this.service.findNotes(id);}
// SLA: STANDARD
  // SLA: STANDARD
@Get(':id/attendance') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member attendance. */ async attendance(@Param('id') id:string){return this.service.findAttendance(id);}
  // SLA: STANDARD
@Get(':id/diet') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns diet plan lookup values. */ async diet(@Param('id') id:string){return this.service.findDietPlans(id);}
// SLA: STANDARD
  // SLA: STANDARD
@Get(':id/workout') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns workout lookup values for a trainer-owned member. */ async workout(@Param('id') id:string){return this.service.findWorkouts(id);}
  // SLA: STANDARD
@Get(':id/progress') @CoreRoles(CoreRole.TRAINER) @ApiResponse({status:HttpStatus.OK}) /** Returns member progress history. */ async progress(@Param('id') id:string){return this.service.findProgress(id);}
}