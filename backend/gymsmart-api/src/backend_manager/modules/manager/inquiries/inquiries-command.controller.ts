// RESPONSIBILITY: Owns the Manager inquiries command/write HTTP boundary; contains no business logic or direct ORM access.
// FLOW: HTTP request -> DTO/query validation -> feature use-case service -> repository/domain -> canonical response.
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { InquiriesConvertLeadRequestDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-convert-lead.request.dto';
import { InquiriesConvertLeadResponseDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-convert-lead.response.dto';
import { InquiriesConvertLeadService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-convert-lead.service';
import { InquiriesCreateInquiryRequestDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-create-inquiry.request.dto';
import { InquiriesCreateInquiryResponseDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-create-inquiry.response.dto';
import { InquiriesCreateInquiryService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-create-inquiry.service';
import { InquiriesDeleteInquiryResponseDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-delete-inquiry.response.dto';
import { InquiriesDeleteInquiryService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-delete-inquiry.service';
import { InquiriesQueryDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-query.dto';
import { InquiriesUpdateInquiryRequestDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-update-inquiry.request.dto';
import { InquiriesUpdateInquiryResponseDto } from '@/backend_manager/modules/manager/inquiries/dtos/inquiries-update-inquiry.response.dto';
import { InquiriesUpdateInquiryService } from '@/backend_manager/modules/manager/inquiries/services/inquiries-update-inquiry.service';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(CoreRole.MANAGER)
export class InquiriesCommandController {
  constructor(private readonly convertLeadService: InquiriesConvertLeadService, private readonly createInquiryService: InquiriesCreateInquiryService, private readonly updateInquiryService: InquiriesUpdateInquiryService, private readonly deleteInquiryService: InquiriesDeleteInquiryService) {}

  // SLA: STANDARD
  @Post("inquiries")
  @ApiOperation({ summary: 'createInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiResponse({ status: HttpStatus.CREATED, type: InquiriesCreateInquiryResponseDto })
  createInquiry(@Body() dto: InquiriesCreateInquiryRequestDto): Promise<InquiriesCreateInquiryResponseDto> {  return this.createInquiryService.createInquiry(dto) as unknown as Promise<InquiriesCreateInquiryResponseDto>;  }


  // SLA: STANDARD
  @Post("inquiries/:id/convert")
  @ApiOperation({ summary: 'convertLead for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: InquiriesConvertLeadResponseDto })
  convertLead(@Param('id') id: string, @Body() dto: InquiriesConvertLeadRequestDto): Promise<InquiriesConvertLeadResponseDto> {  return this.convertLeadService.convertLead(dto, id) as unknown as Promise<InquiriesConvertLeadResponseDto>;  }


  // SLA: STANDARD
  @Patch("inquiries/:id")
  @ApiOperation({ summary: 'updateInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesUpdateInquiryResponseDto })
  updateInquiry(@Param('id') id: string, @Body() dto: InquiriesUpdateInquiryRequestDto): Promise<InquiriesUpdateInquiryResponseDto> {  return this.updateInquiryService.updateInquiry(dto, id) as unknown as Promise<InquiriesUpdateInquiryResponseDto>;  }


  // SLA: STANDARD
  @Delete("inquiries/:id")
  @ApiOperation({ summary: 'deleteInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: false })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesDeleteInquiryResponseDto })
  deleteInquiry(@Param('id') id: string): Promise<InquiriesDeleteInquiryResponseDto> {  return this.deleteInquiryService.deleteInquiry(id); }


}
