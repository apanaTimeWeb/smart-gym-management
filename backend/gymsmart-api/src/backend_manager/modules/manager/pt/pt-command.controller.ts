// RESPONSIBILITY: Owns the Manager pt command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { PtCreateAssignmentRequestDto } from '@/backend_manager/modules/manager/pt/dtos/pt-create-assignment.request.dto';
import { PtCreateAssignmentResponseDto } from '@/backend_manager/modules/manager/pt/dtos/pt-create-assignment.response.dto';
import { PtCreateAssignmentService } from '@/backend_manager/modules/manager/pt/services/pt-create-assignment.service';
import { PtMarkSessionCompleteRequestDto } from '@/backend_manager/modules/manager/pt/dtos/pt-mark-session-complete.request.dto';
import { PtMarkSessionCompleteResponseDto } from '@/backend_manager/modules/manager/pt/dtos/pt-mark-session-complete.response.dto';
import { PtMarkSessionCompleteService } from '@/backend_manager/modules/manager/pt/services/pt-mark-session-complete.service';
import { PtQueryDto } from '@/backend_manager/modules/manager/pt/dtos/pt-query.dto';

@Controller('manager')
@ApiTags('Manager pt')
@Roles(CoreRole.MANAGER)
export class PtCommandController {
  constructor(private readonly createAssignmentService: PtCreateAssignmentService, private readonly markSessionCompleteService: PtMarkSessionCompleteService) {}

  // SLA: STANDARD
  @Post("pt/assignments")
  @ApiOperation({ summary: 'createAssignment for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: PtCreateAssignmentResponseDto })
  createAssignment(@Body() dto: PtCreateAssignmentRequestDto): Promise<PtCreateAssignmentResponseDto> {  return this.createAssignmentService.createAssignment(dto) as unknown as Promise<PtCreateAssignmentResponseDto>;  }


  // SLA: STANDARD
  @Patch("pt/assignments/:assignmentId/complete-session")
  @ApiOperation({ summary: 'markSessionComplete for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'assignmentId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PtMarkSessionCompleteResponseDto })
  markSessionComplete(@Param('assignmentId') assignmentId: string, @Body() dto: PtMarkSessionCompleteRequestDto): Promise<PtMarkSessionCompleteResponseDto> {  return this.markSessionCompleteService.markSessionComplete(dto, assignmentId) as unknown as Promise<PtMarkSessionCompleteResponseDto>;  }


}
