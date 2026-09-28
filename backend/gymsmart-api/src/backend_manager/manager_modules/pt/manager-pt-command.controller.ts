// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerCoreAuthorizeResourceParam } from '@/backend_manager/manager_core/manager_core_authorization/manager-core-authorize-resource.decorator';

import { ManagerCoreRole } from '@/backend_manager/manager_core/manager_core_auth/manager-core-role.constants';
import { Roles } from '@/backend_manager/manager_core/manager_core_auth/manager-core-roles.decorator';
import { RequireIdempotencyKey } from '@/backend_manager/manager_core/manager_core_idempotency/manager-core-require-idempotency-key.decorator';

import { ManagerPtCreateAssignmentRequestDto } from '@/backend_manager/manager_modules/pt/pt_dtos/manager-pt-create-assignment.request.dto';
import { ManagerPtCreateAssignmentResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-create-assignment.response.dto';
import { ManagerPtMarkSessionCompleteRequestDto } from '@/backend_manager/manager_modules/pt/pt_dtos/manager-pt-mark-session-complete.request.dto';
import { ManagerPtMarkSessionCompleteResponseDto } from '@/backend_manager/manager_modules/pt/pt_responses/manager-pt-mark-session-complete.response.dto';
import { ManagerPtCreateAssignmentService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-create-assignment.service';
import { ManagerPtMarkSessionCompleteService } from '@/backend_manager/manager_modules/pt/pt_services/manager-pt-mark-session-complete.service';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(ManagerCoreRole.MANAGER)
export class ManagerPtCommandController {
  constructor(private readonly createAssignmentService: ManagerPtCreateAssignmentService, private readonly markSessionCompleteService: ManagerPtMarkSessionCompleteService) {}

  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post("pt/assignments")
  @ApiOperation({ summary: 'createAssignment for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: ManagerPtCreateAssignmentResponseDto })
  createAssignment(@Body() dto: ManagerPtCreateAssignmentRequestDto): ReturnType<ManagerPtCreateAssignmentService['createAssignment']> { return this.createAssignmentService.createAssignment(dto); }


  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch("pt/assignments/:assignmentId/complete-session")
  @ApiOperation({ summary: 'completeSession for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'assignmentId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: ManagerPtMarkSessionCompleteResponseDto })
  @ManagerCoreAuthorizeResourceParam('assignmentId')
  completeSession(@Param('assignmentId') assignmentId: string, @Body() dto: ManagerPtMarkSessionCompleteRequestDto): ReturnType<ManagerPtMarkSessionCompleteService['completeSession']> { return this.markSessionCompleteService.completeSession(dto, assignmentId); }


}

export { ManagerPtCommandController as PtCommandController };
