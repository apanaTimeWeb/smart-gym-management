// RESPONSIBILITY: Owns the Manager pt command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/core/auth/core-role.constants';
import { Roles } from '@/core/auth/core-roles.decorator';
import { PtCreateAssignmentRequestDto } from '@/modules/manager/pt/dtos/pt-create-assignment.request.dto';
import { PtCreateAssignmentResponseDto } from '@/modules/manager/pt/dtos/pt-create-assignment.response.dto';
import { PtCreateAssignmentService } from '@/modules/manager/pt/services/pt-create-assignment.service';
import { PtMarkSessionCompleteRequestDto } from '@/modules/manager/pt/dtos/pt-mark-session-complete.request.dto';
import { PtMarkSessionCompleteResponseDto } from '@/modules/manager/pt/dtos/pt-mark-session-complete.response.dto';
import { PtMarkSessionCompleteService } from '@/modules/manager/pt/services/pt-mark-session-complete.service';
import { PtQueryDto } from '@/modules/manager/pt/dtos/pt-query.dto';

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
  createAssignment(@Body() dto: PtCreateAssignmentRequestDto): Promise<PtCreateAssignmentResponseDto> {  return this.createAssignmentService.createAssignment(dto) as Promise<PtCreateAssignmentResponseDto>;  }


  // SLA: STANDARD
  @Patch("pt/assignments/:assignmentId/complete-session")
  @ApiOperation({ summary: 'markSessionComplete for Manager pt' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'assignmentId', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: PtMarkSessionCompleteResponseDto })
  markSessionComplete(@Param('assignmentId') assignmentId: string, @Body() dto: PtMarkSessionCompleteRequestDto): Promise<PtMarkSessionCompleteResponseDto> {  return this.markSessionCompleteService.markSessionComplete(dto, assignmentId) as Promise<PtMarkSessionCompleteResponseDto>;  }


}
