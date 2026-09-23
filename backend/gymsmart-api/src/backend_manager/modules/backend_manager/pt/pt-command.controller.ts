// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { PtCreateAssignmentRequestDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-create-assignment.request.dto';
import { PtCreateAssignmentResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-create-assignment.response.dto';
import { PtMarkSessionCompleteRequestDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-mark-session-complete.request.dto';
import { PtMarkSessionCompleteResponseDto } from '@/backend_manager/modules/backend_manager/pt/dtos/pt-mark-session-complete.response.dto';
import { PtCreateAssignmentService } from '@/backend_manager/modules/backend_manager/pt/services/pt-create-assignment.service';
import { PtMarkSessionCompleteService } from '@/backend_manager/modules/backend_manager/pt/services/pt-mark-session-complete.service';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(CoreRole.MANAGER)
export class PtCommandController {
  constructor(private readonly createAssignmentService: PtCreateAssignmentService, private readonly markSessionCompleteService: PtMarkSessionCompleteService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("pt/assignments")
  @ApiOperation({ summary: 'createAssignment for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: PtCreateAssignmentResponseDto })
  createAssignment(@Body() dto: PtCreateAssignmentRequestDto): ReturnType<PtCreateAssignmentService['createAssignment']> { return this.createAssignmentService.createAssignment(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("pt/assignments/:assignmentId/complete-session")
  @ApiOperation({ summary: 'markSessionComplete for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'assignmentId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PtMarkSessionCompleteResponseDto })
  markSessionComplete(@Param('assignmentId') assignmentId: string, @Body() dto: PtMarkSessionCompleteRequestDto): ReturnType<PtMarkSessionCompleteService['markSessionComplete']> { return this.markSessionCompleteService.markSessionComplete(dto as any, assignmentId); }


}
