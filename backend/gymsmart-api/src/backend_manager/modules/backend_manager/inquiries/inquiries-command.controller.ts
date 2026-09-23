// RESPONSIBILITY: Owns the backend application HTTP controller boundary.
// FLOW: HTTP request → guards/decorators → DTO validation → feature service → canonical response envelope.
import { Body, Controller, Delete, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CoreRole } from '@/backend_manager/core/auth/core-role.constants';
import { Roles } from '@/backend_manager/core/auth/core-roles.decorator';
import { CoreRequireIdempotencyKey } from '@/backend_manager/core/idempotency/core-require-idempotency-key.decorator';

import { InquiriesConvertLeadRequestDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-convert-lead.request.dto';
import { InquiriesConvertLeadResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-convert-lead.response.dto';
import { InquiriesCreateInquiryRequestDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-create-inquiry.request.dto';
import { InquiriesCreateInquiryResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-create-inquiry.response.dto';
import { InquiriesDeleteInquiryResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-delete-inquiry.response.dto';
import { InquiriesUpdateInquiryRequestDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-update-inquiry.request.dto';
import { InquiriesUpdateInquiryResponseDto } from '@/backend_manager/modules/backend_manager/inquiries/dtos/inquiries-update-inquiry.response.dto';
import { InquiriesConvertLeadService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-convert-lead.service';
import { InquiriesCreateInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-create-inquiry.service';
import { InquiriesDeleteInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-delete-inquiry.service';
import { InquiriesUpdateInquiryService } from '@/backend_manager/modules/backend_manager/inquiries/services/inquiries-update-inquiry.service';

@Controller('manager')
@ApiTags('Manager inquiries')
@Roles(CoreRole.MANAGER)
export class InquiriesCommandController {
  constructor(private readonly convertLeadService: InquiriesConvertLeadService, private readonly createInquiryService: InquiriesCreateInquiryService, private readonly updateInquiryService: InquiriesUpdateInquiryService, private readonly deleteInquiryService: InquiriesDeleteInquiryService) {}

  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("inquiries")
  @ApiOperation({ summary: 'createInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: InquiriesCreateInquiryResponseDto })
  createInquiry(@Body() dto: InquiriesCreateInquiryRequestDto): ReturnType<InquiriesCreateInquiryService['createInquiry']> { return this.createInquiryService.createInquiry(dto as any); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Post("inquiries/:id/convert")
  @ApiOperation({ summary: 'convertLead for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.CREATED, type: InquiriesConvertLeadResponseDto })
  convertLead(@Param('id') id: string, @Body() dto: InquiriesConvertLeadRequestDto): ReturnType<InquiriesConvertLeadService['convertLead']> { return this.convertLeadService.convertLead(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Patch("inquiries/:id")
  @ApiOperation({ summary: 'updateInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesUpdateInquiryResponseDto })
  updateInquiry(@Param('id') id: string, @Body() dto: InquiriesUpdateInquiryRequestDto): ReturnType<InquiriesUpdateInquiryService['updateInquiry']> { return this.updateInquiryService.updateInquiry(dto as any, id); }


  // SLA: STANDARD
  @CoreRequireIdempotencyKey()
  @Delete("inquiries/:id")
  @ApiOperation({ summary: 'deleteInquiry for Manager inquiries' })
  @ApiHeader({ name: 'Idempotency-Key', required: true })
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: HttpStatus.OK, type: InquiriesDeleteInquiryResponseDto })
  deleteInquiry(@Param('id') id: string): ReturnType<InquiriesDeleteInquiryService['deleteInquiry']> {  return this.deleteInquiryService.deleteInquiry(id); }


}
